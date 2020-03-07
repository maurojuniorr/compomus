import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Alert,
	StatusBar,
	Image,
	SafeAreaView,
	NativeModules,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import * as Animatable from 'react-native-animatable';

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
			const parsed = JSON.parse(value);
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
			const parsed = JSON.parse(value);
			if (value !== null) {
				// // value previously stored
				// MyNativeModule.userInfo(
				// 	parseInt(parsed.userId),
				// 	parsed.soundName,
				// 	parsed.soundRaw
				// );
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
				<SafeAreaView style={styles.container}>
					<View style={styles.logoContent}>
						<Image
							style={styles.logo}
							source={require('../assets/logoTransparent1.png')}
						/>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.text1}>COMPOMUS</Text>
						<Text style={styles.text2}>Aqui todos participam!</Text>
						<Text style={styles.text2}>
							Experimente uma nova abordagem de interação com sons em espaços
							artísticos usando seu celular!
						</Text>
					</View>

					<View style={styles.imgParceirosContainer}>
						<Text style={styles.text3}>PARCERIA:</Text>
						<View style={styles.imgParceirosContent}>
							<Image
								style={styles.imgFuntech}
								source={require('../assets/funtechGarantido.png')}
							/>
							<Image
								style={styles.imgFaartes}
								source={require('../assets/FAARTES.png')}
							/>
						</View>

						<View style={styles.imgParceirosContent2}>
							<Image
								style={styles.imgIcomp}
								source={require('../assets/icomp.png')}
							/>
							<Image
								style={styles.imgUfam}
								source={require('../assets/ufam.png')}
							/>
						</View>
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
				</SafeAreaView>
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f1f1f1',
		flex: 1,
		// alignSelf: 'stretch',
		alignItems: 'center',
	},
	imgParceirosContainer: {
		// flex: 1,
		// flexDirection: 'row',
		// justifyContent: 'space-between',
		// alignSelf: 'stretch',
		// alignItems: 'center',
		// marginTop: '12%',

		width: '70%',
		height: '27%',
		// marginLeft: '-12%',
		// marginRight: '-12%',
		// backgroundColor: '#fff',
		// backgroundColor: 'blue',
		// alignItems: 'center',
		// justifyContent: 'center',
		// marginBottom: '5%',
	},
	imgParceirosContent: {
		// flex: 3,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// alignSelf: 'stretch',
		alignItems: 'center',
		// marginTop: '12%',

		width: '100%',
		height: '30%',
	},
	imgParceirosContent2: {
		// wflex: 3,
		flexDirection: 'row',
		// justifyContent: 'center',
		// alignSelf: 'stretch',
		justifyContent: 'space-between',
		// alignSelf: 'stretch',
		alignItems: 'center',
		// alignItems: 'center',
		width: '100%',
		height: '30%',

		// width: '100%',
	},
	imgFuntech: {
		// backgroundColor: 'red',
		resizeMode: 'contain',
		width: '60%',
		height: '100%',
	},
	imgFaartes: {
		// backgroundColor: 'red',
		resizeMode: 'contain',
		width: '35%',
		height: '100%',
	},
	imgIcomp: {
		// backgroundColor: 'red',
		resizeMode: 'contain',
		width: '50%',
		height: '100%',
	},
	imgUfam: {
		// backgroundColor: 'red',
		resizeMode: 'contain',
		width: '35%',
		height: '100%',
	},
	logoContent: {
		flex: 1,
		justifyContent: 'flex-end',
		// alignSelf: 'stretch',
		// alignItems: 'center',
		// marginTop: '12%',
		// width: '100%',
		// backgroundColor: 'red',
	},
	logo: {
		// justifyContent: 'center',
		// marginBottom: '5%',
		// alignItems: 'center',
		resizeMode: 'contain',
		// width: '100%',
		height: '100%',
		// borderRadius: 50,
		// shadowColor: '#000',
		// shadowOffset: { width: 0, height: 0 },
		// shadowOpacity: 0.9,
		// shadowRadius: 1,
		elevation: 0.7,
	},
	textContainer: {
		flex: 1,
		marginLeft: '8%',
		marginRight: '8%',
		// backgroundColor: 'yellow',
		alignItems: 'center',
		justifyContent: 'center',

		// marginTop: '5%',
	},
	text1: {
		textAlign: 'center',
		marginBottom: '5%',
		color: '#4DAE4C',
		fontSize: 30,
		fontWeight: 'bold',
	},
	text2: {
		textAlign: 'justify',
		marginBottom: '5%',
		color: '#565656',
		fontSize: 18,
		fontWeight: 'bold',
	},
	text3: {
		marginLeft: '2%',
		// marginBottom: '-1%',
		// padding: '2%',
		color: '#565656',
		fontSize: 12,
		fontWeight: 'bold',
	},

	imageContainer: {
		marginTop: '2%',
		flex: 1,

		alignSelf: 'stretch',
		alignItems: 'center',
		// padding: 100,
		// width: '95%',
		// height: '30%',
		backgroundColor: '#0000',
		// marginBottom: 10,
		marginLeft: '2%',
		marginRight: '2%',
		// shadowColor: '#000',
		// shadowOpacity: 0.1,
	},

	trocarSomContainer: {
		// flex: 1,
		marginTop: '0%',
		alignSelf: 'center',
		marginBottom: '8%',
	},

	image: {
		justifyContent: 'center',
		// marginTop: '5%',
		width: '100%',
		height: '100%',
		borderRadius: 5,
	},
	bannerLogo: {
		// flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		// marginTop: '5%',
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
		// marginTop: 20,
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
		// marginTop: 40,
		borderRadius: 14,
		backgroundColor: '#4DAE4C',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: 'rgba(0, 0, 0, 0.22)',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 1.0,
		// shadowRadius: 1,
		elevation: 0.5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
