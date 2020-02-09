import React, { Component } from 'react';
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
import NetInfo from '@react-native-community/netinfo';

export default class Signup extends Component {
  static navigationOptions = {
    header: null,
    headerBackTitle: null,
    title: 'Compomus Signup',
  };

  state = {
    userId: '',
    name: '',
    email: '',
    pass: '',
    soundRaw: '',
    soundName: '0',
  };

  componentDidMount() {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Look for Internet!', state.isInternetReachable);
    });
  }

  checkIfOnline() {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Have Internet?', state.isInternetReachable);
      if (state.isInternetReachable) {
        global.rawSource = 'http://compomus.funtechshow.com/api';
        this.verifyData();
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
          this.verifyData();
          console.log('Server connection way: localhost');
        } else if (response.status !== 200) {
          Alert.alert('Compomus', 'Você está fora da rede do Compomus!');
          console.log('error');
        }
      })
      .catch(error => {
        console.log('Server connection way: out of range');
        Alert.alert('Compomus', 'Você está fora da rede do Compomus!');
      });
  }

  CheckTextInput = () => {
    // Handler for the Submit onPress
    if (this.state.name !== '') {
      // Check for the Name TextInput
      if (this.state.email !== '') {
        // Check for the Email TextInput
        if (this.state.pass !== '') {
          // Check for the Email TextInput
          this.checkIfOnline();
          // this.verifyData();
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

  verifyData = async () => {
    const formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('pass', this.state.pass);
    fetch(`${global.rawSource}/index.php/validateUser`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Success', formData);
        const { email } = responseJson;
        const { pass } = responseJson;
        // console.log(formData);
        if (pass === this.state.pass && email === this.state.email) {
          Alert.alert('Compomus', 'Email já utilizado!');
          console.log('Email available for use');
        } else {
          this.postData();
          console.log('Email unavailable for use');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  postData = async () => {
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('email', this.state.email);
    formData.append('pass', this.state.pass);
    formData.append('soundRaw', this.state.soundRaw);
    formData.append('soundName', this.state.soundName);

    fetch(`${global.rawSource}/index.php/createUser`, {
      method: 'POST',
      body: formData,
    }).catch(error => {
      console.error(error);
    });
    this.getIn();
  };

  getIn = async () => {
    const formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('pass', this.state.pass);
    fetch(`${global.rawSource}/index.php/validateUser`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Success', formData);
        const { email } = responseJson;
        const { pass } = responseJson;
        const { soundName } = responseJson;
        const { id } = responseJson;
        this.setState({
          soundName,
          userId: id,
        });
        // console.log(pass);
        if (pass === this.state.pass && email === this.state.email) {
          if (soundName < 1) {
            this.props.navigation.navigate('SoundChooser', {
              userId: this.state.userId,
            });
            console.log('User created succesfully');
          } else {
            this.props.navigation.navigate('SoundChooser');
          }
        }
        // console.log('Success', responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  updateValue(text, field) {
    if (field === 'name') {
      this.setState({
        name: text,
      });
    } else if (field === 'email') {
      this.setState({
        email: text,
      });
    } else if (field === 'pass') {
      this.setState({
        pass: text,
      });
    }
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
              onChangeText={text => this.updateValue(text, 'name')}
              placeholder="Digite seu Nome"
              placeholderTextColor="#b3b3b3"
            />

            <TextInput
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => this.updateValue(text, 'email')}
              placeholder="Digite seu Email"
              placeholderTextColor="#b3b3b3"
            />
            <TextInput
              secureTextEntry
              style={styles.input}
              autoCapitalize="none"
              onChangeText={text => this.updateValue(text, 'pass')}
              placeholder="Digite uma Senha"
              placeholderTextColor="#b3b3b3"
            />
            <TouchableOpacity
              onPress={this.CheckTextInput}
              // onPress={() => {
              //   this.props.navigation.navigate('SoundChooser');
              // }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
            <View style={styles.contentRegister}>
              <Text style={styles.textRegister}>Já possui uma conta? </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Login');
                }}
                style={styles.buttonRegister}
              >
                <Text style={styles.buttonTextRegister}>Entrar</Text>
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
    // justifyContent: 'center',
    // marginTop: '15%',
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  welcome: {
    marginTop: '5%',
    marginBottom: '8%',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4DAE4C',
  },
  inputer: {
    flex: 3,
    // marginTop: '10%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#ddd',
  },
  input: {
    marginTop: 10,
    padding: 10,
    width: 300,
    height: 50,
    color: '#000',
    backgroundColor: '#fff',
    fontSize: 16,
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
