package com.compomus;

import com.illposed.osc.OSCBundle;
import com.illposed.osc.OSCMessage;
import com.illposed.osc.OSCPortOut;

import java.io.IOException;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.List;

/**
 * Created by victorabroum on 11/3/16.
 */

public class OSCInterface {

    // IP address of the OSC receiver
    private InetAddress inetAddress;

    // Port on which the OSC receiver listens to
    private int port = 3333;

    // The OSC out port for this OSC interface
    private OSCPortOut sender;

    // Is the IP address reachable?
    private boolean reachable = true;
    private boolean checkingStatus = false;

    // Constructor
    public OSCInterface(String host, int port) throws UnknownHostException, SocketException {
        // Need try catch for UnknownHost
        this.inetAddress = InetAddress.getByName(host);
        if (port>1023){
            this.port = port;
        }

        if (this.inetAddress==null){
            this.inetAddress = InetAddress.getLocalHost();
        }

        checkStatus();

        // Need try catch for SocketException
        sender = new OSCPortOut(inetAddress, port);
    }

    // Sends list of OSC messages as OSC bundles
    public void sendMessage(List<OSCMessage> oscMessageList) throws IOException {
        OSCBundle bundle = new OSCBundle(listToArray(oscMessageList));

        if (reachable){
            // Need try catch for IO
            sender.send(bundle);
        }
    }

    // Send a single OSC mesage
    public void sendSingleMessage(OSCMessage oscMessage) throws IOException {
        if (reachable){
            // Need try catch for IO
            sender.send(oscMessage);
        }
    }

    // Send OSC bundle
    public void sendOSCBundle(OSCBundle bundle) throws IOException {
        // Need try catch for IO
        sender.send(bundle);
    }

    // Prints out OSC data
    public void printOSCData(OSCMessage oscMessage){
        Object[] args = oscMessage.getArguments();

        for (Object arg : args) {
            System.out.print(arg + " / ");
        }
        System.out.println();
    }

    // Converts List of OSC Message into an array of OSC Messages
    private OSCMessage[] listToArray(List<OSCMessage> oscMessageList){
        OSCMessage[] oscMessagesArray = new OSCMessage[oscMessageList.size()];

        for(int i = 0; i<oscMessageList.size(); i++){
            oscMessagesArray[i] = oscMessageList.get(i);
        }
        return oscMessagesArray;
    }

    public InetAddress getInetAddress() {
        return inetAddress;
    }

    public int getPort() {
        return port;
    }

    public  void closeInterface(){
        this.sender.close();
    }

    public boolean isReachable(){
        return reachable;
    }

    public synchronized void checkStatus(){
        if (checkingStatus) return;
        checkingStatus=true;

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    long startTime = System.currentTimeMillis();
                    reachable = inetAddress.isReachable(1000);
                    long sleepTime = 1000 - (System.currentTimeMillis() - startTime);
                    if (sleepTime>0) Thread.sleep(sleepTime);
                } catch (IOException | InterruptedException e) {
                    e.printStackTrace();
                    checkingStatus=false;
                }
            }
        }).start();
    }
}
