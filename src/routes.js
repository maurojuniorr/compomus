import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Signup from './pages/signUp';
import Login from './pages/login';
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
				//headerLeft: () => null,
			},
		},
	},
	{
		initialRouteName: 'RootDrawerNavigator',
		headerMode: 'none',
		//contentComponent: props => <Drawer {...props} />
	}
);

export default createAppContainer(RootStack);
