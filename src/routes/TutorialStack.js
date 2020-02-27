import { createStackNavigator } from 'react-navigation-stack';
import Tutorial from '../pages/Tutorial';
import React from 'react';
import Header from '../shared/header';
const screens = {
	Tutorial: {
		screen: Tutorial,
		navigationOptions: ({ navigation }) => {
			return {
				headerTitle: () => (
					<Header navigation={navigation} title='Como Funciona?' />
				),
			};
		},
	},
};

const TutorialStack = createStackNavigator(screens, {
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#4DAE4C',
		},
		headerShown: false,
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	},
});

export default TutorialStack;
