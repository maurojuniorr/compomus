import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
export default function Header({ navigation, title }) {
	const openMenu = () => {
		navigation.openDrawer();
	};
	return (
		<View style={styles.header}>
			<View style={styles.icon}>
				<Icon
					name='align-justify'
					size={31}
					type='feather'
					color='white'
					onPress={openMenu}
					reverseColor='white'
					//activeOpacity={0.0}
					underlayColor={'#4DAE4C'}
				/>
			</View>
			<View style={styles.textContent}>
				<Text style={styles.headerText}>{title}</Text>
			</View>
		</View>
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
