import React, { Component } from "react";

import SoundPlayer from "react-native-sound-player";

// import songList from '../data/songList';
import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  NativeModules
} from "react-native";

const { MyNativeModule } = NativeModules;

export default class SoundChooser extends Component {
  _onFinishedLoadingFileSubscription = null;


  state = {
    data: [],
    userId: 0
  };

  componentDidMount() {
    this.makeRemoteRequest();

    this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
      console.log('Reprodução terminada: ', success)
    })
  }

  componentWillUnmount() {
    SoundPlayer.stop();
    this._onFinishedPlayingSubscription.remove()
    //this._onFinishedLoadingFileSubscription.remove();
  }

  playSong(song, nameSong) {
    
    try {
      SoundPlayer.playUrl(`${global.rawSource}/raw/${song}.mp3`);
      console.log("Esse é o som reproduzido: ", nameSong);
    } catch (e) {
      Alert.alert("Esse som não pode ser reproduzido");
      console.log("Esse som não pode ser reproduzido: ", nameSong);
    }
  }

  makeRemoteRequest() {
    fetch(`${global.rawSource}/index.php/sound`)
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Success', formData);
        const data = responseJson;
        this.setState({ data });
        // console.log(data);
      });
    this.getUser();
  }

  getUser() {
    const { navigation } = this.props;
    const id = navigation.getParam("userId");
    this.setState({
      userId: id
    });
    // console.log('User id', this.state.userId);
  }

  renderItem = ({ item, index }) => (
    <View style={styles.soundContainer}>
      <Text style={styles.soundName}>{item.name}</Text>
      <Text style={styles.soundDescription}>{item.description}</Text>

      <View style={styles.buttonContent}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={text => this.playSong(item.nameFile, item.name)}
        >
          <Text style={styles.soundButtonText}>Tocar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chooseButton}
          onPress={() => {
            this.props.navigation.navigate("Compose", {
              nameFile: item.nameFile
            });
            this.props.navigation.navigate("Compose", {
              nameFileReal: item.name
            });
            this.props.navigation.navigate("Compose", {
              userId: this.state.userId
            });
            MyNativeModule.userInfo(
              parseInt(this.state.userId, 10),
              item.nameFile
            );
          }}
        >
          <Text style={styles.soundButtonText}>Escolher</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.list}
            data={this.state.data}
            keyExtractor={item => item.id}
            renderItem={({ index, item }) => {
              return <this.renderItem item={item} index={index} />;
            }}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd"
  },
  list: {
    padding: 20
  },
  soundContainer: {
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd"
  },
  soundName: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonContent: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  playButton: {
    width: 130,
    height: 45,
    marginTop: 20,
    borderRadius: 14,
    backgroundColor: "#00A4DC",
    justifyContent: "center",
    alignItems: "center"
  },
  chooseButton: {
    width: 130,
    height: 45,
    marginTop: 20,
    borderRadius: 14,
    backgroundColor: "#4DAE4C",
    justifyContent: "center",
    alignItems: "center"
  },
  soundButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold"
  },
  soundDescription: {
    color: "#999",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold"
  }
});
