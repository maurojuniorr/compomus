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
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-navigation';
// const unsubscribe = NetInfo.addEventListener(state => {
// 	console.log('Connection type', state.type);
// 	console.log('Look for Internet!', state.isInternetReachable);
// });
const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);
export default class Signup extends Component {
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
		isLoading: false,
		conectionStatus: '',
		isInternetReachable: '',
		type: '',
		isConnected: '',
		beaconRange: 0,
		major: 0,
		minor: 0,
		identifier: '',
		UUID: '',
		serverIp: '192.168.86.1',
		serverPort: 0,
	};

	componentDidMount() {
		const unsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);
	}
	handleConnectivityChange = isConnected => {
		this.setState({
			type: isConnected.type,
			isInternetReachable: isConnected.isInternetReachable,
		});
		console.log(
			'Connection type',
			isConnected.type,
			'isInternetReachable',
			isConnected.isInternetReachable
		);
	};

	messageTimer() {
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 5000);
	}
	storeBeaconData = async () => {
		let beaconData = {
			uuid: this.state.UUID,
			identifier: this.state.identifier,
			major: this.state.major,
			minor: this.state.minor,
			beaconRange: this.state.beaconRange,
			serverIp: this.state.serverIp,
			serverPort: this.state.serverPort,
		};

		try {
			await AsyncStorage.setItem('beaconData', JSON.stringify(beaconData));
			console.log(beaconData);
		} catch (e) {
			// saving error
		}
	};

	beacondata = async () => {
		let formData = new FormData();

		formData.append('beaconOrder', '1');

		try {
			const response = await fetch(
				`${global.rawSource}/index.php/getThisBeacon`,
				{
					method: 'POST',
					body: formData,
				}
			);
			if (response.status === 200) {
				this.setState({ isLoading: false });
				const responseJson2 = await response.json();

				const { uuid } = responseJson2;
				const { identifier } = responseJson2;
				const { major } = responseJson2;
				const { minor } = responseJson2;
				const { beaconRange } = responseJson2;
				const { data } = responseJson2;
				this.setState({
					UUID: uuid,
					identifier: identifier,
					major: parseInt(major),
					minor: parseInt(minor),
					beaconRange: parseFloat(beaconRange),
				});
			}
		} catch (error) {}
		try {
			const response = await fetch(`${global.rawSource}/index.php/soundServer`);
			if (response.status === 200) {
				const responseJson = await response.json();
				// console.log('Success', formData);
				const { ip } = responseJson;
				const { port } = responseJson;
				// console.log(responseJson);
				this.setState({
					serverIp: ip,
					serverPort: parseInt(port),
				});
			}
		} catch (error) {}
		this.storeBeaconData();
	};

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
			console.log(appData);
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
		try {
			const response = await fetch(
				`${global.rawSource}/index.php/validateUser`,
				{
					method: 'POST',
					body: formData,
				}
			);
			if (response.status === 200) {
				const responseJson = await response.json();
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

				// console.log(pass);

				if (pass === this.state.pass && email === this.state.email) {
					this.storeData();
					// this.appData();
					this.beacondata();
					this.animationData();
					if (soundRaw < 1) {
						this.props.navigation.navigate('Tutorial', {
							userId: this.state.userId,
						});

						console.log('User created succesfully');
					} else {
						this.props.navigation.navigate('Tutorial');
						console.log('User created succesfully');
					}
				}
				// console.log('Success', responseJson);
			} else {
			}
		} catch (error) {
			this.setState({
				conectionStatus: 'Servidor local offline\ntentando online...',
			});
			this.messageTimer();
			try {
				const response = await fetch(
					`${global.online}/index.php/validateUser`,
					{
						method: 'POST',
						body: formData,
					}
				);
				if (response.status === 200) {
					// this.setState({ isLoading: false });
					global.rawSource = global.online;
					const responseJson = await response.json();
					console.log('Server connection way: localhost fora usando online');
					// console.log('Success', formData);
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

					if (pass === this.state.pass && email === this.state.email) {
						this.storeData();
						// this.appData();
						this.animationData();
						this.beacondata();
						if (soundName < 1) {
							this.props.navigation.navigate('Tutorial', {
								userId: this.state.userId,
							});
						} else {
							this.props.navigation.navigate('Tutorial', {
								userId: this.state.userId,
							});
							// this.getIn();
						}
					} else if (responseJson === false) {
						// Alert.alert('Compomus', 'Email ou senha incorretos!');
						this.setState({
							conectionStatus: 'Email ou senha incorretos!',
						});
						this.messageTimer();
					}
				} else {
					// Alert.alert(
					// 	'Compomus',
					// 	'Houve um erro na solicitação\n Por favor tente novamente!'
					// );
					this.setState({
						conectionStatus:
							'Houve um erro na solicitação\n Por favor tente novamente!',
					});
					this.messageTimer();
				}
			} catch (error) {
				console.log(error.message);
				// Alert.alert('Compomus', 'Servidor local offline');
				this.setState({ conectionStatus: 'Servidores offline' });
				this.messageTimer();
			}
			// console.log(error.message);
			// // Alert.alert('Compomus', 'Servidor local offline');
			// this.setState({ conectionStatus: 'Servidor local offline' });
			// this.messageTimer();
		}
	};

	postData = async () => {
		const formData = new FormData();
		formData.append('name', this.state.name);
		formData.append('email', this.state.email);
		formData.append('pass', this.state.pass);
		formData.append('soundRaw', this.state.soundRaw);
		formData.append('soundName', this.state.soundName);
		try {
			const response = await fetch(`${global.rawSource}/index.php/createUser`, {
				method: 'POST',
				body: formData,
			});
			if (response.status === 200) {
				Alert.alert('Compomus', 'Usuário Criado com Sucesso!');
				//this.setState({ isLoading: false });
				this.getIn();
			} else {
				// Alert.alert(
				// 	'Erro ao criar usuário',
				// 	'Houve um erro em sua solicitação \n Por favor tente novamente'
				// );
				this.setState({
					conectionStatus:
						'Houve um erro em sua solicitação \n Por favor tente novamente',
				});
				this.messageTimer();
				console.log(err.message);
			}
		} catch (error) {
			// Alert.alert(
			// 	'Erro ao criar usuário',
			// 	'Houve um erro em sua solicitação \n Por favor tente novamente'
			// );
			this.setState({
				conectionStatus:
					'Houve um erro em sua solicitação \n Por favor tente novamente',
			});
			this.messageTimer();
			console.log(err.message);
		}
	};

	verifyData = async () => {
		const formData = new FormData();
		formData.append('email', this.state.email);
		formData.append('pass', this.state.pass);
		try {
			const response = await fetch(
				`${global.rawSource}/index.php/validateUser`,
				{
					method: 'POST',
					body: formData,
				}
			);
			if (response.status === 200) {
				const responseJson = await response.json();
				const { email } = responseJson;
				const { pass } = responseJson;
				// console.log(formData);
				if (pass === this.state.pass && email === this.state.email) {
					// Alert.alert(
					// 	'Atenção!',
					// 	'Email já foi utilizado!\nPor favor tente usar outro'
					// );
					this.setState({
						conectionStatus: 'Email já foi utilizado!',
					});
					this.messageTimer();
					console.log('Email unavailable for use');
				} else {
					this.postData();
					console.log('Email unavailable for use');
				}
			} else {
				// Alert.alert(
				// 	'Compomus',
				// 	'Houve um erro na solicitação\n Por favor tente novamente!'
				// );
				this.setState({
					conectionStatus:
						'Houve um erro na solicitação\n Por favor tente novamente!',
				});
				this.messageTimer();
			}
		} catch (error) {
			console.log(err.message);
			// Alert.alert(
			// 	'Erro ao criar usuário',
			// 	'Houve um erro em sua solicitação \n Por favor tente novamente'
			// );
			this.setState({
				conectionStatus:
					'Houve um erro em sua solicitação \n Por favor tente novamente',
			});
			this.messageTimer();
		}
	};

	checkIfOnline = async () => {
		this.setState({ conectionStatus: 'Verficando conexão...' });
		this.setState({ isLoading: true });

		if (this.state.isInternetReachable && this.state.type === 'wifi') {
			try {
				const ms = await Ping.start(this.state.serverIp, { timeout: 1000 });
				this.setState({ conectionStatus: 'Fazendo cadastro local...' });
				console.log('Ping ms: ', ms);
				global.rawSource = global.localhost;
				this.verifyData();
				console.log('Server connection way: For performance using localhost');
				// Alert.alert('Compomus', 'chegueiaqui');
				//console.log('Confirm internet', this.state.isInternetReachable);
			} catch (error) {
				console.log('special code', error.code, error.message);
				fetch(`${global.online}/index.php`)
					.then(response => {
						if (response.status === 200) {
							global.rawSource = global.online;
							this.setState({ conectionStatus: 'Fazendo cadastro online...' });
							this.verifyData();
							console.log('Server connection way: only online with wifi ');
							//console.log('Confirm internet', this.state.isInternetReachable);
						} else if (response.status !== 200) {
							// Alert.alert('Compomus', 'Erro de resposta do servidor');
							this.setState({
								conectionStatus: 'Erro de resposta do servidor',
							});
							this.messageTimer();
						}
					})
					.catch(err => {
						// Alert.alert('Compomus', 'Servidor online não responde');
						this.setState({ conectionStatus: 'Servidor online não responde' });
						this.messageTimer();
					});
			}
		} else if (
			this.state.isInternetReachable &&
			this.state.type === 'cellular'
		) {
			// Alert.alert('Compomus', 'tem internet e é celular');
			fetch(`${global.online}/index.php`)
				.then(response => {
					if (response.status === 200) {
						this.setState({ conectionStatus: 'Fazendo cadastro online...' });
						global.rawSource = global.online;
						this.verifyData();
						console.log('Server connection way: only online with wifi ');
						//console.log('Confirm internet', this.state.isInternetReachable);
					} else if (response.status !== 200) {
						// Alert.alert('Compomus', 'Erro de resposta do servidor');
						this.setState({ conectionStatus: 'Erro de resposta do servidor' });
						this.messageTimer();
					}
				})
				.catch(err => {
					// Alert.alert('Compomus', 'Servidor online não responde');
					this.setState({ conectionStatus: 'Servidor online não responde' });
					this.messageTimer();
				});
		} else {
			fetch(`${global.localhost}/index.php`)
				.then(response => {
					if (response.status === 200) {
						global.rawSource = global.localhost;
						this.verifyData();
						this.setState({ conectionStatus: 'Fazendo cadastro local...' });
						console.log('Server connection way: only online with wifi ');
						//console.log('Confirm internet', this.state.isInternetReachable);
					} else if (response.status !== 200) {
						// Alert.alert('Compomus', 'Erro de resposta do servidor');
						this.setState({ conectionStatus: 'Erro de resposta do servidor' });
						this.messageTimer();
					}
				})
				.catch(err => {
					this.setState({ conectionStatus: 'Servidor local não responde' });
					this.messageTimer();
					// Alert.alert('Compomus', 'Servidor local não responde');
					// this.setState({ isLoading: false });
				});
		}
	};

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
					Alert.alert('Compomus', 'Digite uma senha');
				}
			} else {
				Alert.alert('Compomus', 'Digite um email');
			}
		} else {
			Alert.alert('Compomus', 'Digite seu nome');
		}
	};

	render() {
		return (
			<DismissKeyboard>
				<SafeAreaView style={styles.container}>
					<StatusBar barStyle='dark-content' />
					<KeyboardAvoidingView
						behavior={Platform.select({
							ios: 'height',
							android: null,
						})}
						enabled>
						<View style={styles.logoContent}>
							<Image
								style={styles.logo}
								source={require('../assets/icon_round2.png')}
							/>
						</View>
						<View style={styles.inputer}>
							{this.state.isLoading ? (
								// <ActivityIndicator/>
								<Text style={styles.welcome}>{this.state.conectionStatus}</Text>
							) : (
								<Text style={styles.welcome}>Bem Vindo(a) ao Compomus!</Text>
							)}
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
							<TouchableOpacity
								onPress={this.CheckTextInput}
								style={styles.button}>
								<Text style={styles.buttonText}>Registrar</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.contentButton}>
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
						</View>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</DismissKeyboard>
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
		// marginTop: '12%',
		// backgroundColor: 'blue',
	},
	logo: {
		// justifyContent: 'center',
		resizeMode: 'contain',
		// alignItems: 'center',
		width: '100%',

		height: '55%',
		// borderRadius: 980,
		// shadowColor: '#000',
		// shadowOffset: { width: 0, height: 0 },
		// shadowOpacity: 0.5,
		// shadowRadius: 1,
	},
	welcome: {
		textAlign: 'center',
		marginBottom: '7%',
		// padding: 10,
		fontSize: 18,
		fontWeight: 'bold',
		color: '#4DAE4C',
	},
	inputer: {
		// flex: 2,
		marginTop: '2%',
		justifyContent: 'space-between',
		alignItems: 'center',
		// backgroundColor: 'red',
	},
	input: {
		marginBottom: '7%',
		padding: '2%',
		width: 300,
		height: 50,
		color: '#4a4a4a',
		backgroundColor: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
		borderRadius: 14,
		shadowColor: 'rgba(0, 0, 0, 0.22)',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.5,
		// shadowRadius: 1,
		elevation: 0.5,
	},
	button: {
		width: 300,
		height: 45,
		// marginTop: 40,
		borderRadius: 14,
		backgroundColor: '#4DAE4C',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: 'rgba(0, 0, 0, 0.22)',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.5,
		// shadowRadius: 1,
		elevation: 0.5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
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
	contentRegister: {
		flex: 1,
		// justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
	},
	contentButton: {
		// flex: 1,
		marginTop: '2%',
		width: '100%',
		height: '15%',
		justifyContent: 'center',
		alignSelf: 'center',
		// marginBottom: '2%',
		// backgroundColor: 'green',
	},
});
