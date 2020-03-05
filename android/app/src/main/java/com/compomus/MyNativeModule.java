package com.compomus;

import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.RemoteException;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.illposed.osc.OSCBundle;
import com.illposed.osc.OSCMessage;

import org.altbeacon.beacon.Beacon;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.BeaconParser;
import org.altbeacon.beacon.Identifier;
import org.altbeacon.beacon.RangeNotifier;
import org.altbeacon.beacon.Region;

import java.io.IOException;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Collection;


public class MyNativeModule extends ReactContextBaseJavaModule implements BeaconConsumer, SensorEventListener {

    private ReactApplicationContext mReactContext;
    private Context mApplicationContext;
    private BeaconManager mBeaconManager;
    private SensorManager mSensorManager;

    private String identifier = "";
    private String uuid = "";
    private int major = 123;
    private int minor = 456;
    private double beaconRange = 0;
    private OSCInterface oscInterface;
    private int userId = 21 ;
    private int serverPort = 8000;
    private String serverIp = "";
    private String soundRaw = "";
    private String soundName = "";
    private float x,y;
    private double distancia;
    private boolean entered = false;
    private boolean isInside = false;
    private String proximity = "";
    private String screenStatus = "";
    private String alive = "";

    private float[] mGravity = new float[3];
    private float[] mGeomagnetic = new float[3];
    private float[] orientation = new float[3];
    private float[] R = new float[9];
    private float[] I = new float[9];
    private float azimuth = 0f;

    private boolean ready = false;


    public MyNativeModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);

        this.mReactContext = reactContext;
        this.mApplicationContext = reactContext.getApplicationContext();
        this.mBeaconManager = BeaconManager.getInstanceForApplication(mApplicationContext);
        mBeaconManager.getBeaconParsers().add(new BeaconParser().setBeaconLayout("m:2-3=0215,i:4-19,i:20-21,i:22-23,p:24-24"));
        mBeaconManager.bind(this);

        mSensorManager = (SensorManager) mReactContext.getSystemService(Context.SENSOR_SERVICE);

        // for the system's orientation sensor registered listeners
        mSensorManager.registerListener(this, mSensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD),
                        SensorManager.SENSOR_DELAY_NORMAL);
        mSensorManager.registerListener(this, mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER),
                        SensorManager.SENSOR_DELAY_NORMAL);

    }

    @NonNull
    @Override
    public String getName() {
        return "MyNativeModule";
    }



    @ReactMethod
    public void setBeacon(String UUID, String Identifier, int Major, int Minor, float BeaconRange){

        uuid = UUID;
        identifier = Identifier;
        major = Major;
        minor = Minor;
        beaconRange = BeaconRange;

        startScanning();
    }

    @ReactMethod
    public void soundServer(String ip, int port){

        serverIp = ip;
        serverPort = port;

        try {
            oscInterface = new OSCInterface(serverIp, serverPort); // Ip e Porta do pure data

        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (SocketException e) {
            e.printStackTrace();
        }

    }

    @ReactMethod
    public void userInfo(int UserId, String SoundName, String  SoundRaw){

        userId = UserId;
        soundRaw = SoundRaw;
        soundName = SoundName;


    }

    private void startScanning(){
        try {
            mBeaconManager.startRangingBeaconsInRegion(new Region(identifier,
                    Identifier.parse(uuid), null, null));
        } catch (RemoteException e) {
            Log.e("AltBeacon", "startRanging, error: ", e);
        }
    }


    @ReactMethod
    public void screenStatus(String ScreenStatus) {
       screenStatus = ScreenStatus;
    }

    @Override
    public void onBeaconServiceConnect() {

        mBeaconManager.removeAllRangeNotifiers();
        mBeaconManager.addRangeNotifier(new RangeNotifier() {
            @Override
            public void didRangeBeaconsInRegion(Collection<Beacon> beacons, Region region) {
                if (beacons.size() > 0) {
                    distancia = beacons.iterator().next().getDistance();
                    update(distancia,azimuth);
                }
            }

        });
    }

    private void update(double Distancia, double Azimuth){

        if (Distancia == -1.0) {
            proximity = "unknown";
        } else if (Distancia < 1) {
            proximity = "immediate";
        } else if (Distancia < 3) {
            proximity = "near";
        } else {
            proximity = "far";
        }
        x = (float) (Distancia * Math.cos(Math.toRadians(Azimuth)));
        y = (float) (Distancia * Math.sin(Math.toRadians(Azimuth)));

        x = (float) (Math.round(x * 100.0)/100.0);
        y = (float) (Math.round(y * 100.0)/100.0);

        if(Distancia <= beaconRange && Distancia > 0){
            isInside = true;

        }else{
            isInside = false;

        }


        if (isInside && screenStatus.equals("active")  && !entered ){
            entered = true;
            alive = "alive";

            if (userId != 0 && !soundRaw.equals("pitiznaider") ){
                sendOnOSC();
            }

        }else if ( !isInside && userId != 0 && !soundRaw.equals("pitiznaider")){
            if (entered) {
                entered = false;
                alive = "dead";

                sendOffOSC();
            }
        }else if (isInside && entered && screenStatus.equals("inactive")  && userId != 0 && !soundRaw.equals("pitiznaider")){
            entered = false;
            alive = "dead";

            sendOffOSC();
        }else if (isInside && entered && screenStatus.equals("background")  && userId != 0 && !soundRaw.equals("pitiznaider")){
            entered = false;
            alive = "dead";

            sendOffOSC();
        }

        if (entered && screenStatus.equals("active")  && isInside && userId != 0 && !soundRaw.equals("pitiznaider")){

            sendUpdateOSC(x,y);

            WritableMap params = Arguments.createMap();
            params.putString("soundRaw", soundRaw);
            params.putString("soundName", soundName);
            params.putDouble("userId",  userId );
            params.putDouble("degrees",  Azimuth );
            params.putString("alive", alive);
            params.putString("proximity", proximity);
            params.putDouble("distance",  Distancia );
            sendEvent(mReactContext, params);
        }

//        System.out.println("ta dentro "+isInside);
//        System.out.println("Entrou "+entered);
//        System.out.println("screen "+ screenStatus);
//        System.out.println("Alive "+alive);



    }//Fim update


    @ReactMethod
    private void sendEvent(ReactContext reactContext, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onChange", params);
    }

    @Override
    public Context getApplicationContext() {
        return mApplicationContext;
    }

    @Override
    public void unbindService(ServiceConnection serviceConnection) {
        mApplicationContext.unbindService(serviceConnection);
    }

    @Override
    public boolean bindService(Intent intent, ServiceConnection serviceConnection, int i) {
        return mApplicationContext.bindService(intent, serviceConnection, i);
    }

    // Métodos para comunicação com o Pure Data

    private void sendOnOSC(){

        new Thread(new Runnable() {
            @Override
            public void run() {

                OSCBundle oscBundle = new OSCBundle();

                // ALIVE message

                OSCMessage user = new OSCMessage("/addObjeto");
                user.addArgument(soundRaw); // sound Id MainActivity.this.user.getUserSoundId()
                user.addArgument(userId ); // user Id MainActivity.this.user.getUserId()

                oscBundle.addPacket(user);

                // PAN message
                user = new OSCMessage("/posicaoObjeto");
                user.addArgument(x);
                user.addArgument(y);
                user.addArgument(userId ); //MainActivity.this.user.getUserId()


                oscBundle.addPacket(user);

                try {
                    oscInterface.sendOSCBundle(oscBundle);
                    Log.i("COMPOMUS", "Add Objeto");
                } catch (IOException e) {
                    e.printStackTrace();
                    Log.i("COMPOMUS", "NO Add");
                }
            }
        }).start();

    }

    private void sendUpdateOSC(final float x, final float y){
        new Thread(new Runnable() {
            @Override
            public void run() {

                OSCBundle oscBundle = new OSCBundle();

                // PAN message
                OSCMessage user = new OSCMessage("/posicaoObjeto");
                user.addArgument(x);
                user.addArgument(y);
                user.addArgument(userId);//MainActivity.this.user.getUserId()


                oscBundle.addPacket(user);

                try {
                    oscInterface.sendOSCBundle(oscBundle);
                    Log.i("COMPOMUS", " Updated");
                } catch (IOException e) {
                    e.printStackTrace();
                    Log.i("COMPOMUS", "Not sent");
                }
            }
        }).start();
    }

    private void sendOffOSC() {

        new Thread(new Runnable() {
            @Override
            public void run() {

                // Kill Message

                OSCBundle oscBundle = new OSCBundle();

                OSCMessage killUser = new OSCMessage("/removeObjeto");
                killUser.addArgument(userId); //MainActivity.this.user.getUserId()

                oscBundle.addPacket(killUser);

                try {
                    Log.i("COMPOMUS", "Removed Object");
                    oscInterface.sendOSCBundle(oscBundle);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        final float alpha = 0.97f;

        synchronized (this){
            if(sensorEvent.sensor.getType() == Sensor.TYPE_ACCELEROMETER){
                mGravity[0] = (alpha * mGravity[0]) + ((1 - alpha) * sensorEvent.values[0]);
                mGravity[1] = (alpha * mGravity[1]) + ((1 - alpha) * sensorEvent.values[1]);
                mGravity[2] = (alpha * mGravity[2]) + ((1 - alpha) * sensorEvent.values[2]);
            }
            if(sensorEvent.sensor.getType() == Sensor.TYPE_MAGNETIC_FIELD){
                mGeomagnetic[0] = (alpha * mGeomagnetic[0]) + ((1 - alpha) * sensorEvent.values[0]);
                mGeomagnetic[1] = (alpha * mGeomagnetic[1]) + ((1 - alpha) * sensorEvent.values[1]);
                mGeomagnetic[2] = (alpha * mGeomagnetic[2]) + ((1 - alpha) * sensorEvent.values[2]);
            }

            boolean success = SensorManager.getRotationMatrix(R, I, mGravity, mGeomagnetic);
            if (success){
//                float orientation[] = new float[3];

                SensorManager.getOrientation(R,orientation);

                azimuth = (int)Math.toDegrees(orientation[0]);

                azimuth =Math.round((azimuth+360)%360);


            }

        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }
}