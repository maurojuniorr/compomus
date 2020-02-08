import React, {Component} from 'react';
import '../services/api';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import NetInfo from '@react-native-community/netinfo';
const unsubscribe = NetInfo.addEventListener(state => {
  console.log('Connection type', state.type);
  console.log('Look for Internet!', state.isInternetReachable);
});

export default class Login extends Component {
  static navigationOptions = {
    //header: null,
    headerBackTitle: null,
    title: 'Compomus Login',
  };

  state = {
    userId: '', 
    soundName: '',
    email: '',
    pass: '',
  };

  componentDidMount() {
    this._onFinishedLoadingFileSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingFile',
      ({success, name, type}) => {
        console.log('finished loading file with success', success, name, type);
      },
    );

    //this.defineApi();
  }

  checkIfOnline() {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Have Internet?', state.isInternetReachable);
      if (state.isInternetReachable) {
        global.rawSource = 'http://compomus.funtechshow.com/api';
        this.postData();
        console.log('Server connection way: online');
        console.log('Confirm connetion', state.isInternetReachable);
      } else {
        this.checkIfDisconnected();
      }
    });
  }

  checkIfDisconnected() {
    fetch('http://192.168.86.1/compomusServer/index.php')
      .then(response => {
        if (response.status === 200) {
          global.rawSource = 'http://192.168.86.1/compomusServer';
          this.postData();
          console.log('Server connection way: localhost');
        } else if (response.status !== 200) {
          Alert.alert('Compomus', 'Você está fora do alcance do Compomus!');
          console.log('error');
        }
      })
      .catch(error => {
        console.log('Server connection way: out of range');
        Alert.alert('Compomus', 'Você está fora do alcance do Compomus!');
      });
  }

  postData = async () => {
    let formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('pass', this.state.pass);
    fetch(`${global.rawSource}/index.php/validateUser`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log('Success', formData);
        const {email} = responseJson;
        const {pass} = responseJson;
        const {soundName} = responseJson;
        const {id} = responseJson;
        this.setState({
          soundName: soundName,
          userId: id,
        });
        if (pass === this.state.pass && email === this.state.email) {
          if (soundName < 1) {
            this.props.navigation.navigate('SoundChooser', {
              userId: this.state.userId,
            });
          } else {
            this.props.navigation.navigate('SoundChooser', {
              userId: this.state.userId,
            });
            //this.getIn();
          }
        } else if (responseJson === false) {
          Alert.alert('Compomus', 'Email ou senha incorretos!');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  getIn() {
    let formData = new FormData();
    formData.append('nameFile', this.state.soundName);
    fetch(`${global.rawSource}/index.php/getThisSound`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        const {name} = responseJson;
        const {nameFile} = responseJson;

        if (responseJson !== false) {
          this.props.navigation.navigate('Compose', {
            nameFile: nameFile,
          });
          this.props.navigation.navigate('Compose', {
            nameFileReal: name,
          });
          this.props.navigation.navigate('Compose', {
            userId: this.state.userId,
          });
        }
        //console.log('Success', responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateValue(text, field) {
    if (field === 'email') {
      this.setState({
        email: text,
      });
    } else if (field === 'pass') {
      this.setState({
        pass: text,
      });
    }
  }

  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.name !== '') {
      //Check for the Name TextInput
      if (this.state.email !== '') {
        //Check for the Email TextInput
        if (this.state.pass !== '') {
          //Check for the Email TextInput
          this.checkIfOnline();
          // this.postData();
        } else {
          Alert.alert('Digite uma senha');
        }
      } else {
        Alert.alert('Digite um email');
      }
    } else {
      Alert.alert('Digite seu nome');
    }
  };

  componentWillUnmount() {
    SoundPlayer.stop();
    unsubscribe.remove;

    this._onFinishedLoadingFileSubscription.remove();
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.logoContent}>
            <Image
              style={styles.logo}
              source={require('../assets/icon_round.png')}
            />
          </View>
          <View style={styles.inputer}>
            <Text style={styles.welcome}>Bem Vindo(a) ao Compomus!</Text>

            <TextInput
              style={styles.input}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              //textContentType={'emailAdress'}
              placeholder={'Digite seu Email'}
              placeholderTextColor={'#b3b3b3'}
              onChangeText={text => this.updateValue(text, 'email')}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              autoCapitalize={'none'}
              placeholder={'Digite sua Senha'}
              placeholderTextColor={'#b3b3b3'}
              onChangeText={text => this.updateValue(text, 'pass')}
            />
            <TouchableOpacity
              onPress={this.CheckTextInput}
              style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.contentRegister}>
              <Text style={styles.textRegister}>Não tem conta ainda? </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Signup');
                }}
                style={styles.buttonRegister}>
                <Text style={styles.buttonTextRegister}>Registrar-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  logoContent: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    //justifyContent: 'center',
    //marginTop: '5%',
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  welcome: {
    marginTop: '5%',
    marginBottom: '8%',
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4DAE4C',
  },
  inputer: {
    flex: 3,
    //marginTop: '10%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#ddd',
  },
  input: {
    marginTop: 10,
    padding: 10,
    width: 300,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    borderRadius: 4,
  },
  button: {
    width: 300,
    height: 45,
    marginTop: 30,
    borderRadius: 4,
    backgroundColor: '#4DAE4C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentRegister: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textRegister: {
    color: '#4DAE4C',
    fontSize: 16,
    fontWeight: 'normal',
  },
  buttonTextRegister: {
    color: '#4DAE4C',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
