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
	componentDidMount() {}
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
						<Text style={styles.baseText}>
							<Text style={styles.titleText}>
								{'\n' + this.state.titleText + '\n\n'}
							</Text>
							<Text numberOfLines={15}>{this.state.bodyText}</Text>
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
				{/* <View style={[styles.container]}>
					<View>
						<Text></Text>
					</View>
					<View style={styles.trocarSomContainer}>
						<TouchableOpacity
							onPress={() => {
								this.getData();
							}}
							style={styles.button}>
							<Text style={styles.buttonText}>Compose</Text>
						</TouchableOpacity>
					</View>
				</View> */}
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f1f1f1',
	},

	imageContainer: {
		marginTop: '2%',
		flex: 2,

		alignContent: 'stretch',
		// padding: 100,
		// width: '95%',
		// height: '100%',
		backgroundColor: '#0000',
		//marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		shadowColor: '#000',
		shadowOpacity: 0.1,
	},
	image: {
		justifyContent: 'center',
		//marginTop: '5%',
		width: '100%',
		height: '102%',
		borderRadius: 5,
	},
	banner: {
		//flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		//marginTop: '5%',
		//resizeMode: 'contain',
		width: '100%',
		height: '60%',
		borderRadius: 5,
	},
	bannerLogo: {
		//flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		//marginTop: '5%',
		position: 'absolute',
		resizeMode: 'contain',
		width: '100%',
		height: '25%',
	},
	bannerContainer: {
		marginTop: -5,
		flex: 1,

		//alignContent: 'stretch',
		// padding: 100,
		borderRadius: 5,
		//backgroundColor: '#000',
		marginBottom: 20,
		marginLeft: 10,
		marginRight: 10,
		// shadowColor: '#000',
		// shadowOffset: { width: 0, height: 0 },
		// shadowOpacity: 0.1,
		// // shadowRadius: 1,
		// elevation: 0,
	},
	baseText: {
		fontFamily: 'arial',
		textAlign: 'justify',
		fontSize: 15,
		color: '#4a4a4a',
		paddingRight: 20,
		paddingLeft: 20,
	},
	titleText: {
		//marginTop: 20,
		fontSize: 20,
		fontFamily: 'arial',
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#00A4DC',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		// shadowRadius: 1,
		elevation: 0,
	},
	textContainer: {
		marginTop: '2%',
		flex: 2,
		// padding: 100,
		backgroundColor: '#fff',
		borderRadius: 5,
		//marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		// shadowRadius: 1,
		elevation: 0,
	},
	button: {
		width: 300,
		height: 45,
		//marginTop: 40,
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
