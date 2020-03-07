import React, { Component, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Alert,
	StatusBar,
	Image,
	Modal,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
// import { Icon } from 'native-base';
import { Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { TouchableHighlight } from 'react-native-gesture-handler';
export default function About({ props }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [url, setUrl] = useState('');
	const [socialName, setSocialName] = useState('');

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle='light-content' />
			<Modal animationType='slide' transparent={true} visible={modalOpen}>
				<View style={styles.modalContainer}>
					<View style={styles.header}>
						<View style={styles.headerIcon}>
							<Icon
								name='ios-close'
								type='ionicon'
								color='#4DAE4C'
								size={40}
								underlayColor={'#0000'}
								onPress={() => {
									setModalOpen(false);
								}}
							/>
						</View>

						<View style={styles.headerSocialName}>
							<Text style={styles.socialName}>{socialName}</Text>
						</View>
						<View style={styles.headerIcon}></View>
					</View>

					{/* <View style={styles.webViewContainer}> */}
					<WebView style={styles.webViewContainer} source={{ uri: url }} />
					{/* </View> */}
				</View>
			</Modal>
			<View style={styles.logoContent}>
				<Text style={styles.text1}>Sobre a Ação Tecnológica</Text>
				<Text style={styles.text2}>
					O app Compomus faz parte de uma pesquisa, envolvendo interação com
					sons, desenvolvida pelo grupo FunTech Show, através de uma parceria do
					Instituto de Computação (IComp) e Faculdade de Artes (FAARTES) da
					UFAM.
				</Text>
			</View>
			<View style={styles.meioContainer}>
				<TouchableOpacity
					onPress={() => {
						[
							setModalOpen(true),
							setUrl('https://funtechshow.com'),
							setSocialName('Site FunTechShow'),
						];
					}}>
					<Image
						style={styles.imgFuntech}
						source={require('../assets/funtechGarantido.png')}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.textContainer}>
				{/* <Text style={styles.text2}>FunTechShow [IComp/UFAM]</Text> */}

				<View style={styles.iconsRedesSociais}>
					<Icon
						// name='logo-twitter'
						name='logo-twitter'
						type='ionicon'
						color='#4DAE4C'
						size={40}
						onPress={() => {
							[
								setModalOpen(true),
								setUrl('https://twitter.com/funtechshow'),
								setSocialName('Twitter FunTechShow'),
							];
						}}
					/>
					<Icon
						// name='logo-instagram'
						name='logo-instagram'
						type='ionicon'
						color='#4DAE4C'
						size={40}
						// style={{ fontSize: 45, color: '#4DAE4C', marginRight: '10%' }}
						onPress={() => {
							[
								setModalOpen(true),
								setUrl('https://www.instagram.com/funtechshow/'),
								setSocialName('Instagram FunTechShow'),
							];
						}}
					/>
					<Icon
						name='logo-facebook'
						type='ionicon'
						color='#4DAE4C'
						size={40}
						// style={{ fontSize: 45, color: '#4DAE4C' }}
						onPress={() => {
							[
								setModalOpen(true),
								setUrl('https://www.facebook.com/FunTechShow/'),
								setSocialName('Facebook FunTechShow'),
							];
						}}
					/>
				</View>
				<Text style={styles.text3}>@funtechshow</Text>
				<Text style={styles.text4}>contato@funtechshow.com</Text>
				<Text
					style={styles.text4}
					onPress={() => {
						[
							setModalOpen(true),
							setUrl('http://compomus.funtechshow.com'),
							setSocialName('Site Compomus'),
						];
					}}>
					www.compomus.funtechshow.com
				</Text>
			</View>
			<Text
				style={styles.text5}
				onPress={() => {
					[
						setModalOpen(true),
						setUrl('http://compomus.funtechshow.com/politica_privacidade.html'),
						setSocialName('Política de Privacidade Compomus'),
					];
				}}>
				Política de Privacidade
			</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		// backgroundColor: '#f1f1f1',
		flex: 1,
		alignSelf: 'stretch',
		alignItems: 'center',
	},
	header: {
		// flex: 1,
		flexDirection: 'row',
		// marginLeft: '1%',
		// marginRight: '1%',
		// marginTop: '9%',
		// height: '5%',

		// borderTopEndRadius: 10,
		// borderTopStartRadius: 10,
		//  alignSelf: ,
		// backgroundColor: 'red',
		// alignItems: 'center',

		// marginTop: '-40%',
	},
	headerIcon: {
		// flex: 1,
		width: '10%',
		alignItems: 'center',
		// position: 'absolute',
		justifyContent: 'center',
		// marginLeft: '2%',
	},
	headerSocialName: {
		flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'blue',
		// marginLeft: '-4%',
		// marginBottom: '4%',
	},
	modalContainer: {
		flex: 1,
		// marginLeft: '0.1%',
		// marginRight: '0.1%',
		marginTop: '8%',
		marginBottom: '-4%',

		borderTopEndRadius: 15,
		borderTopStartRadius: 15,
		// alignSelf: 'stretch',
		backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'flex-start',

		// marginTop: '-40%',
	},
	webViewContainer: {
		flex: 1,
		// marginLeft: '1%',
		// marginRight: '1%',
		// marginTop: '-10%',
		// borderTopEndRadius: 10,
		// borderTopStartRadius: 10,
		// alignSelf: 'stretch',
		backgroundColor: '#0000',
		// alignItems: 'center',
		// justifyContent: 'flex-start',
		// marginTop: '-40%',
	},
	logoContent: {
		flex: 1,
		justifyContent: 'center',
		// alignSelf: 'stretch',
		marginLeft: '5%',
		marginRight: '5%',
		// alignItems: 'center',
		// marginTop: '10%',
		// width: '100%',
		// backgroundColor: 'red',
	},
	textContainer: {
		flex: 1,
		marginLeft: '5%',
		marginRight: '5%',
		alignSelf: 'stretch',
		// backgroundColor: 'blue',
		alignItems: 'center',
		// height: '20%',
		justifyContent: 'flex-start',

		marginTop: '8%',
	},

	iconsRedesSociais: {
		// flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// alignSelf: 'stretch',
		// marginLeft: '10%',
		alignItems: 'center',
		// marginTop: '-15%',
		// backgroundColor: 'green',
		width: '60%',
		// height: '18%',
	},
	meioContainer: {
		// flex: ,
		marginLeft: '5%',
		marginRight: '5%',
		// alignSelf: 'stretch',
		// backgroundColor: 'orange',
		alignItems: 'center',
		height: '10%',
		width: '75%',
		justifyContent: 'center',

		// marginTop: '10%',
	},
	imgFuntech: {
		// backgroundColor: 'green',
		resizeMode: 'contain',
		// marginTop: '10%',
		// marginBottom: '5%',
		// width: '100%',
		height: '100%',
	},

	text1: {
		textAlign: 'center',
		// marginTop: '15%',
		color: '#4DAE4C',
		fontSize: 25,
		fontWeight: 'bold',
	},
	text2: {
		textAlign: 'justify',
		marginTop: '10%',
		// marginBottom: '10%',
		color: '#565656',
		fontSize: 18,
		fontWeight: 'bold',
	},
	text3: {
		// marginLeft: '8%',
		marginTop: '10%',
		// padding: '2%',
		color: '#565656',
		fontSize: 16,
		fontWeight: 'bold',
	},
	text4: {
		// marginLeft: '8%',
		marginTop: '8%',
		// padding: '2%',
		color: '#565656',
		fontSize: 16,
		fontWeight: 'bold',
		textDecorationLine: 'underline',
	},

	text5: {
		// marginLeft: '8%',
		marginBottom: '8%',
		// padding: '2%',
		color: '#565656',
		fontSize: 16,
		fontWeight: 'bold',
		textDecorationLine: 'underline',
	},
	socialName: {
		// marginLeft: '8%',
		marginTop: '3%',
		// padding: '2%',
		color: '#4dae4c',
		fontSize: 18,
		fontWeight: 'bold',
	},
});
