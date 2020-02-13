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
} from 'react-native';
import Lottie from 'lottie-react-native';
import alert from '../assets/alert.json';
import macaco from '../assets/macaco.json';
import playing from '../assets/playing.json';
import playing2 from '../assets/playing2.json';
import farAway from '../assets/farAway.json';
import goExplore from '../assets/goExplore.json';
import unknownLocation from '../assets/unknownLocation.json';
import unknownLocation2 from '../assets/unknownLocation2.json';
import speakers from '../assets/speakers.json';
import loading from '../assets/loading.json';
import pinLocation from '../assets/pinLocation.json';
import AsyncStorage from '@react-native-community/async-storage';

const { MyNativeModule } = NativeModules;
const CounterEvents = new NativeEventEmitter(NativeModules.MyNativeModule);

export default class Compose extends Component {
	// static navigationOptions = ({ navigation }) => ({
	//   title: navigation.getParam("nameFileReal"),
	//  // header: null,

	//   headerTitleStyle: { textAlign: "center", alignSelf: "center" }
	// });
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
		iden: '',
		UUID: '',
		serverIp: '',
		serverPort: 0,
		locationStatus: '',
	};

	componentDidMount() {
		this.setupNative();
		AppState.addEventListener('change', this._handleAppStateChange);
		CounterEvents.addListener('onChange', this._eventSubscription);
		this.playSong();
	}

	componentWillUnmount() {
		SoundPlayer.stop();
		AppState.removeEventListener('change', this._handleAppStateChange);
		CounterEvents.removeAllListeners(
			'onChange',
			this._eventSubscription,
			MyNativeModule.screenStatus('inactive')
		);
	}

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
	//Common
	_handleAppStateChange = nextAppState => {
		if (
			this.state.appState.match(/inactive|background/) &&
			nextAppState === 'active'
		) {
			console.log('App has come to the foreground!');
		}
		this.setState({ appState: nextAppState });
	};

	// IOS
	setupNative() {
		let formData = new FormData();

		formData.append('beaconOrder', '1');

		fetch(`${global.rawSource}/index.php/getThisBeacon`, {
			method: 'POST',
			body: formData,
		})
			.then(response => response.json())
			.then(responseJson2 => {
				const { uuid } = responseJson2;
				const { identifier } = responseJson2;
				const { major } = responseJson2;
				const { minor } = responseJson2;
				const { beaconRange } = responseJson2;
				const { data } = responseJson2;
				this.setState({
					UUID: uuid,
					iden: identifier,
					major: parseInt(major),
					minor: parseInt(minor),
					beaconRange: parseFloat(beaconRange),
				});
				if (responseJson2 !== false) {
					MyNativeModule.setBeacon(
						this.state.UUID,
						this.state.iden,
						this.state.major,
						this.state.minor,
						this.state.beaconRange
					);

					console.log(
						'Beacon set ',
						this.state.UUID +
							' ' +
							this.state.iden +
							' ' +
							this.state.major +
							' ' +
							this.state.minor +
							' ' +
							this.state.beaconRange
					);

					// Alert.alert('Compomus', 'Usuario achado com sucesso!');
				}
			})
			.catch(error => {
				console.error(error);
			});

		//Configurando ip e porta do servidor
		fetch(`${global.rawSource}/index.php/soundServer`)
			.then(response => response.json())
			.then(responseJson => {
				// console.log('Success', formData);
				const { ip } = responseJson;
				const { port } = responseJson;
				console.log(responseJson);
				this.setState({
					serverIp: ip,
					serverPort: parseInt(port),
				});
				if (responseJson !== false) {
					MyNativeModule.soundServer(
						this.state.serverIp,
						this.state.serverPort
					);
					console.log(
						'Sound Server set ',
						this.state.serverIp + ' ' + this.state.serverPort
					);
				}
				// console.log(data);
			})
			.catch(error => {
				console.error(error);
			});
	}

	//Common
	screenActivity() {
		if (this.state.appState === 'inactive') {
			MyNativeModule.screenStatus('inactive');
		} else if (this.state.appState === 'background') {
			MyNativeModule.screenStatus('background');
		} else if (this.state.appState === 'active') {
			MyNativeModule.screenStatus('active');
		}
	}
	// getData = async () => {
	// 	try {
	// 		const value = await AsyncStorage.getItem('userInfo');
	// 		let parsed = JSON.parse(value);
	// 		if (value !== null) {
	// 			// value previously stored
	// 			this.setState({
	// 				userId: parseInt(parsed.userId),
	// 				userName: parsed.userName,
	// 				userEmail: parsed.userEmail,
	// 				userPass: parsed.userPass,
	// 				soundName: parsed.soundName,
	// 				soundRaw: parsed.soundRaw,
	// 			});
	// 			//this.getUser();
	// 		}
	// 	} catch (e) {
	// 		// error reading value
	// 	}
	// };
	//Common
	// getUser() {
	// 	const { navigation } = this.props;
	// 	const userId = navigation.getParam('userId');

	// 	let formData = new FormData();

	// 	formData.append('id', userId);

	// 	fetch(`${global.rawSource}/index.php/getThisUser`, {
	// 		method: 'POST',
	// 		body: formData,
	// 	})
	// 		.then(response => response.json())
	// 		.then(responseJson => {
	// 			//console.log('Success', formData);
	// 			const { id } = responseJson;
	// 			const { name } = responseJson;
	// 			const { email } = responseJson;
	// 			const { pass } = responseJson;
	// 			const { soundRaw } = responseJson;
	// 			const { soundName } = responseJson;
	// 			//console.log(responseJson);
	// 			this.setState({
	// 				userId: parseInt(id),
	// 				userName: name,
	// 				userEmail: email,
	// 				userPass: pass,
	// 				soundName: soundRaw,
	// 				soundRaw: soundName,
	// 			});
	// 			if (responseJson !== false) {
	// 				this.updateSound();

	// 				console.log(
	// 					'Status user ',
	// 					this.state.userId + ' User Sound ' + this.state.choosenSound
	// 				);

	// 				// Alert.alert('Compomus', 'Usuario achado com sucesso!');
	// 			}
	// 		})
	// 		.catch(error => {
	// 			console.error(error);
	// 		});
	// }
	// updateData = async () => {
	// 	let userInfo = {
	// 		userId: this.state.userId,
	// 		userName: this.state.userName,
	// 		userEmail: this.state.email,
	// 		userPass: this.state.pass,
	// 		soundName: this.state.soundName,
	// 		soundRaw: this.state.soundRaw,
	// 	};
	// 	try {
	// 		await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

	// 		this.props.navigation.navigate('Compose', {});
	// 		this.props.navigation.navigate('Compose', {});
	// 		this.props.navigation.navigate('Compose', {});

	// 		console.log('update data');
	// 	} catch (e) {
	// 		// saving error
	// 	}
	// };
	screenColor() {
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
			this.setState({ screenColor: 'aliceblue' });
		} else if (this.state.locationStatus === 'near') {
			this.setState({ screenColor: 'white' });
		} else if (this.state.locationStatus === 'far') {
			this.setState({ screenColor: 'white' });
		} else if (this.state.locationStatus === 'unknown') {
			this.setState({ screenColor: 'white' });
		}
	}

	displayAnimation1() {
		if (this.state.locationStatus === 'immediate') {
			return <Lottie source={macaco} autoPlay loop resizeMode='contain' />;
		} else if (this.state.locationStatus === 'near') {
			return <Lottie source={alert} autoPlay loop resizeMode='contain' />;
		} else if (this.state.locationStatus === 'far') {
			return <Lottie source={pinLocation} autoPlay loop resizeMode='contain' />;
		} else if (this.state.locationStatus === 'unknown') {
			return (
				<Lottie source={unknownLocation2} autoPlay loop resizeMode='contain' />
			);
		}
	}

	displayAnimation2() {
		if (this.state.locationStatus === 'immediate') {
			return <Lottie source={speakers} autoPlay loop resizeMode='contain' />;
		}
	}

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

		const { navigation } = this.props;
		const color = this.state.screenColor;

		return (
			<>
				<StatusBar barStyle='light-content' />
				<View style={[styles.container, { backgroundColor: color }]}>
					<View style={styles.textContainer}>
						<Text style={styles.songName}>{this.state.soundName}</Text>
					</View>
					<View style={styles.speakers}>
						{this.displayAnimation2()}
						<View style={styles.animation1}>{this.displayAnimation1()}</View>
					</View>
					<View style={styles.trocarSomContainer}>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('ChoiceStack');
							}}
							style={styles.button}>
							<Text style={styles.buttonText}>Escolher Som</Text>
						</TouchableOpacity>
					</View>

					{/* <Text>Som Tocando: {navigation.getParam("nameFileReal")}</Text>
            <Text>userId: {navigation.getParam("userId")}</Text> */}
				</View>
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ddd',
		alignItems: 'center',
		// justifyContent: "center"
	},
	textContainer: {
		flex: 1,
		alignSelf: 'center',
		justifyContent: 'center',
	},
	songName: {
		justifyContent: 'center',
		alignItems: 'center',
		color: '#4DAE4C',
		fontSize: 30,
	},
	animation1: {
		flex: 2,
		//position: "absolute",
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 80,
		width: 320,
		height: 220,
	},
	speakers: {
		flex: 2,
		justifyContent: 'flex-start',
		alignItems: 'center',
		//marginTop: 100,
		width: 220,
		height: 220,
	},
	button: {
		width: 300,
		height: 45,
		//marginTop: 40,
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
	trocarSomContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
