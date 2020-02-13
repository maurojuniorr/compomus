import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Signup from './pages/signUp';
import Login from './pages/login';
import SoundChooser from './pages/soundChooser';
import Compose from './pages/compose';
import RootDrawerNavigator from './routes/drawer';

const RootStack = createStackNavigator(
	{
		Login: {
			screen: Login,
			navigationOptions: {
				headerStyle: {
					backgroundColor: '#4DAE4C',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			},
		},
		Signup: {
			screen: Signup,
			navigationOptions: {
				headerStyle: {
					backgroundColor: '#4DAE4C',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			},
		},
		RootDrawerNavigator: {
			screen: RootDrawerNavigator,
			navigationOptions: {
				// headerTitle: 'Escolher Som',
				// headerStyle: {
				// 	backgroundColor: '#4DAE4C',
				// },
				// headerTintColor: '#fff',
				// headerTitleStyle: {
				// 	fontWeight: 'bold',
				// },
				headerLeft: () => null,
			},
		},
		// Compose: {
		// 	screen: Compose,
		// 	navigationOptions: {
		// 		headerTitle: 'Reproduzindo...',
		// 		headerStyle: {
		// 			backgroundColor: '#4DAE4C',
		// 		},
		// 		headerTintColor: '#fff',
		// 		headerTitleStyle: {
		// 			fontWeight: 'bold',
		// 		},
		// 		headerLeft: () => null,
		// 	},
		// },
	},
	{
		initialRouteName: 'Login',
		headerMode: 'none',
		//contentComponent: props => <Drawer {...props} />
	}
);

export default createAppContainer(RootStack);
