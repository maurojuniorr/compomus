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
	KeyboardAvoidingView,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
const unsubscribe = NetInfo.addEventListener(state => {
	console.log('Connection type', state.type);
	console.log('Look for Internet!', state.isInternetReachable);
});
export default class Signup extends Component {
	// static navigationOptions = {
	// 	headerShown: false,

	// 	title: 'Compomus Signup',
	// };

	state = {
		name: '',
		email: '',
		pass: '',
		soundRaw: '0',
		soundName: '0',
		userPass: '',
		userEmail: '',
		userName: '',
		userId: 0,
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

	storeData = async () => {
		let userInfo = {
			userId: this.state.userId,
			userName: this.state.userName,
			userEmail: this.state.userEmail,
			userPass: this.state.userPass,
			soundName: this.state.soundName,
			soundRaw: this.state.soundRaw,
		};
		try {
			await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
			//console.log(userInfo);
		} catch (e) {
			// saving error
		}
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
				const { soundName } = responseJson;
				const { soundRaw } = responseJson;
				const { pass } = responseJson;
				const { email } = responseJson;
				const { name } = responseJson;
				const { id } = responseJson;

				this.setState({
					soundName: soundName,
					soundRaw: soundRaw,
					userPass: pass,
					userEmail: email,
					userName: name,
					userId: id,
				});
				this.storeData();
				this.appData();
				// console.log(pass);

				if (pass === this.state.pass && email === this.state.email) {
					if (soundRaw < 1) {
						this.props.navigation.navigate('RootDrawerNavigator', {
							userId: this.state.userId,
						});
						Alert.alert('Usuário Criado com Sucesso!');
						console.log('User created succesfully');
					} else {
						this.props.navigation.navigate('RootDrawerNavigator');
						Alert.alert('Usuário Criado com Sucesso!');
						console.log('User created succesfully');
					}
				}
				// console.log('Success', responseJson);
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

	checkIfDisconnected() {
		fetch(`${global.localhost}/index.php`)
			.then(response => {
				if (response.status === 200) {
					global.rawSource = global.localhost;
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

	checkIfOnline() {
		NetInfo.fetch().then(state => {
			console.log('Connection type', state.type);
			console.log('Have Internet?', state.isInternetReachable);

			if (state.isInternetReachable && state.type === 'wifi') {
				fetch(`${global.localhost}/index.php`)
					.then(response => {
						if (response.status === 200) {
							global.rawSource = global.localhost;
							this.verifyData();
							console.log('Server connection way: localhost');
							console.log('Confirm connetion', state.isInternetReachable);
						} else if (response.status !== 200) {
							global.rawSource = global.online;
							this.verifyData();
							console.log('Server connection way: online');
							console.log('Confirm connetion', state.isInternetReachable);
						}
					})
					.catch(error => {
						console.log('Server connection way: out of range');
						global.rawSource = global.online;
						this.verifyData();
						//Alert.alert('Compomus', 'Você está fora da rede do Compomus!');
					});
			} else if (state.isInternetReachable && state.type === 'cellular') {
				global.rawSource = global.online;
				this.verifyData();
				console.log('Server connection way: online');
				console.log('Confirm connetion', state.isInternetReachable);
			} else {
				this.checkIfDisconnected();
			}
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

	render() {
		return (
			<>
				<StatusBar barStyle='dark-content' />
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
							onChangeText={text => this.updateValue(text, 'name')}
							returnKeyType={'next'}
							onSubmitEditing={() => this.field2.focus()}
							placeholder='Digite seu Nome'
							placeholderTextColor='#b3b3b3'
						/>

						<TextInput
							style={styles.input}
							keyboardType='email-address'
							autoCapitalize='none'
							onChangeText={text => this.updateValue(text, 'email')}
							returnKeyType={'next'}
							ref={input => {
								this.field2 = input;
							}}
							onSubmitEditing={() => this.field3.focus()}
							placeholder='Digite seu Email'
							placeholderTextColor='#b3b3b3'
						/>
						<TextInput
							secureTextEntry
							style={styles.input}
							autoCapitalize='none'
							returnKeyType={'done'}
							ref={input => {
								this.field3 = input;
							}}
							onChangeText={text => this.updateValue(text, 'pass')}
							placeholder='Digite uma Senha'
							placeholderTextColor='#b3b3b3'
							//onSubmitEditing={this.CheckTextInput}
						/>
					</View>
					<View>
						<TouchableOpacity
							onPress={this.CheckTextInput}
							style={styles.button}>
							<Text style={styles.buttonText}>Registrar</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.contentRegister}>
						<Text style={styles.textRegister}>Já possui uma conta? </Text>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('Login');
							}}
							style={styles.buttonRegister}>
							<Text style={styles.buttonTextRegister}>Entrar</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
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
		// justifyContent: 'center',
		marginTop: '15%',
		width: 170,
		height: 170,
		borderRadius: 50,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.3,
		// shadowRadius: 1,
	},
	welcome: {
		marginTop: '19%',
		//marginBottom: '3%',
		fontSize: 18,
		fontWeight: 'bold',
		color: '#4DAE4C',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.0,
		// shadowRadius: 1,
		elevation: 0,
	},
	inputer: {
		//flex: 3,
		// marginTop: '10%',
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: '#ddd',
	},
	input: {
		marginTop: 20,
		padding: 10,
		width: 300,
		height: 50,
		color: '#4a4a4a',
		backgroundColor: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
		borderRadius: 14,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		// shadowRadius: 1,
		elevation: 0,
	},
	button: {
		width: 300,
		height: 45,
		marginTop: 40,
		borderRadius: 14,
		backgroundColor: '#4DAE4C',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
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
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
	},
	textRegister: {
		color: '#4DAE4C',
		fontSize: 16,
		fontWeight: 'normal',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.0,
		// shadowRadius: 1,
		elevation: 0,
	},
	buttonTextRegister: {
		color: '#4DAE4C',
		fontSize: 18,
		fontWeight: 'bold',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.0,
		// shadowRadius: 1,
		elevation: 0,
	},
});
