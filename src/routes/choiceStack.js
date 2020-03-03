import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Compose from '../pages/Compose';

import Header from '../shared/header';
import ChoiceSound from '../pages/soundChooser';
const screens = {
	ChoiceStack: {
		screen: ChoiceSound,
		navigationOptions: ({ navigation }) => {
			return {
				headerTitle: () => (
					<Header navigation={navigation} title='Escolher Som' />
				),
			};
		},
	},
	Compose: {
		screen: Compose,
		navigationOptions: {
			title: 'Compose',
		},
	},
};

const ChoiceStack = createStackNavigator(screens, {
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#4DAE4C',
		},
		headerTintColor: '#fff',
		headerBackTitle: 'Voltar',
		headerTitleStyle: {
			fontWeight: 'bold',
			fontSize: 18,
		},
	},
});

export default ChoiceStack;
