import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Signup from './pages/signUp';
import Login from './pages/login';
import SoundChooser from './pages/soundChooser';
import Compose from './pages/compose';

const RootStack = createStackNavigator(
    {
      Login: Login,
      Signup,
      SoundChooser,
      Compose,
    },
    {
      initialRouteName: 'Login',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#4DAE4C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }
);

const AppContainer = createAppContainer(RootStack);
export default AppContainer;
