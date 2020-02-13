import {createStackNavigator} from 'react-navigation-stack';
import Profile from '../pages/Profile';
import React from 'react';
import Header from '../shared/header';
const screens = {
  Profile: {
    screen: Profile,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Editar Perfil" />
        ),
      };
    },
  },
};

const ProfileStack = createStackNavigator(screens, {
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

export default ProfileStack;
