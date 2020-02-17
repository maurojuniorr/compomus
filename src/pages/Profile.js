import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	Image,
	Alert,
	TextInput,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
// import Lottie from 'lottie-react-native';
// import iconProfile from '../assets/iconProfile.json';
export default class Profile extends Component {
	state = {
		userId: '',
		userName: '',
		userEmail: '',
		userPass: '',
		soundName: '',
		soundRaw: '',
	};
	componentDidMount() {}
	clearAll = async () => {
		try {
			await AsyncStorage.clear();
		} catch (e) {
			// clear error
		}

		console.log('Done.');
	};

	updateSound = async () => {
		let formData = new FormData();

		formData.append('id', this.state.userId);
		formData.append('name', this.state.userName);
		formData.append('email', this.state.userEmail);
		formData.append('pass', this.state.userPass);
		formData.append('soundRaw', this.state.soundRaw);
		formData.append('soundName', this.state.soundName);
		try {
			const response = await fetch(`${global.rawSource}/index.php/updateUser`, {
				method: 'POST',
				body: formData,
			});

			if (response.status === 200) {
				Alert.alert('Compomus', 'Mudanças efetuadas  com sucesso!');
				console.log('Mudança gravada no banco com sucesso!');
				this.storeData();
			} else {
				Alert.alert(
					'Mudança não realizada',
					'Erro de comunicação com o servidor!'
				);
				console.log('Erro de comunicação com o servidor');
			}
		} catch (error) {
			Alert.alert('Servidor não responde', 'Por favor avise o suporte');
		}

		//console.log(formData);
	};

	verifyData = async () => {
		const formData = new FormData();
		formData.append('email', this.state.userEmail);
		formData.append('pass', this.state.userPass);

		try {
			const response = await fetch(
				`${global.rawSource}/index.php/validateUser`,
				{
					method: 'POST',
					body: formData,
				}
			);
			if (response.status === 200) {
				const responseJson = await response.json();
				const { email } = responseJson;
				const { pass } = responseJson;
				// console.log(formData);
				if (email === this.state.userEmail) {
					Alert.alert(
						'Atenção!',
						'Email já foi utilizado!\nPor favor tente usar outro'
					);
					console.log('Email unavailable for use');
				} else {
					this.updateSound();
					console.log('Email unavailable for use');
				}
			} else {
				Alert.alert(
					'Compomus',
					'Houve um erro na solicitação\n Por favor tente novamente!'
				);
			}
		} catch (error) {
			console.log(err.message);
			Alert.alert(
				'Erro ao criar usuário',
				'Houve um erro em sua solicitação \n Por favor tente novamente'
			);
		}
	};

	storeData = async () => {
		const { navigation } = this.props;
		let userInfo = {
			userId: this.state.userId,
			userName: this.state.userName,
			userEmail: this.state.userEmail,
			userPass: this.state.userPass,
			soundName: this.state.soundName,
			soundRaw: this.state.soundRaw,
		};

		try {
			await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
			console.log(JSON.stringify(userInfo));

			navigation.navigate('Profile');
		} catch (e) {
			// saving error
		}
	};

	getData = async () => {
		try {
			const value = await AsyncStorage.getItem('userInfo');
			let parsed = JSON.parse(value);
			if (value !== null) {
				// value previously stored
				this.setState({
					userId: parsed.userId,
					userName: parsed.userName,
					userEmail: parsed.userEmail,
					userPass: parsed.userPass,
					soundName: parsed.soundName,
					soundRaw: parsed.soundRaw,
				});
			}
		} catch (e) {
			// error reading value
		}
	};

	updateValue(text, field) {
		if (field === 'name') {
			this.setState({
				userName: text,
			});
		} else if (field === 'email') {
			this.setState({
				userEmail: text,
			});
		} else if (field === 'pass') {
			this.setState({
				userPass: text,
			});
		}
	}

	render() {
		const { navigation } = this.props;
		return (
			<>
				{/* <StatusBar barStyle='dark-content' /> */}
				{/* <View style={styles.container}> */}
				<KeyboardAvoidingView
					style={styles.container}
					behavior={Platform.select({
						ios: 'padding',
						android: null,
					})}>
					<NavigationEvents onDidFocus={() => this.getData()} />
					<View style={styles.logoContent}></View>
					<View style={styles.inputer}>
						<View style={styles.logoContent}>
							<Image
								//autoSize={true}
								resizeMode='center'
								style={styles.animation}
								source={require('../assets/profileIcon.jpg')}
							/>
						</View>
						{/* {
							<Lottie
								style={styles.animation}
								source={iconProfile}
								autoPlay
								loop
								resizeMode='center'
								autoSize={true}
							/>
						} */}
						<View style={styles.labelContent}>
							<Text style={styles.label}>Nome</Text>
							<TextInput
								style={styles.input}
								keyboardType={'default'}
								autoCapitalize={'none'}
								//textContentType={'emailAdress'}
								placeholder={this.state.userName}
								placeholderTextColor={'#4a4a4a'}
								returnKeyType={'done'}
								//onSubmitEditing={() => this.field2.focus()}
								onChangeText={text => this.updateValue(text, 'name')}
							/>
							<Text style={styles.label}>Email</Text>
							<TextInput
								style={styles.input}
								keyboardType={'email-address'}
								autoCapitalize={'none'}
								//textContentType={'emailAdress'}
								placeholder={this.state.userEmail}
								placeholderTextColor={'#4a4a4a'}
								returnKeyType={'done'}
								//onSubmitEditing={() => this.field2.focus()}
								onChangeText={text => this.updateValue(text, 'email')}
							/>

							<Text style={styles.label}>Nova Senha</Text>
							<TextInput
								secureTextEntry={true}
								style={styles.input}
								autoCapitalize={'none'}
								returnKeyType={'done'}
								ref={input => {
									this.field2 = input;
								}}
								placeholder={''}
								placeholderTextColor={'#4a4a4a'}
								//onSubmitEditing={this.CheckTextInput}
								onChangeText={text => this.updateValue(text, 'pass')}
							/>
						</View>
					</View>
					<View style={styles.contentButton}>
						<TouchableOpacity
							onPress={() => {
								Alert.alert(
									'Atualização de Dados',
									'Você tem certeza disso?\nEsta ação não pode ser desfeita!',
									[
										{
											text: 'Cancelar',
											onPress: () => console.log('Cancel Pressed'),
											style: 'cancel',
										},
										{ text: 'Confirmar', onPress: () => this.verifyData() },
									],
									{ cancelable: false }
								);
								// this.storeData();
							}}
							style={styles.button}>
							<Text style={styles.buttonText}>Enviar</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//alignItems: 'center',
		backgroundColor: '#f1f1f1',
	},
	label: {
		color: '#4DAE4C',
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 5,
		left: 5,
		letterSpacing: 1,
	},
	labelContent: {
		//flex: 6,
		justifyContent: 'flex-start',
		//alignItems: 'center',
		//marginBottom: 280,
	},
	logoContent: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		marginTop: '-12%',
	},
	animation: {
		flex: 1,
		//position: 'absolute',
		// justifyContent: 'center',
		// alignItems: 'center',

		width: '50%',
		height: '50%',
		// shadowColor: '#000',
		// shadowOffset: { width: 0, height: 0 },
		// shadowOpacity: 0.2,
		// // shadowRadius: 1,
		// elevation: 0,
	},
	inputer: {
		flex: 4,
		//marginTop: '10%',
		justifyContent: 'flex-end',
		alignItems: 'center',
		// backgroundColor: '#ddd',
	},
	input: {
		marginBottom: 10,
		padding: 10,
		width: 300,
		height: 50,
		backgroundColor: '#fff',
		fontSize: 16,
		color: '#4a4a4a',
		fontWeight: 'bold',
		borderRadius: 14,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		// shadowRadius: 1,
		elevation: 0,
	},
	button: {
		width: 300,
		height: 45,
		borderRadius: 14,
		//marginTop: 20,
		backgroundColor: '#4DAE4C',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		// shadowRadius: 1,
		elevation: 0,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	contentButton: {
		flex: 1,
		marginTop: 40,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
});
