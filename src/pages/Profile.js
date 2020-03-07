import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Image,
	Alert,
	TextInput,
} from 'react-native';
import { NavigationEvents, SafeAreaView } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
// import Lottie from 'lottie-react-native';
// import iconProfile from '../assets/iconProfile.json';

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);
export default class Profile extends Component {
	state = {
		userId: '',
		userName: '',
		userEmail: '',
		userPass: '',
		soundName: '',
		soundRaw: '',
		statusRequest: false,
		isLoading: false,
	};
	componentDidMount() {
		this.getData();
	}
	setRequest() {
		this.setState({ statusRequest: false });
	}
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
				//Alert.alert('Compomus', 'Mudanças efetuadas  com sucesso!');
				console.log('Mudança gravada no banco com sucesso!');
				this.storeData();
				this.setState({ isLoading: false, statusRequest: true });
				setTimeout(() => {
					this.setState({ statusRequest: false });
				}, 3000);
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
		//formData.append('pass', this.state.userPass);
		this.setState({ isLoading: true, statusRequest: false });

		try {
			const response = await fetch(
				`${global.rawSource}/index.php/getThisUser`,
				{
					method: 'POST',
					body: formData,
				}
			);

			if (response.status === 200) {
				const responseJson = await response.json();
				//const { email } = responseJson;
				const { id } = responseJson;
				console.log(responseJson);
				// console.log(formData);
				if (id !== this.state.userId && responseJson !== false) {
					Alert.alert(
						'Atenção!',
						'Email já foi utilizado!\nPor favor tente usar outro'
					);
					console.log('Email unavailable for use');
					this.setState({ isLoading: false });
				} else {
					this.updateSound();
					console.log('Email unavailable for use');
				}
			} else {
				Alert.alert(
					'Compomus',
					'Houve um erro na solicitação\n Por favor tente novamente!'
				);
				this.setState({ isLoading: false });
			}
		} catch (error) {
			console.log(err.message);
			Alert.alert(
				'Erro ao criar usuário',
				'Houve um erro em sua solicitação \n Por favor tente novamente'
			);
			this.setState({ isLoading: false });
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
			<DismissKeyboard>
				<SafeAreaView style={styles.container}>
					{/* <StatusBar hidden={false} barStyle='light-content' /> */}
					{/* <View style={styles.container}> */}

					<KeyboardAvoidingView
						behavior={Platform.select({
							ios: 'padding',
							android: null,
						})}>
						<NavigationEvents onDidFocus={() => this.getData()} />
						<View style={styles.logoContent}>
							<Image
								//autoSize={true}
								// resizeMode='center'
								style={styles.logo}
								source={require('../assets/iconProfile.png')}
							/>
							{this.state.isLoading ? (
								// <ActivityIndicator/>
								<Text style={styles.welcome}>Processando Aguarde...</Text>
							) : this.state.statusRequest ? (
								<Text style={styles.welcome}>
									Mudanças efetuadas com sucesso!
								</Text>
							) : (
								<Text style={[styles.welcome, { color: '#0000' }]}>teste</Text>
							)}
						</View>
						<View style={styles.inputer}>
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
							<Text style={styles.label}></Text>
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

						<View style={styles.contentButton}></View>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</DismissKeyboard>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//alignItems: 'stretch',
		alignItems: 'center',
		backgroundColor: '#f1f1f1',
	},
	logoContent: {
		flex: 1,
		alignSelf: 'stretch',
		justifyContent: 'center',

		marginTop: '2%',
		// backgroundColor: 'red',
	},
	logo: {
		//justifyContent: 'center',
		// alignItems: 'center',
		resizeMode: 'contain',
		//alignSelf: 'stretch',
		// marginTop: '15%',
		// marginBottom: '-5%',
		width: '100%',
		height: '70%',
	},
	label: {
		color: '#4DAE4C',
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: '0.6%',
		left: 5,
		letterSpacing: 1,
	},
	welcome: {
		// marginTop: '2%',
		textAlign: 'center',
		marginTop: '5%',
		// padding: 10,
		fontSize: 18,
		fontWeight: 'bold',
		color: '#4DAE4C',
	},

	inputer: {
		//flex: 2,
		// marginTop: '10%',
		// marginTop: '2%',
		justifyContent: 'space-between',
		// alignItems: 'center',
		//alignSelf: 'stretch',
		// backgroundColor: 'blue',
	},
	input: {
		marginBottom: '2%',
		padding: '2%',
		width: '100%',
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
		elevation: 0.5,
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
		shadowOpacity: 0.1,
		// shadowRadius: 1,
		elevation: 0.5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	contentButton: {
		// flex: 1,
		marginBottom: '10%',
		width: '100%',
		height: '5%',
		justifyContent: 'center',
		alignSelf: 'center',
		// marginBottom: '2%',
		// backgroundColor: 'green',
	},
});
