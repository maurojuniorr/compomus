import SoundPlayer from 'react-native-sound-player';
import React, { Component } from 'react';
import {
	View,
	Text,
	Alert,
	StyleSheet,
	StatusBar,
	NativeModules,
	NativeEventEmitter,
	AppState,
	TouchableOpacity,
	Image,
	Animated,
	ActivityIndicator,
} from 'react-native';
import LottieView from 'lottie-react-native';

import AsyncStorage from '@react-native-community/async-storage';

// const { MyNativeModule } = NativeModules;
// const CounterEvents = new NativeEventEmitter(NativeModules.MyNativeModule);

export default class ComposeAndroid extends Component {
	state = {
		dataSource: [],
		isLoading: true,
		appState: AppState.currentState,
		proximity: ' ',
		lifeStatus: ' ',
		distance: 0.0,
		degrees: '',
		userId: 0,
		userName: '',
		userEmail: '',
		userPass: '',
		soundName: '',
		soundRaw: '',
		choosenSound: '',

		beaconRange: 0,
		major: 0,
		minor: 0,
		screenColor: '',
		identifier: '',
		UUID: '',
		serverIp: '',
		serverPort: 0,

		locationStatus: '',
		animationId: '',
		animation1: '',
		animation2: '',
		animation3: '',
		animation4: '',
		animation5: '',
		activateAnimation1: '',
		activateAnimation2: '',
		statusMesage: '',
		statusRodape: '',
		colorHolder: '#00BCD4',
		isLoading: false,
	};

	componentDidMount() {
		// AppState.addEventListener('change', this._handleAppStateChange);
		// CounterEvents.addListener('onChange', this._eventSubscription);
		this.playSong();

		this.getBeaconData();
		this.getUserData();
	}

	componentWillUnmount() {
		SoundPlayer.stop();
		// AppState.removeEventListener('change', this._handleAppStateChange);
		// CounterEvents.removeAllListeners(
		// 	'onChange',
		// 	this._eventSubscription,
		// 	MyNativeModule.screenStatus('inactive')
		// );
	}

	updateSound = async (id, name, email, pass, nameSound, rawSound) => {
		let formData = new FormData();

		formData.append('id', id);
		formData.append('name', name);
		formData.append('email', email);
		formData.append('pass', pass);
		formData.append('soundRaw', nameSound);
		formData.append('soundName', rawSound);
		try {
			console.log(global.rawSource);
			const response = await fetch(`${global.rawSource}/index.php/updateUser`, {
				method: 'POST',
				body: formData,
			});
			if (response.status === 200) {
				//const responseJson = await response.json();
				console.log('Mudança gravada no banco com sucesso!');
				// Alert.alert('Compomus', 'Som escolhido com sucesso!');
			} else {
				Alert.alert('Compomus', 'Erro ao definir som');
			}
		} catch (error) {
			Alert.alert(
				'Compomus',
				'Sem resposta do servidor\n Por Favor tente novamente'
			);
		}

		//console.log(formData);
	};

	getUserData = async () => {
		try {
			const value = await AsyncStorage.getItem('userInfo');
			let parsed = JSON.parse(value);
			if (value !== null) {
				// value previously stored

				const id = parseInt(parsed.userId);
				const name = parsed.userName;
				const email = parsed.userEmail;
				const pass = parsed.userPass;
				const nameSound = parsed.soundName;
				const rawSound = parsed.soundRaw;

				this.updateSound(id, name, email, pass, nameSound, rawSound);

				console.log('parsed', id, nameSound, rawSound);
				// MyNativeModule.userInfo(id, nameSound, rawSound);

				this.setupNative();
				this.getAnimationData();
			}
		} catch (e) {
			// error reading value
		}
	};

	_eventSubscription = result => {
		this.setState({
			distance: parseFloat(result.distance),
			proximity: result.proximity,
			degrees: result.degrees,
			lifeStatus: result.alive,
			userId: result.userId,
			soundName: result.soundName,
			soundRaw: result.soundRaw,
		});

		this.screenColor();
		this.screenActivity();
	};

	getBeaconData = async () => {
		this.setState({ isLoading: true });
		try {
			const value = await AsyncStorage.getItem('beaconData');
			let parsed = JSON.parse(value);
			if (value !== null) {
				// value previously stored
				// this.setState({ isLoading: false });
				this.setState({
					UUID: parsed.uuid,
					identifier: parsed.identifier,
					major: parsed.major,
					minor: parsed.minor,
					beaconRange: parsed.beaconRange,
					serverIp: parsed.serverIp,
					serverPort: parsed.serverPort,
				});
				console.log(parsed);
				// this.setupNative();
			}
		} catch (e) {
			// error reading value
		}
	};

	getAnimationData = async () => {
		try {
			const value = await AsyncStorage.getItem('animationData');
			let parsed = JSON.parse(value);
			if (value !== null) {
				// value previously stored

				this.setState({
					animationId: parsed.id,
					animation1: parsed.animation1,
					animation2: parsed.animation2,
					animation3: parsed.animation3,
					animation4: parsed.animation4,
					animation5: parsed.animation5,
					activateAnimation1: parsed.activateAnimation1,
					activateAnimation2: parsed.activateAnimation2,
				});
				console.log(parsed);
			}
		} catch (e) {
			// error reading value
		}
	};

	playSong() {
		const { navigation } = this.props;
		let song = navigation.getParam('soundRaw');
		try {
			SoundPlayer.loadUrl(`${global.rawSource}/raw/${song}.mp3`);
			SoundPlayer.play();
		} catch (e) {
			Alert.alert('Esse som não pode ser reproduzido');
			console.log('cannot play the song file', e);
		}
		//this.getData();
		//console.log('puxei data');
		// MyNativeModule.userInfo(this.state.userId, this.state.soundRaw);
	}

	//Common
	// _handleAppStateChange = nextAppState => {
	// 	if (
	// 		this.state.appState.match(/inactive|background/) &&
	// 		nextAppState === 'active'
	// 	) {
	// 		console.log('App has come to the foreground!');
	// 	}
	// 	this.setState({ appState: nextAppState });
	// };

	// IOS
	setupNative = async () => {
		// MyNativeModule.setBeacon(
		// 	this.state.UUID,
		// 	this.state.identifier,
		// 	this.state.major,
		// 	this.state.minor,
		// 	this.state.beaconRange
		// );

		console.log(
			'Beacon set ',
			this.state.UUID +
				' ' +
				this.state.identifier +
				' ' +
				this.state.major +
				' ' +
				this.state.minor +
				' ' +
				this.state.beaconRange
		);
		this.setState({ isLoading: false });
		// MyNativeModule.soundServer(this.state.serverIp, this.state.serverPort);
		// console.log(
		// 	'Sound Server set ',
		// 	this.state.serverIp + ' ' + this.state.serverPort
		// );
	};

	//Common
	// screenActivity() {
	// 	if (this.state.appState === 'inactive') {
	// 		MyNativeModule.screenStatus('inactive');
	// 	} else if (this.state.appState === 'background') {
	// 		MyNativeModule.screenStatus('background');
	// 	} else if (this.state.appState === 'active') {
	// 		MyNativeModule.screenStatus('active');
	// 	}
	// }

	screenColor() {
		var ColorCode =
			'rgb(' +
			Math.floor(Math.random() * 256) +
			',' +
			Math.floor(Math.random() * 256) +
			',' +
			Math.floor(Math.random() * 256) +
			')';

		if (this.state.lifeStatus === 'alive') {
			this.setState({ locationStatus: 'immediate' });
		} else if (
			this.state.lifeStatus === 'dead' &&
			this.state.proximity === 'near'
		) {
			this.setState({ locationStatus: 'near' });
		}

		if (this.state.proximity === 'far' && this.state.lifeStatus === 'dead') {
			this.setState({ locationStatus: 'far' });
		} else if (this.state.proximity === 'unknown') {
			this.setState({ locationStatus: 'unknown' });
		}

		if (this.state.locationStatus === 'immediate') {
			this.setState({
				screenColor: 'aliceblue',
				colorHolder: ColorCode,
			});
		} else if (this.state.locationStatus === 'near') {
			this.setState({
				screenColor: '#ddd',
				statusMesage: 'Você Saiu do Alcance!',
				statusRodape: 'Aproxime-se Mais!',
			});
		} else if (this.state.locationStatus === 'far') {
			if (this.state.animation4 === 'pinLocation') {
				this.setState({
					screenColor: 'white',
					statusMesage: 'Localização Desconhecida!',
					statusRodape: 'Você está muito longe!',
				});
			} else if (this.state.animation4 === 'farAway') {
				this.setState({
					screenColor: '#72717e',
					statusMesage: 'Pra onde você vai?!',
					statusRodape: 'Até entrou em órbita!',
				});
			}
		} else if (this.state.locationStatus === 'unknown') {
			this.setState({
				screenColor: 'white',
				statusMesage: 'Instalação do Compomus \n não Detectada!',
				statusRodape:
					'Para Interagir Você Precisa estar em uma Instalação do Compomus',
			});
		}
	}

	displayAnimation1() {
		if (this.state.locationStatus === 'immediate') {
			if (this.state.animation1 === 'macaco') {
				return (
					<LottieView
						source={require('../assets/macaco.json')}
						autoPlay
						loop
						resizeMode='contain'
					/>
				);
			} else if (this.state.animation1 === 'false') {
			}
		}
	}

	displayAnimation2() {
		if (this.state.locationStatus === 'immediate') {
			if (this.state.animation2 === 'speakers') {
				return (
					<LottieView
						source={require('../assets/speakers.json')}
						autoPlay
						loop
						resizeMode='contain'
					/>
				);
			} else if (this.state.animation2 === 'playing2') {
				return (
					<LottieView
						source={require('../assets/playing2.json')}
						autoPlay
						loop
						resizeMode='contain'
					/>
				);
			}

			//return <Lottie source={speakers} autoPlay loop resizeMode='contain' />;
		} else if (this.state.locationStatus === 'near') {
			return (
				<LottieView
					source={require('../assets/alert.json')}
					autoPlay
					loop
					resizeMode='contain'
				/>
			);
			//return <Lottie source={alert} autoPlay loop resizeMode='contain' />;
		} else if (this.state.locationStatus === 'far') {
			if (this.state.animation4 === 'pinLocation') {
				return (
					<LottieView
						source={require('../assets/pinLocation.json')}
						autoPlay
						loop
						resizeMode='contain'
					/>
				);
			} else if (this.state.animation4 === 'farAway') {
				return (
					<LottieView
						source={require('../assets/farAway.json')}
						autoPlay
						loop
						resizeMode='contain'
					/>
				);
			}

			//return <Lottie source={pinLocation} autoPlay loop resizeMode='contain' />;
		} else if (this.state.locationStatus === 'unknown') {
			return (
				<LottieView
					source={require('../assets/unknownLocation2.json')}
					autoPlay
					loop
					resizeMode='contain'
				/>
			);
			// return (
			// 	<Lottie source={unknownLocation2} autoPlay loop resizeMode='contain' />
			// );
		}
	}

	// ChangeColorFunction = () => {
	// 	this.setState({
	// 		colorHolder: ColorCode,
	// 	});
	// };

	render() {
		console.log(
			'onChange event',
			this.state.distance +
				' ' +
				this.state.proximity +
				' ' +
				this.state.degrees +
				' ' +
				this.state.lifeStatus +
				' ' +
				this.state.locationStatus +
				' ' +
				this.state.userId +
				' ' +
				this.state.soundName +
				' ' +
				this.state.soundRaw
		);

		// const { navigation } = this.props;
		// const color = this.state.screenColor;

		return (
			<>
				<StatusBar barStyle='light-content' />
				<Animated.View
					style={[
						styles.container,
						{ backgroundColor: this.state.screenColor },
					]}>
					{this.state.isLoading ? (
						<View style={styles.loadingAnimation}>
							<LottieView
								source={require('../assets/loading.json')}
								autoPlay
								loop
								resizeMode='contain'
							/>
						</View>
					) : (
						<View>
							<View style={styles.textContainer}>
								{this.state.locationStatus === 'immediate' ? (
									<Animated.View>
										<Animated.Text
											style={[
												styles.songName2,
												{ color: this.state.colorHolder },
											]}>
											{'Reproduzindo...'}
										</Animated.Text>
										<Text style={styles.songName}>{this.state.soundName}</Text>
									</Animated.View>
								) : null}
								{this.state.locationStatus === 'near' ? (
									<Text style={styles.statusMesage}>
										{this.state.statusMesage}
									</Text>
								) : null}
								{this.state.locationStatus === 'far' ? (
									<Text style={styles.statusMesageFar}>
										{this.state.statusMesage}
									</Text>
								) : null}
								{this.state.locationStatus === 'unknown' ? (
									<Text style={styles.statusMesageUnknown}>
										{this.state.statusMesage}
									</Text>
								) : null}
							</View>
							<View style={styles.animationContainer}>
								<View style={styles.animation2}>
									{this.displayAnimation2()}
								</View>
								<View style={styles.animation1}>
									{this.displayAnimation1()}
								</View>
							</View>
							<View style={styles.trocarSomContainer}>
								{this.state.locationStatus === 'immediate' ? (
									<TouchableOpacity
										onPress={() => {
											this.props.navigation.navigate('ChoiceStack');
										}}
										style={styles.button}>
										<Text style={styles.buttonText}>Trocar Som</Text>
									</TouchableOpacity>
								) : null}
								{this.state.locationStatus === 'near' ? (
									<Text style={styles.statusMesage}>
										{this.state.statusRodape}
									</Text>
								) : null}
								{this.state.locationStatus === 'far' ? (
									<Text style={styles.statusMesageFar}>
										{this.state.statusRodape}
									</Text>
								) : null}
								{this.state.locationStatus === 'unknown' ? (
									<Text style={styles.statusMesageUnknown}>
										{this.state.statusRodape}
									</Text>
								) : null}
							</View>
						</View>
					)}
				</Animated.View>
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f1f1f1',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContainer: {
		flex: 1,
		alignSelf: 'center',
		justifyContent: 'flex-start',
		marginTop: '8%',
	},
	animationContainer: {
		flex: 1,
		alignSelf: 'center',
		justifyContent: 'center',
	},
	trocarSomContainer: {
		flex: 1,
		marginBottom: '8%',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	songName: {
		justifyContent: 'center',
		alignItems: 'center',
		color: '#00A4DC',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 25,
	},
	songName2: {
		justifyContent: 'center',
		alignItems: 'center',
		// color: '#00A4DC',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 25,
	},
	statusMesage: {
		justifyContent: 'center',
		alignItems: 'center',
		color: 'red',
		fontWeight: 'bold',
		fontSize: 25,
	},
	statusMesageFar: {
		justifyContent: 'center',
		alignItems: 'center',
		color: '#4DAE4C',
		fontWeight: 'bold',
		fontSize: 25,
	},
	statusMesageUnknown: {
		justifyContent: 'center',
		alignItems: 'center',
		color: '#4DAE4C',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 20,
	},

	animation1: {
		//flex: 2,
		//position: 'absolute',
		//justifyContent: 'flex-start',
		//alignItems: 'flex-end',
		marginTop: '-35%',
		width: 320,
		height: 220,
	},
	animation2: {
		//flex: 2,
		//justifyContent: 'flex-start',

		//alignItems: 'center',
		//marginTop: '20%',
		width: 320,
		height: 320,
	},
	loadingAnimation: {
		//flex: 2,
		//justifyContent: 'flex-start',

		//alignItems: 'center',
		//marginTop: '20%',
		width: 220,
		height: 220,
	},
	button: {
		width: 300,
		height: 45,
		//marginTop: 40,
		borderRadius: 14,
		backgroundColor: '#4DAE4C',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
