import {createStackNavigator} from 'react-navigation-stack';
import About from '../pages/About';
import React from 'react';
import Header from '../shared/header';
const screens = {
  About: {
    screen: About,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Sobre o Compomus" />
        ),
      };
    },
  },
};

const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#4DAE4C',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

export default AboutStack;
