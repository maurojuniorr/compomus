import React, { Component, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Alert,
	StatusBar,
	Image,
	SafeAreaView,
	Modal,
} from 'react-native';
// import { Icon } from 'native-base';
import { Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { TouchableHighlight } from 'react-native-gesture-handler';
export default function About({ props }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [url, setUrl] = useState('');
	const [socialName, setSocialName] = useState('');

	return (
		<>
			<StatusBar barStyle='light-content' />
			<SafeAreaView style={styles.container}>
				<Modal animationType='slide' transparent={true} visible={modalOpen}>
					<View style={styles.modalContainer}>
						<View style={styles.header}>
							<View style={styles.headerIcon}>
								<Icon
									name='ios-close'
									type='ionicon'
									color='#4DAE4C'
									size={45}
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
						sons, desenvolvida pelo grupo FunTech Show, através de uma parceria
						do Instituto de Computação (IComp) e Faculdade de Artes (FAARTES) da
						UFAM.
					</Text>
				</View>

				<View style={styles.textContainer}>
					{/* <Text style={styles.text2}>FunTechShow [IComp/UFAM]</Text> */}

					<Image
						style={styles.imgFuntech}
						source={require('../assets/funtechGarantido.png')}
						onPress={() => {
							[
								setModalOpen(true),
								setUrl('https://funtechshow.com'),
								setSocialName('Site FunTechShow'),
							];
						}}
					/>
					<View style={styles.iconsRedesSociais}>
						<Icon
							// name='logo-twitter'
							name='logo-twitter'
							type='ionicon'
							color='#4DAE4C'
							size={45}
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
							size={45}
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
							size={45}
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
							setUrl(
								'http://compomus.funtechshow.com/politica_privacidade.html'
							),
							setSocialName('Política de Privacidade Compomus'),
						];
					}}>
					Política de Privacidade
				</Text>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		// backgroundColor: '#fff',
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
		marginLeft: '0.1%',
		marginRight: '0.1%',
		marginTop: '9%',
		marginBottom: '-5%',

		borderTopEndRadius: 15,
		borderTopStartRadius: 15,
		// alignSelf: 'stretch',
		backgroundColor: 'white',
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
		justifyContent: 'space-between',
		// alignSelf: 'stretch',
		alignItems: 'center',
		// marginTop: '12%',

		width: '50%',
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
		fontSize: 14,
		fontWeight: 'bold',
		textDecorationLine: 'underline',
	},
	socialName: {
		// marginLeft: '8%',
		marginTop: '4%',
		// padding: '2%',
		color: '#4dae4c',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
