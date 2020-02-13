import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Alert,
	NativeModules,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const { MyNativeModule } = NativeModules;
export default class HomeScreen extends Component {
	state = {
		userId: 0,
		soundName: '',
		userName: '',
		soundRaw: '',
	};
	componentDidMount() {}

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
				if (parsed.soundName === '0' && parsed.soundRaw === '0') {
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
		return (
			<>
				<View style={[styles.container]}>
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
				</View>
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ddd',
		alignItems: 'center',
		// justifyContent: "center"
	},
	button: {
		width: 300,
		height: 45,
		//marginTop: 40,
		borderRadius: 4,
		backgroundColor: '#4DAE4C',
		justifyContent: 'center',
		alignItems: 'center',
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
