import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { Icon } from 'react-native-elements';
const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);
export default function Header({ navigation, title }) {
	return (
		<DismissKeyboard>
			<View style={styles.header}>
				<View style={styles.icon}>
					<Icon
						name='align-justify'
						size={30}
						type='feather'
						color='white'
						onPress={() => (navigation.openDrawer(), Keyboard.dismiss())}
						reverseColor='white'
						//activeOpacity={0.0}
						underlayColor={'#0000'}
					/>
				</View>
				<View style={styles.textContent}>
					<Text style={styles.headerText}>{title}</Text>
				</View>
			</View>
		</DismissKeyboard>
	);
}

const styles = StyleSheet.create({
	header: {
		flex: 1,

		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContent: {
		//justifyContent: 'center',
		// alignItems: 'stretch',
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 18,
		color: '#ffffff',
		letterSpacing: 1,
		// shadowColor: 'rgba(0, 0, 0, 0.55)',
		// shadowOffset: { width: 0, height: 0 },
		// shadowOpacity: 0.1,
		// // shadowRadius: 1,
		// elevation: 0,
	},
	icon: {
		position: 'absolute',
		left: 7,
		// shadowColor: 'rgba(0, 0, 0, 0.55)',
		// shadowOffset: { width: 0, height: 0 },
		// shadowOpacity: 0.1,
		// // shadowRadius: 1,
		// elevation: 0,
		// justifyContent: 'center',
		//alignItems: 'center',
	},
});
