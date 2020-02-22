import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Alert,
	StatusBar,
	Image,
	NativeModules,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
const { MyNativeModule } = NativeModules;
export default class HomeScreen extends Component {
	state = {
		userId: 0,
		soundName: '',
		userName: '',
		soundRaw: '',
		bodyText: '',
		titleText: '',
		imageURL: '',
	};
	componentDidMount() {
		this.getAppData();
	}
	componentWillUnmount() {}
	getAppData = async () => {
		try {
			const value = await AsyncStorage.getItem('appData');
			let parsed = JSON.parse(value);
			if (value !== null) {
				// value previously stored

				this.setState({
					titleText: parsed.titleText,
					bodyText: parsed.bodyText,
					imageURL: parsed.imageURL,
				});
				console.log(value);
			}
		} catch (e) {
			// error reading value
		}
	};

	getData = async () => {
		try {
			const value = await AsyncStorage.getItem('userInfo');
			let parsed = JSON.parse(value);
			if (value !== null) {
				// value previously stored
				MyNativeModule.userInfo(
					parseInt(parsed.userId),
					parsed.soundName,
					parsed.soundRaw
				);
				if (parsed.soundName === '0' || parsed.soundRaw === '0') {
					Alert.alert('Escolha um Som Primeiro!');
					this.props.navigation.navigate('ChoiceStack');
				} else {
					this.props.navigation.navigate('Compose', {
						soundRaw: parsed.soundRaw,
					});
				}
			}
		} catch (e) {
			// error reading value
		}
	};

	render() {
		const image = this.state.imageURL;

		return (
			<>
				<StatusBar barStyle='light-content' />
				<View style={styles.container}>
					<NavigationEvents onDidFocus={() => this.getAppData()} />
					<View style={styles.imageContainer}>
						<Image
							style={styles.image}
							source={{
								uri: `${global.rawSource}/assets/images/${image}`,
							}}
						/>
						<Image
							style={styles.bannerLogo}
							source={require('../assets/logoFuntech.png')}
						/>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.titleText}>
							{'\n' + this.state.titleText + '\n'}
						</Text>
						<Text style={styles.baseText} numberOfLines={20}>
							{this.state.bodyText}
						</Text>
					</View>

					<View style={styles.trocarSomContainer}>
						<TouchableOpacity
							onPress={() => {
								this.getData();
							}}
							style={styles.button}>
							<Text style={styles.buttonText}>Experimente Agora</Text>
						</TouchableOpacity>
					</View>
				</View>
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f1f1f1',
		alignItems: 'stretch',
	},

	imageContainer: {
		marginTop: '2%',
		flex: 1,

		alignSelf: 'stretch',
		alignItems: 'center',
		// padding: 100,
		// width: '95%',
		//height: '30%',
		backgroundColor: '#0000',
		//marginBottom: 10,
		marginLeft: '2%',
		marginRight: '2%',
		// shadowColor: '#000',
		// shadowOpacity: 0.1,
	},
	textContainer: {
		marginTop: '2%',
		//flex: 1,
		alignSelf: 'flex-end',

		// width: '95%',
		// height: '60%',
		// padding: 100,
		backgroundColor: '#fff',
		borderRadius: 5,
		//marginBottom: 10,
		marginLeft: '2%',
		marginRight: '2%',
		shadowColor: 'rgba(0, 0, 0, 0.22)',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.5,
		// shadowRadius: 1,
		elevation: 0,
	},
	trocarSomContainer: {
		//flex: 1,
		marginTop: '8%',
		alignSelf: 'center',
		marginBottom: '8%',
	},

	image: {
		justifyContent: 'center',
		//marginTop: '5%',
		width: '100%',
		height: '100%',
		borderRadius: 5,
	},
	bannerLogo: {
		//flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		//marginTop: '5%',
		position: 'absolute',
		resizeMode: 'contain',
		width: '80%',
		height: '35%',
	},

	baseText: {
		fontFamily: 'arial',
		textAlign: 'justify',
		fontSize: 17,
		color: '#4a4a4a',
		paddingRight: '5%',
		paddingLeft: '5%',
		paddingBottom: '5%',
	},
	titleText: {
		//marginTop: 20,
		fontSize: 19,
		fontFamily: 'arial',
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#00A4DC',
		// shadowColor: '#000',
		// shadowOffset: { width: 0, height: 0 },
		// shadowOpacity: 0.1,
		// // shadowRadius: 1,
		// elevation: 0,
	},

	button: {
		width: 300,
		height: 45,
		//marginTop: 40,
		borderRadius: 14,
		backgroundColor: '#4DAE4C',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: 'rgba(0, 0, 0, 0.22)',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 1.0,
		// shadowRadius: 1,
		elevation: 0,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
