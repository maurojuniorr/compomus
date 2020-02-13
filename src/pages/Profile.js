import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Profile extends Component {
	clearAll = async () => {
		try {
			await AsyncStorage.clear();
		} catch (e) {
			// clear error
		}

		console.log('Done.');
	};

	render() {
		const { navigation } = this.props;
		return (
			<>
				<View style={[styles.container]}>
					<View style={styles.trocarSomContainer}>
						<TouchableOpacity
							onPress={() => {
								this.clearAll();
							}}
							style={styles.button}>
							<Text style={styles.buttonText}>Apagar dados</Text>
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
