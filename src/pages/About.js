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
		alignSelf: 'stretch',
		// backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',

		// marginTop: '-40%',
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

	imgFuntech: {
		// backgroundColor: 'red',
		resizeMode: 'contain',
		// marginTop: '10%',
		// marginBottom: '5%',
		width: '80%',
		height: '30%',
	},

	logoContent: {
		flex: 1,
		// justifyContent: 'flex-start',
		// alignSelf: 'stretch',
		marginLeft: '5%',
		marginRight: '5%',
		// alignItems: 'center',
		// marginTop: '5%',
		// width: '100%',
	},

	text1: {
		textAlign: 'center',
		marginTop: '5%',
		color: '#4DAE4C',
		fontSize: 25,
		fontWeight: 'bold',
	},
	text2: {
		textAlign: 'justify',
		marginTop: '10%',
		marginBottom: '10%',
		color: '#565656',
		fontSize: 18,
		fontWeight: 'bold',
	},
	text3: {
		// marginLeft: '8%',
		marginTop: '4%',
		// padding: '2%',
		color: '#565656',
		fontSize: 14,
		fontWeight: 'bold',
	},
	text4: {
		// marginLeft: '8%',
		marginTop: '4%',
		// padding: '2%',
		color: '#565656',
		fontSize: 14,
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
});
