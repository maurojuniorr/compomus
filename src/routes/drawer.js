import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import ChoiceStack from './choiceStack';
import AboutStack from './aboutStack';
import Profile from './profileStack';

const RootDrawerNavigator = createDrawerNavigator({
	Home: {
		screen: HomeStack,
	},
	'Escolher Som': {
		screen: ChoiceStack,
	},
	'Editar Perfil': {
		screen: Profile,
	},
	'Sobre o Compomus': {
		screen: AboutStack,
	},
});
export default createAppContainer(RootDrawerNavigator);
