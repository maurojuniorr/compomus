import React, { Component } from 'react';

import SoundPlayer from 'react-native-sound-player';
import AsyncStorage from '@react-native-community/async-storage';
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
} from 'react-native';

const { MyNativeModule } = NativeModules;

export default class SoundChooser extends Component {
	_onFinishedLoadingFileSubscription = null;

	state = {
		data: [],
		userId: 0,
		userName: '',
		userEmail: '',
		userPass: '',
		soundRaw: '',
		soundName: '',
	};

	componentDidMount() {
		this.makeRemoteRequest();

		this._onFinishedPlayingSubscription = SoundPlayer.addEventListener(
			'FinishedPlaying',
			({ success }) => {
				console.log('Reprodução terminada: ', success);
			}
		);
	}

	componentWillUnmount() {
		SoundPlayer.stop();
		this._onFinishedPlayingSubscription.remove();
		//this._onFinishedLoadingFileSubscription.remove();
	}

	playSong(song, nameSong) {
		try {
			SoundPlayer.playUrl(`${global.rawSource}/raw/${song}.mp3`);
			console.log('Esse é o som reproduzido: ', nameSong);
		} catch (e) {
			Alert.alert('Esse som não pode ser reproduzido');
			console.log('Esse som não pode ser reproduzido: ', nameSong);
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
		//this.getMyValue();
	}

	updateData = async (soundName, soundRaw) => {
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
				this.updateSound(soundName, soundRaw);
				console.log(value);
				MyNativeModule.userInfo(parseInt(parsed.userId), soundName, soundRaw);
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

					console.log('Data up to date');
				} catch (e) {
					// saving error
				}

				//console.log(value);
			}
		} catch (e) {
			// error reading value
		}
	};

	updateSound(soundName, soundRaw) {
		let formData = new FormData();

		formData.append('id', this.state.userId);
		formData.append('name', this.state.userName);
		formData.append('email', this.state.userEmail);
		formData.append('pass', this.state.userPass);
		formData.append('soundRaw', soundRaw);
		formData.append('soundName', soundName);

		fetch(`${global.rawSource}/index.php/updateUser`, {
			method: 'POST',
			body: formData,
		})
			.then(responseJson => {
				if (responseJson !== false) {
					console.log('Mudança gravada no banco com sucesso!');
					// Alert.alert('Compomus', 'Som escolhido com sucesso!');
				}
			})
			.catch(error => {
				console.error(error);
			});
		//console.log(formData);
	}

	renderItem = ({ item, index }) => (
		<View style={styles.soundContainer}>
			<Text style={styles.soundName}>{item.name}</Text>
			<Text style={styles.soundDescription}>{item.description}</Text>

			<View style={styles.buttonContent}>
				<TouchableOpacity
					style={styles.playButton}
					onPress={text => this.playSong(item.nameFile, item.name)}>
					<Text style={styles.soundButtonText}>Tocar</Text>
				</TouchableOpacity>
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

	render() {
		return (
			<>
				<StatusBar barStyle='light-content' />
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
		backgroundColor: '#f1f1f1',
	},
	list: {
		padding: 20,
	},
	soundContainer: {
		padding: 20,
		backgroundColor: '#fff',
		marginBottom: 20,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#ddd',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		// shadowRadius: 1,
		elevation: 0,
	},
	soundName: {
		color: '#333',
		fontSize: 16,
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
		fontSize: 14,
		fontWeight: 'bold',
	},
});
