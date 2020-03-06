import React, { Component } from 'react';

import SoundPlayer from 'react-native-sound-player';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
// import TrackPlayer from 'react-native-track-player';
// import songList from '../data/songList';
import {
	View,
	Text,
	Alert,
	FlatList,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
	NativeModules,
	ActivityIndicator,
} from 'react-native';

class MyListItem extends Component {
	_onFinishedPlayingSubscription = null;
	state = {
		selected: true,
		userId: 0,
		userName: '',
		userEmail: '',
		userPass: '',
		soundRaw: '',
		soundName: '',
		isLoading: false,
		isPlaying: 'Play',
	};

	componentDidMount() {
		this._onFinishedPlayingSubscription = SoundPlayer.addEventListener(
			'FinishedPlaying',
			({ success }) => {
				// console.log('finished playing', success);
				this.setState({ isPlaying: 'Play' });
			}
		);
	}

	componentWillUnmount() {
		SoundPlayer.stop();
		this._onFinishedPlayingSubscription.remove();

		//this._onFinishedLoadingFileSubscription.remove();
	}

	_onPress = () => {
		this.playSong(this.props.nameFile, this.props.name);
	};

	playSong(song, nameSong) {
		try {
			// SoundPlayer.play();
			if (this.state.isPlaying === 'Play') {
				SoundPlayer.playUrl(`${global.rawSource}/raw/${song}.mp3`);

				this.setState({ isPlaying: 'Stop' });
				// SoundPlayer.play();
			} else {
				SoundPlayer.stop();
				this.setState({ isPlaying: 'Play' });
			}

			console.log('Esse é o som reproduzido: ', nameSong);
		} catch (e) {
			Alert.alert('Esse som não pode ser reproduzido');
			console.log('Esse som não pode ser reproduzido: ', nameSong);
		}
	}

	render() {
		const text = this.state.isPlaying;
		return (
			<View style={styles.buttonContent}>
				<TouchableOpacity style={styles.playButton} onPress={this._onPress}>
					{/* // onPress={text => this.playSong(item.nameFile, item.name)}> */}
					<Text style={styles.soundButtonText}>{text}</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default class SoundChooser extends Component {
	// _onFinishedPlayingSubscription = null;

	state = {
		data: [],
		userId: 0,
		userName: '',
		userEmail: '',
		userPass: '',
		soundRaw: '',
		soundName: '',
		isLoading: false,
	};

	componentDidMount() {
		this.makeRemoteRequest();

		// this._onFinishedPlayingSubscription = SoundPlayer.addEventListener(
		// 	'FinishedPlaying',
		// 	({ success }) => {
		// 		console.log('Reprodução terminada: ', success);
		// 	}
		// );
	}

	makeRemoteRequest = async () => {
		this.setState({ isLoading: true });
		//global.rawSource = global.localhost; // remover essa linha!!!
		try {
			const response = await fetch(`${global.rawSource}/index.php/sound`);
			if (response.status === 200) {
				this.setState({ isLoading: false });

				const responseJson = await response.json();
				const data = responseJson;
				this.setState({ data });
			} else {
				Alert.alert(
					'Compomus',
					'Houve um erro na solicitação\n Por favor tente novamente!'
				);
			}
		} catch (error) {
			Alert.alert('Compomus', 'Erro de comunicação com o servidor');
		}
	};

	updateData = async (soundName, soundRaw) => {
		const { navigation } = this.props;
		// this.updateSound(soundName, soundRaw);
		try {
			const value = await AsyncStorage.getItem('userInfo');
			let parsed = JSON.parse(value);
			if (value !== null) {
				// value previously stored

				this.setState({
					userId: parseInt(parsed.userId),
					userName: parsed.userName,
					userEmail: parsed.userEmail,
					userPass: parsed.userPass,
					soundName: parsed.soundName,
					soundRaw: parsed.soundRaw,
				});

				console.log(value);
				let userInfo = {
					userId: parsed.userId,
					userName: parsed.userName,
					userEmail: parsed.userEmail,
					userPass: parsed.userPass,
					soundName: soundName,
					soundRaw: soundRaw,
				};
				try {
					await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

					this.props.navigation.navigate('Compose', {
						soundRaw: soundRaw,
					});

					console.log('Data up to date', userInfo);
				} catch (e) {
					// saving error
				}

				//console.log(value);
			}
		} catch (e) {
			// error reading value
		}
	};

	renderItem = ({ item, index }) => (
		<View style={styles.soundContainer}>
			<Text style={styles.soundName}>{item.name}</Text>
			<Text style={styles.soundDescription}>{item.description}</Text>

			<View style={styles.buttonContent}>
				<MyListItem
					id={item}
					name={item.name}
					description={item.description}
					nameFile={item.nameFile}
				/>
				<TouchableOpacity
					style={styles.chooseButton}
					onPress={() => {
						this.updateData(item.name, item.nameFile);

						//this.playSong(item.nameFile, item.name);
					}}>
					<Text style={styles.soundButtonText}>Escolher</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
	_keyExtractor = (item, index) => item.id;

	_renderItem = ({ item, index }) => (
		<MyListItem
			id={item}
			name={item.name}
			description={item.description}
			nameFile={item.nameFile}
		/>
	);

	render() {
		return (
			<>
				<StatusBar barStyle='light-content' />

				<View style={styles.container}>
					{this.state.isLoading ? (
						<View style={styles.loadingAnimationContainer}>
							<LottieView
								style={styles.loadingAnimation}
								source={require('../assets/loading.json')}
								autoPlay
								loop
								resizeMode='contain'
							/>
						</View>
					) : (
						// <ActivityIndicator size='large' color='#4DAE4C' />

						<FlatList
							contentContainerStyle={styles.list}
							data={this.state.data}
							keyExtractor={this._keyExtractor}
							// keyExtractor={item => item.id}
							// renderItem={this._renderItem}
							renderItem={({ index, item }) => {
								return <this.renderItem item={item} index={index} />;
							}}
						/>
					)}
				</View>
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		backgroundColor: '#e7e7e7',
	},
	list: {
		padding: 0,
	},
	loadingAnimationContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingAnimation: {
		justifyContent: 'center',
		alignItems: 'center',
		// marginLeft: '10%',
		width: 220,
		height: 220,
	},
	soundContainer: {
		flex: 1,
		// width: '95%',
		alignItems: 'stretch',
		padding: '3%',
		backgroundColor: '#fff',
		marginTop: '2%',
		marginLeft: '2%',
		marginRight: '2%',
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#ddd',
	},
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	soundName: {
		color: '#333',
		fontSize: 18,
		fontWeight: 'bold',
	},
	buttonContent: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	playButton: {
		width: 130,
		height: 45,
		marginTop: 20,
		borderRadius: 14,
		backgroundColor: '#00A4DC',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		// shadowRadius: 1,
		elevation: 0,
	},
	chooseButton: {
		width: 130,
		height: 45,
		marginTop: 20,
		borderRadius: 14,
		backgroundColor: '#4DAE4C',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		// shadowRadius: 1,
		elevation: 0,
	},
	soundButtonText: {
		fontSize: 16,
		color: '#fff',
		fontWeight: 'bold',
	},
	soundDescription: {
		color: '#999',
		marginTop: 10,
		fontSize: 16,
		fontWeight: 'bold',
	},
});
