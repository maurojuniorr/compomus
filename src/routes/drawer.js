import {
	createDrawerNavigator,
	DrawerItems,
	DrawerActions,
} from 'react-navigation-drawer';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import HomeStack from './homeStack';
import ChoiceStack from './choiceStack';
import AboutStack from './aboutStack';
import Profile from './profileStack';
import Tutorial from './TutorialStack';
import React from 'react';
import {
	Text,
	Image,
	View,
	Dimensions,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
//import RootStack from '../routes';
const { width } = Dimensions.get('window');

const customNavigator = (props, navigation) => (
	<SafeAreaView style={{ flex: 1 }}>
		<View
			style={{
				height: 150,
				backgroundColor: 'white',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<Image
				style={{ height: 100, width: 100, borderRadius: 30 }}
				source={require('../assets/logoRounded.png')}
			/>
		</View>
		<ScrollView>
			<DrawerItems {...props} />
		</ScrollView>
		<View
			style={{
				flex: 1,
				justifyContent: 'flex-start',
				alignItems: 'center',
				flexDirection: 'row',
				//marginBottom: '5%',
				marginLeft: '8%',
			}}>
			<Icon
				ios='ios-log-out'
				android='md-log-out'
				style={{ fontSize: 25, color: '#4DAE4C' }}
			/>
			<TouchableOpacity
				onPress={() =>
					Alert.alert(
						'Log out',
						'Você tem certeza que quer sair?',
						[
							{
								text: 'Cancelar',
								onPress: () => {
									props.navigation.dispatch(DrawerActions.closeDrawer());
								},
							},
							{
								text: 'Confirmar',
								onPress: () => {
									props.navigation.navigate('Login');
									AsyncStorage.removeItem('userInfo');
									AsyncStorage.removeItem('appData');
								},
							},
						],
						{ cancelable: false }
					)
				}>
				<Text
					style={{
						margin: 25,
						fontSize: 15,
						fontWeight: 'bold',
						color: '#000',
					}}>
					Logout
				</Text>
			</TouchableOpacity>
		</View>
	</SafeAreaView>
);

const RootDrawerNavigator = createDrawerNavigator(
	{
		Home: {
			screen: HomeStack,
			navigationOptions: {
				drawerIcon: () => (
					<Icon
						ios='ios-home'
						android='md-home'
						//type="Ionicons"
						style={{ fontSize: 25, color: '#4DAE4C' }}
					/>
				),
			},
		},
		'Escolher Som': {
			screen: ChoiceStack,
			navigationOptions: {
				drawerIcon: () => (
					<Icon
						ios='ios-musical-notes'
						android='md-musical-notes'
						style={{ fontSize: 25, color: '#4DAE4C' }}
					/>
				),
			},
		},
		'Editar Perfil': {
			screen: Profile,
			navigationOptions: {
				drawerIcon: () => (
					<Icon
						ios='ios-person'
						android='md-person'
						style={{ fontSize: 25, color: '#4DAE4C' }}
					/>
				),
			},
		},
		'Como Funciona?': {
			screen: Tutorial,
			navigationOptions: {
				drawerIcon: () => (
					<Icon
						ios='ios-help-circle'
						android='md-help-circle'
						style={{ fontSize: 25, color: '#4DAE4C' }}
					/>
				),
			},
		},
		'Sobre Nós': {
			screen: AboutStack,
			navigationOptions: {
				drawerIcon: () => (
					<Icon
						ios='ios-people'
						android='md-people'
						style={{ fontSize: 25, color: '#4DAE4C' }}
					/>
				),
			},
		},
	},
	{
		initialRouteName: 'Home',
		contentComponent: customNavigator,

		//drawerWidth: width,
		contentOptions: {
			activeTintColor: '#4DAE4C',
		},
	}
);
export default createAppContainer(RootDrawerNavigator);
