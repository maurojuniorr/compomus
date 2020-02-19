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
	ActivityIndicator,
} from 'react-native';
//import SoundPlayer from 'react-native-sound-player';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

const unsubscribe = NetInfo.addEventListener(state => {
	console.log('Connection type:', state.type);
	console.log('Look for Internet!', state.isInternetReachable);
});

export default class Login extends Component {
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
		isLoading: false,
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

	animationData = async () => {
		try {
			const response = await fetch(`${global.rawSource}/index.php/animations`);
			if (response.status === 200) {
				const responseJson = await response.json();
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
			}
		} catch (error) {}
	};

	storeAppData = async () => {
		let appData = {
			appId: this.state.appId,
			titleText: this.state.titleText,
			bodyText: this.state.bodyText,
			imageURL: this.state.imageURL,
		};

		try {
			await AsyncStorage.setItem('appData', JSON.stringify(appData));
			// console.log(appData);
		} catch (e) {
			// saving error
		}
	};

	appData = async () => {
		try {
			const response = await fetch(`${global.rawSource}/index.php/appData`);
			if (response.status === 200) {
				const responseJson = await response.json();
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
			}
		} catch (error) {}
	};

	checkIfOnline = async () => {
		try {
			const state = await NetInfo.fetch();
			console.log('Connection type:', state.type);
			console.log('Have Internet?', state.isInternetReachable);

			if (state.isInternetReachable && state.type === 'wifi') {
				try {
					const response = await fetch(`${global.localhost}/index.php`);

					if (response.status === 200) {
						global.rawSource = global.localhost;
						this.postData();
						console.log(
							'Server connection way: For performance using localhost'
						);
						console.log('Confirm connetion', state.isInternetReachable);
					} else {
						global.rawSource = global.online;
						this.postData();
						console.log('Server connection way: online');
						console.log('Confirm connetion', state.isInternetReachable);
					}
				} catch (error) {
					global.rawSource = global.online;
					this.postData();
					console.log(
						'Server connection way: localhost offline,  using online server!'
					);
					console.log('Confirm connetion', state.isInternetReachable);
				}
			} else if (state.isInternetReachable && state.type === 'cellular') {
				try {
					const response = await fetch(`${global.rawSource}/index.php`);
					if (response.status === 200) {
						global.rawSource = global.online;
						this.postData();
						console.log('Server connection way: only online cellular');
						console.log('Confirm connetion', state.isInternetReachable);
					} else {
						Alert.alert(
							'Compomus',
							'Erro interno de comunicação\n Tente novamente mais tarde'
						);
					}
				} catch (error) {
					Alert.alert('Compomus', 'Erro de resposta do servidor');
				}
			} else if (!state.isInternetReachable && state.type === 'wifi') {
				try {
					const response = await fetch(`${global.localhost}/index.php`);
					if (response.status === 200) {
						global.rawSource = global.localhost;
						this.postData();
						console.log(
							'Server connection way: online server offline, using localhost'
						);
						console.log('Confirm connetion', state.isInternetReachable);
					} else {
						Alert.alert(
							'Compomus',
							'Erro interno de comunicação\n Tente novamente mais tarde'
						);
					}
				} catch (error) {
					Alert.alert('Compomus', 'Sem resposta do servidor');
				}

				//this.checkIfDisconnected();
			} else if (!state.isInternetReachable && state.type === 'cellular') {
				Alert.alert(
					'Erro de comunicação',
					'É necessária uma conexão com a internet ou com a rede Commpomus'
				);

				//this.checkIfDisconnected();
			} else {
				Alert.alert(
					'Erro de comunicação',
					'É necessária uma conexão com a internet ou com a rede Commpomus'
				);
			}
		} catch (error) {
			Alert.alert(
				'Erro de comunicação',
				'É necessária uma conexão com a internet ou com a rede Commpomus'
			);
			// global.rawSource = global.online;
			// this.postData();
		}
	};

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
		this.setState({ isLoading: true });
		try {
			const response = await fetch(
				`${global.rawSource}/index.php/validateUser`,
				{
					method: 'POST',
					body: formData,
				}
			);
			if (response.status === 200) {
				this.setState({ isLoading: false });
				const responseJson = await response.json();

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
			} else {
				Alert.alert(
					'Compomus',
					'Houve um erro na solicitação\n Por favor tente novamente!'
				);
			}
		} catch (error) {
			console.log(err.message);
		}
	};

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
				Alert.alert('Compomus', 'Digite uma senha');
			}
		} else {
			Alert.alert('Compomus', 'Digite um email');
		}
	};

	render() {
		console.disableYellowBox = true;
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
							source={require('../assets/icon_round2.png')}
						/>
					</View>

					<View style={styles.inputer}>
						{this.state.isLoading ? (
							// <ActivityIndicator/>
							<Text style={styles.welcome}>Fazendo login aguarde...</Text>
						) : (
							<Text style={styles.welcome}>Bem Vindo(a) ao Compomus!</Text>
						)}

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
					<View style={styles.contentButton}>
						<TouchableOpacity
							onPress={this.CheckTextInput}
							style={styles.button}>
							<Text style={styles.buttonText}>Login</Text>
						</TouchableOpacity>
						<View style={styles.contentButtonRegister}>
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
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'stretch',
		// alignItems: 'center',
		marginTop: '12%',
		// width: '100%',
	},
	logo: {
		// justifyContent: 'center',
		marginBottom: '-5%',
		// alignItems: 'center',
		resizeMode: 'contain',
		width: '100%',
		height: '60%',
		//borderRadius: 50,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		// shadowRadius: 1,
	},
	welcome: {
		//marginTop: '5%',
		marginBottom: '10%',
		//padding: 10,
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
		marginBottom: '8%',
		padding: '2%',
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
		// marginTop: 20,
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
		//flex: 1,
		// justifyContent: 'flex-end',
		alignItems: 'baseline',
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
	contentButtonRegister: {
		// flex: 1,
		marginTop: '8%',
		// justifyContent: 'flex-end',
		// alignItems: 'center',
		// marginBottom: '6%',
	},
	contentButton: {
		// flex: 1,
		marginTop: '22%',
		justifyContent: 'flex-end',
		alignItems: 'center',
		//marginBottom: '4%',
	},
});
