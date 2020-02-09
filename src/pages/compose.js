// import React from 'react';
//import {WebView} from 'react-native-webview';

// const Compose = ({navigation}) => (
//   <WebView source={{uri: navigation.state.params.compose.url}} />
// );

// Compose.navigationOptions = ({navigation}) => ({
//   title: navigation.state.params.compose.name,
// });
// export default Compose;

import SoundPlayer from "react-native-sound-player";
import React, { Component } from "react";
//import api from '../services/api';
//import songList from '../data/songList';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  AppState,
  Image
} from "react-native";
import Lottie  from "lottie-react-native";
import  alert from "../assets/alert.json";
import playing from "../assets/macaco.json";
import farAway from "../assets/farAway.json";
import lost from "../assets/pinLocation.json";

const { MyNativeModule } = NativeModules;
const CounterEvents = new NativeEventEmitter(NativeModules.MyNativeModule);

export default class Compose extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("nameFileReal"),
    // headerLeft: null,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" }
  });
  state = {
    dataSource: [],
    isLoading: true,
    appState: AppState.currentState,
    proximity: " ",
    lifeStatus: " ",
    distance: 0.0,
    degrees: "",
    userId: 0,
    userName: "",
    userEmail: "",
    userPass: "",
    usersoundRaw: "",
    userSoundId: "",
    choosenSound: "",
    beaconRange: 0.311,
    major: 123,
    minor: 456,
    screenColor: "",
    iden: "iBeacon",
    UUID: "8303AF6C-EC3C-4DA8-8696-A609807EC5A5",
    locationStatus: ""
  };

  componentDidMount() {
    this.setupNative();
    AppState.addEventListener("change", this._handleAppStateChange);
    CounterEvents.addListener("onChange", this._eventSubscription);
    this.playSong();
    this.getUser();
  }

  componentWillUnmount() {
    SoundPlayer.stop();
    AppState.removeEventListener("change", this._handleAppStateChange);
    CounterEvents.removeAllListeners(
      "onChange",
      this._eventSubscription,
      MyNativeModule.screenStatus("inactive")
    );
  }

  playSong() {
    const { navigation } = this.props;
    let song = navigation.getParam("nameFile");
    try {
      SoundPlayer.loadUrl(`${global.rawSource}/raw/${song}.mp3`);
      SoundPlayer.play();
    } catch (e) {
      Alert.alert("Esse som não pode ser reproduzido");
      console.log("cannot play the song file", e);
    }
    // MyNativeModule.userInfo(this.state.userId, this.state.userSoundId);
  }

  _eventSubscription = result => {
    this.setState({
      distance: parseFloat(result.distance),
      proximity: result.proximity,
      degrees: result.degrees,
      lifeStatus: result.alive
    });
    this.screenColor();
    this.screenActivity();
  };
  //Common
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }
    this.setState({ appState: nextAppState });
  };

  // IOS
  setupNative() {
    MyNativeModule.setBeacon(
      this.state.UUID,
      this.state.iden,
      this.state.major,
      this.state.minor,
      this.state.beaconRange
    );

    // MyNativeModule.userInfo(this.state.userId, this.state.userSoundId);
  }

  //Common
  screenActivity() {
    

    if (this.state.appState === "inactive") {
      MyNativeModule.screenStatus("inactive");
    } else if (this.state.appState === "background") {
      MyNativeModule.screenStatus("background");
    } else if (this.state.appState === "active") {
      MyNativeModule.screenStatus("active");
    }

    
  }

  //Common
  getUser() {
    const { navigation } = this.props;
    const userId = navigation.getParam("userId");

    let formData = new FormData();

    formData.append("id", userId);

    fetch(`${global.rawSource}/index.php/getThisUser`, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log('Success', formData);
        const { id } = responseJson;
        const { name } = responseJson;
        const { email } = responseJson;
        const { pass } = responseJson;
        const { soundRaw } = responseJson;
        const { soundName } = responseJson;
        //console.log(responseJson);
        this.setState({
          userId: Number(id),
          userName: name,
          userEmail: email,
          userPass: pass,
          usersoundRaw: soundRaw,
          userSoundId: soundName
        });
        if (responseJson !== false) {
          this.updateSound();

          console.log(
            "Status user ",
            this.state.userId + " User Sound " + this.state.choosenSound
          );

          // Alert.alert('Compomus', 'Usuario achado com sucesso!');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateSound() {
    const { navigation } = this.props;
    const nameFile = navigation.getParam("nameFile");
    this.setState({ choosenSound: nameFile });

    let formData = new FormData();

    formData.append("id", this.state.userId);
    formData.append("name", this.state.userName);
    formData.append("email", this.state.userEmail);
    formData.append("pass", this.state.userPass);
    formData.append("soundRaw", this.state.usersoundRaw);
    formData.append("soundName", this.state.choosenSound);

    fetch(`${global.rawSource}/index.php/updateUser`, {
      method: "POST",
      body: formData
    })
      .then(responseJson => {
        if (responseJson !== false) {
          // Alert.alert('Compomus', 'Som escolhido com sucesso!');
        }
      })
      .catch(error => {
        console.error(error);
      });
    //console.log(formData);
  }

  screenColor() {

    if (this.state.lifeStatus === "alive") {    
      this.setState({ locationStatus: "immediate" });
    }  else if (this.state.lifeStatus === "dead" && this.state.proximity === "near") {
      this.setState({ locationStatus: "near" });
    } 
    
    if (this.state.proximity === "far" && this.state.lifeStatus === "dead") {
      this.setState({ locationStatus: "far" });
    } else if (this.state.proximity === "unknown") {
      this.setState({ locationStatus: "unknown" });
    }


    if (this.state.locationStatus === "immediate") {
      this.setState({ screenColor: "white" });      

    } else if (this.state.locationStatus === "near") {
      this.setState({ screenColor: "orange" });      

    } else if (this.state.locationStatus === "far") {
      this.setState({ screenColor: "grey" });      

    } else if (this.state.locationStatus === "unknown") {
      this.setState({ screenColor: "pink" });      
    }

  }

displayAnimation(){


    if (this.state.locationStatus === "immediate") {
      return <Lottie source={playing} autoPlay loop resizeMode="contain" autoSize /> ;
      

    } else if (this.state.locationStatus === "near") {
      return <Lottie source={alert} autoPlay loop resizeMode="contain" autoSize /> ;
      

    } else if (this.state.locationStatus === "far") {
      return <Lottie source={lost} autoPlay loop resizeMode="contain" autoSize /> ;
      

    } else if (this.state.locationStatus === "unknown") {
      return <Lottie source={farAway} autoPlay loop resizeMode="contain" autoSize /> ;
      
    }
}


  render() {
    console.log(
      "onChange event",
      this.state.distance +
        " " +
        this.state.proximity +
        " " +
        this.state.degrees +
        " " +
        this.state.lifeStatus+
        " " +
        this.state.locationStatus
    );
    
    const { navigation } = this.props;
    const color = this.state.screenColor;

    return (
      <>
        <StatusBar barStyle="light-content" />
        <View style={[styles.container, { backgroundColor: color }]}>
          <View style={styles.imageCenter}>
          
            {this.displayAnimation()}
            {/* <Image
              style={styles.image}
              source={require("../assets/soundPlaying2.gif")}
            /> */}
          </View>
          <View>
            <Text>Som Tocando: {navigation.getParam("nameFileReal")}</Text>
            <Text>userId: {navigation.getParam("userId")}</Text>
          </View>
        </View>
        
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center"
  },
  list: {
    padding: 20
  },
  imageCenter: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 320,
    height: 320
  },
  productContainer: {
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd"
  },
  productTitle: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold"
  },
  buttonContent: {
    justifyContent: "center",
    alignItems: "center"
  },
  productButton: {
    width: 300,
    height: 45,
    marginTop: 30,
    borderRadius: 4,
    backgroundColor: "#4DAE4C",
    justifyContent: "center",
    alignItems: "center"
  },
  productButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold"
  },
  productDescription: {
    color: "#999",
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold"
  }
});
