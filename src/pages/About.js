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
import { Icon } from 'native-base';
export default class About extends Component {
	state = {
		userId: 0,
		soundName: '',
		userName: '',
		soundRaw: '',
		bodyText: '',
		titleText: '',
		imageURL: '',
	};
	// static propTypes = { url: React.PropTypes.string };
	handleClick = () => {
		Linking.canOpenURL(this.props.url).then(supported => {
			if (supported) {
				Linking.openURL(this.props.url);
			} else {
				console.log("Don't know how to open URI: " + this.props.url);
			}
		});
	};

	render() {
		const image = this.state.imageURL;

		return (
			<>
				<StatusBar barStyle='light-content' />
				<SafeAreaView style={styles.container}>
					<View style={styles.logoContent}>
						<Text style={styles.text1}>Sobre a Ação Tecnológica</Text>
						<Text style={styles.text2}>
							O ambiente Compomus faz parte da pesquisa de doutorado do Aluno
							Mauro Amazonas integrante do grupo FunTech Show [IComp/UFAM] sob
							orientação dos professores Bruno Gadelha e Thais Castro. Este
							estudo teve origem à partir da parceria do grupo com a Falculdade
							de Artes [FAARTES/UFAM] por meio do professor João Gustavo Kienem.
						</Text>
					</View>

					<View style={styles.textContainer}>
						{/* <Text style={styles.text2}>FunTechShow [IComp/UFAM]</Text> */}
						<Image
							style={styles.imgFuntech}
							source={require('../assets/funtechGarantido.png')}
						/>
						<View style={styles.iconsRedesSociais}>
							<Icon
								name='logo-twitter'
								style={{ fontSize: 45, color: '#4DAE4C', marginRight: '10%' }}
								onPress={() => {}}
							/>
							<Icon
								name='logo-instagram'
								style={{ fontSize: 45, color: '#4DAE4C', marginRight: '10%' }}
								onPress={() => {}}
							/>
							<Icon
								name='logo-facebook'
								style={{ fontSize: 45, color: '#4DAE4C' }}
								onPress={this.handleClick}
							/>
						</View>
						<Text style={styles.text3}>@funtechshow</Text>
						<Text style={styles.text4}>contato@funtechshow.com</Text>
						<Text style={styles.text4}>www.compomus.funtechshow.com</Text>
					</View>
					<Text style={styles.text5}>Política de Privacidade</Text>
					{/* <View style={styles.imgParceirosContainer}>
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
					</View> */}
				</SafeAreaView>
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		// alignSelf: 'stretch',
		alignItems: 'center',
	},
	textContainer: {
		flex: 1,
		marginLeft: '5%',
		marginRight: '5%',
		// backgroundColor: '#fff',
		alignItems: 'center',
		// justifyContent: 'center',

		marginTop: '5%',
	},
	imgParceirosContainer: {
		flex: 1,
		// marginLeft: '5%',
		// marginRight: '5%',
		// backgroundColor: '#fff',
		// backgroundColor: 'red',
		// alignItems: 'center',
		// justifyContent: 'center',

		// marginBottom: '5%',
	},
	iconsRedesSociais: {
		// flex: 1,
		flexDirection: 'row',
		// justifyContent: 'center',
		// // alignSelf: 'stretch',
		// alignItems: 'center',
		// marginTop: '12%',

		// width: '100%',
	},
	imgParceirosContent2: {
		flex: 3,
		flexDirection: 'row',
		// justifyContent: 'center',
		// alignSelf: 'stretch',
		justifyContent: 'space-between',
		// alignSelf: 'stretch',
		alignItems: 'center',
		// alignItems: 'center',
		marginTop: '-4%',

		// width: '100%',
	},
	imgFuntech: {
		// backgroundColor: 'red',
		// resizeMode: 'contain',
		// marginTop: '10%',
		marginBottom: '5%',
		width: 300,
		height: 30,
	},
	imgFaartes: {
		// backgroundColor: 'red',
		resizeMode: 'contain',
		width: '30%',
		height: '30%',
	},
	imgIcomp: {
		// backgroundColor: 'red',
		resizeMode: 'contain',
		width: '50%',
		height: '70%',
	},
	imgUfam: {
		// backgroundColor: 'red',
		resizeMode: 'contain',
		width: '35%',
		height: '80%',
	},
	logoContent: {
		flex: 1,
		justifyContent: 'flex-start',
		// alignSelf: 'stretch',
		marginLeft: '5%',
		marginRight: '5%',
		alignItems: 'center',
		marginTop: '5%',
		// width: '100%',
	},

	text1: {
		textAlign: 'center',
		marginTop: '5%',
		color: '#4DAE4C',
		fontSize: 30,
		fontWeight: 'bold',
	},
	text2: {
		textAlign: 'justify',
		marginTop: '10%',
		marginBottom: '10%',
		color: '#565656',
		fontSize: 20,
		fontWeight: 'bold',
	},
	text3: {
		// marginLeft: '8%',
		marginTop: '4%',
		// padding: '2%',
		color: '#565656',
		fontSize: 16,
		fontWeight: 'bold',
	},
	text4: {
		// marginLeft: '8%',
		marginTop: '4%',
		// padding: '2%',
		color: '#565656',
		fontSize: 16,
		fontWeight: 'bold',
		textDecorationLine: 'underline',
	},

	text5: {
		// marginLeft: '8%',
		marginBottom: '5%',
		// padding: '2%',
		color: '#565656',
		fontSize: 16,
		fontWeight: 'bold',
		textDecorationLine: 'underline',
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
