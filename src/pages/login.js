import React, { Component } from 'react';
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
	Platform,
	KeyboardAvoidingView,
	SafeAreaView,
} from 'react-native';
//import SoundPlayer from 'react-native-sound-player';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

const unsubscribe = NetInfo.addEventListener(state => {
	console.log('Connection type', state.type);
	console.log('Look for Internet!', state.isInternetReachable);
});

export default class Login extends Component {
	// static navigationOptions = {
	// 	//headerShown: false,
	// 	//headerBackTitle: null,
	// 	//title: 'Compomus Login',
	// };

	state = {
		userId: '',
		soundName: '',
		email: '',
		pass: '',
		userName: '',
		soundRaw: '',
		appId: '',
		titleText: '',
		bodyText: '',
		imageURL: '',
		animationId: '',
		animation1: '',
		animation2: '',
		animation3: '',
		animation4: '',
		animation5: '',
		activateAnimation1: '',
		activateAnimation2: '',
	};

	componentDidMount() {}

	componentWillUnmount() {
		unsubscribe.remove;
	}
	storeAnimationData = async () => {
		let animationData = {
			animationId: this.state.animationId,
			animation1: this.state.animation1,
			animation2: this.state.animation2,
			animation3: this.state.animation3,
			animation4: this.state.animation4,
			animation5: this.state.animation5,
			activateAnimation1: this.state.activateAnimation1,
			activateAnimation2: this.state.activateAnimation2,
		};

		try {
			await AsyncStorage.setItem(
				'animationData',
				JSON.stringify(animationData)
			);
			console.log(animationData);
		} catch (e) {
			// saving error
		}
	};

	animationData() {
		fetch(`${global.rawSource}/index.php/animations`)
			.then(response => response.json())
			.then(responseJson => {
				// console.log('Success', formData);
				const { id } = responseJson;
				const { animation1 } = responseJson;
				const { animation2 } = responseJson;
				const { animation3 } = responseJson;
				const { animation4 } = responseJson;
				const { animation5 } = responseJson;
				const { activateAnimation1 } = responseJson;
				const { activateAnimation2 } = responseJson;

				// console.log(data);
				this.setState({
					animationId: id,
					animation1: animation1,
					animation2: animation2,
					animation3: animation3,
					animation4: animation4,
					animation5: animation5,
					activateAnimation1: activateAnimation1,
					activateAnimation2: activateAnimation2,
				});
				this.storeAnimationData();
			});
	}

	storeAppData = async () => {
		let appData = {
			appId: this.state.appId,
			titleText: this.state.titleText,
			bodyText: this.state.bodyText,
			imageURL: this.state.imageURL,
		};

		try {
			await AsyncStorage.setItem('appData', JSON.stringify(appData));
			console.log(appData);
		} catch (e) {
			// saving error
		}
	};

	appData() {
		fetch(`${global.rawSource}/index.php/appData`)
			.then(response => response.json())
			.then(responseJson => {
				// console.log('Success', formData);
				const { id } = responseJson;
				const { titleText } = responseJson;
				const { bodyText } = responseJson;
				const { imageURL } = responseJson;

				// console.log(data);
				this.setState({
					appId: id,
					titleText: titleText,
					bodyText: bodyText,
					imageURL: imageURL,
				});
				this.storeAppData();
			});
	}

	checkIfOnline() {
		NetInfo.fetch().then(state => {
			console.log('Connection type', state.type);
			console.log('Have Internet?', state.isInternetReachable);
			if (state.isInternetReachable && state.type === 'wifi') {
				fetch(`${global.localhost}/index.php`)
					.then(response => {
						if (response.status === 200) {
							global.rawSource = global.localhost;
							this.postData();
							console.log('Server connection way: localhost');
							console.log('Confirm connetion', state.isInternetReachable);
						} else if (response.status !== 200) {
							global.rawSource = global.online;
							this.postData();
							console.log('Server connection way: online');
							console.log('Confirm connetion', state.isInternetReachable);
						}
					})
					.catch(error => {
						console.log('Server connection way: only online wifi ');
						global.rawSource = global.online;
						this.postData();
						//Alert.alert('Compomus', 'Você está fora da rede do Compomus!');
					});
			} else if (state.isInternetReachable && state.type === 'cellular') {
				global.rawSource = global.online;
				this.postData();
				console.log('Server connection way: only online cellular');
				console.log('Confirm connetion', state.isInternetReachable);
			} else {
				this.checkIfDisconnected();
			}
		});
	}

	checkIfDisconnected() {
		fetch(`${global.localhost}/index.php`)
			.then(response => {
				if (response.status === 200) {
					global.rawSource = global.localhost;
					this.postData();
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

	storeData = async () => {
		let userInfo = {
			userId: this.state.userId,
			userName: this.state.userName,
			userEmail: this.state.email,
			userPass: this.state.pass,
			soundName: this.state.soundName,
			soundRaw: this.state.soundRaw,
		};
		try {
			await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
		} catch (e) {
			// saving error
		}
	};

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
				const { soundName } = responseJson;
				const { soundRaw } = responseJson;
				const { pass } = responseJson;
				const { email } = responseJson;
				const { name } = responseJson;
				const { id } = responseJson;
				this.setState({
					soundRaw: soundRaw,
					soundName: soundName,
					userName: name,
					userId: id,
				});

				this.storeData();
				this.appData();
				this.animationData();

				if (pass === this.state.pass && email === this.state.email) {
					if (soundName < 1) {
						this.props.navigation.navigate('RootDrawerNavigator', {
							userId: this.state.userId,
						});
					} else {
						this.props.navigation.navigate('RootDrawerNavigator', {
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
				const { name } = responseJson;
				const { nameFile } = responseJson;

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
	};

	render() {
		return (
			<>
				<StatusBar barStyle='dark-content' />
				{/* <View style={styles.container}> */}
				<KeyboardAvoidingView
					style={styles.container}
					behavior={Platform.select({
						ios: 'padding',
						android: null,
					})}>
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
							returnKeyType={'next'}
							onSubmitEditing={() => this.field2.focus()}
							onChangeText={text => this.updateValue(text, 'email')}
						/>
						<TextInput
							secureTextEntry={true}
							style={styles.input}
							autoCapitalize={'none'}
							returnKeyType={'go'}
							ref={input => {
								this.field2 = input;
							}}
							placeholder={'Digite sua Senha'}
							placeholderTextColor={'#b3b3b3'}
							onSubmitEditing={this.CheckTextInput}
							onChangeText={text => this.updateValue(text, 'pass')}
						/>
					</View>
					<View>
						<TouchableOpacity
							onPress={this.CheckTextInput}
							style={styles.button}>
							<Text style={styles.buttonText}>Login</Text>
						</TouchableOpacity>
					</View>

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
				</KeyboardAvoidingView>

				{/* </View> */}
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#f1f1f1',
	},
	logoContent: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		//justifyContent: 'center',
		//marginTop: '5%',
		width: 170,
		height: 170,
		borderRadius: 50,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		// shadowRadius: 1,
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
		//flex: 3,
		//marginTop: '10%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		// backgroundColor: '#ddd',
	},
	input: {
		marginTop: 20,
		padding: 10,
		width: 300,
		height: 50,
		backgroundColor: '#fff',
		fontSize: 16,
		color: '#4a4a4a',
		fontWeight: 'bold',
		borderRadius: 14,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		// shadowRadius: 1,
		elevation: 0,
	},
	button: {
		width: 300,
		height: 45,
		borderRadius: 14,
		marginTop: 40,
		backgroundColor: '#4DAE4C',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		// shadowRadius: 1,
		elevation: 0,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	contentRegister: {
		flex: 1,
		justifyContent: 'flex-end',
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
