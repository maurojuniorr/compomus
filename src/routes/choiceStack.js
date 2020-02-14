import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Compose from '../pages/compose';
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
			headerBackTitle: 'Voltar',
			//headerLeft: () => null,
			//headerBackTitleVisible: false,
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
		headerTitleStyle: {
			fontWeight: 'bold',
			fontSize: 18,
		},
	},
});

export default ChoiceStack;
