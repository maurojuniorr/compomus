import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Home from '../pages/HomeScreen';
import Header from '../shared/header';
const screens = {
	Home: {
		screen: Home,
		navigationOptions: ({ navigation }) => {
			return {
				headerTitle: () => <Header navigation={navigation} title='Compomus' />,
			};
		},
	},
};

const HomeStack = createStackNavigator(screens, {
	defaultNavigationOptions: {
		headerBackTitle: null,
		headerBackTitleVisible: false,
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

export default HomeStack;
