import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Animated,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	ViewBase,
	SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { NavigationEvents } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
const screenWidth = Dimensions.get('window').width;
const screeenHeight = Dimensions.get('window').height;
const items = [0, 1, 2, 3, 4];
export default class Tutorial extends Component {
	state = {
		selectedIndex: 0,
		index: new Animated.Value(0),
		track: new Animated.Value(0),
	};

	scrollToTop = () => {
		this.scroller.scrollTo({ x: 0, y: 0 });
	};

	componentDidMount = () => {
		Animated.timing(this.state.index, {
			duration: 20,
			toValue: this.state.track,
			useNativeDriver: true,
		}).start();
	};
	setSelectedIndex = event => {
		// Width of the viewsize
		const viewsize = event.nativeEvent.layoutMeasurement.width;
		// get current position of the scrollview
		const contentOffset = event.nativeEvent.contentOffset.x;
		const selectedIndex = Math.floor(contentOffset / viewsize);
		this.setState({ selectedIndex });
		this.state.track.setValue(selectedIndex);
	};

	renderItem = () => (
		<ScrollView
			// ref={this.flatListRef}
			ref={ref => {
				this.scrollview_ref = ref;
			}}
			horizontal={true}
			pagingEnabled={true}
			showsHorizontalScrollIndicator={false}
			scrollEventThrottle={1000}
			onMomentumScrollEnd={this.setSelectedIndex}>
			<View style={styles.view1}>
				<Animatable.View
					// animation='bounceIn'
					// useNativeDriver
					// duration={2000}
					style={styles.textContainer}>
					<Text style={styles.text1}>Compomus</Text>
					<Text style={styles.text2}>Como Funciona?</Text>
				</Animatable.View>
				<View style={styles.textContainer2}>
					<Text style={styles.text3}>
						Após seu cadastro, você será levado à tela de escolha de sons. Nesta
						tela, você pode escolher dentre todos os sons disponínveis, o que
						mais lhe agrada para poder colaborar.
					</Text>
				</View>

				<Animatable.View
					style={styles.soundContainer2}
					animation='bounceIn'
					useNativeDriver
					duration={2000}>
					<View style={styles.soundContainer}>
						<Text style={styles.soundName}>Padrão de Elegância</Text>
						<Text style={styles.soundDescription}>Forró Zé Vaqueiro</Text>

						<View style={styles.buttonContent}>
							<TouchableOpacity style={styles.playButton}>
								<Animatable.Text
									animation='rubberBand'
									useNativeDriver
									duration={2000}
									iterationCount={Infinity}
									style={styles.soundButtonText}>
									Play
								</Animatable.Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.chooseButton}
								onPress={() => {
									//this.playSong(item.nameFile, item.name);
								}}>
								<Animatable.Text
									animation='shake'
									useNativeDriver
									duration={2000}
									iterationCount={Infinity}
									style={styles.soundButtonText}>
									Escolher
								</Animatable.Text>
							</TouchableOpacity>
						</View>
					</View>
				</Animatable.View>
				<Animatable.View
					// animation='bounceIn'
					// useNativeDriver
					// duration={2000}
					style={styles.textContainer3}>
					<Text style={styles.text3}>
						Você ainda pode escutar os sons quantas vezes quiser antes de
						ecolher, e assim que estiver pronto aperte em escolher e você estará
						quase pronto(a) para interagir!
					</Text>
				</Animatable.View>
			</View>

			<View style={styles.view1}>
				<Animatable.View
					// animation='bounceIn'
					// useNativeDriver
					// duration={2000}
					style={styles.textContainer}>
					<Text style={styles.text1}>Compomus</Text>
					<Text style={styles.text2}>Como Funciona?</Text>
				</Animatable.View>

				<View style={styles.textContainer2}>
					<Text style={styles.text3}>
						Depois de escolher seu som, está tudo certo para interagir, mas para
						isso, ainda é necessário estar no espaço de interação destinado ao
						Compomus.
					</Text>
				</View>

				<Animatable.View
					style={styles.animationContainer}
					animation='bounceIn'
					useNativeDriver
					duration={2000}>
					<View style={styles.animation1}>
						<LottieView
							source={require('../assets/finderPhone.json')}
							autoPlay
							loop
							resizeMode='contain'
						/>
					</View>
				</Animatable.View>
				<Animatable.View
					// animation='bounceIn'
					// useNativeDriver
					// duration={2000}
					style={styles.textContainer3}>
					<Text style={styles.text3}>
						Ao detectar uma instalação do Compomus, o App lhe avisará se você
						está dentro ou fora do espaço virtual de composição.
					</Text>
				</Animatable.View>
			</View>

			<View style={styles.view1}>
				<Animatable.View
					// animation='bounceIn'
					// useNativeDriver
					// duration={2000}
					style={styles.textContainer}>
					<Text style={styles.text1}>Compomus</Text>
					<Text style={styles.text2}>Como Funciona?</Text>
				</Animatable.View>
				<View style={styles.textContainer2}>
					<Text style={styles.text3}>
						O ambiente possui um espaço virtualmente delimitado, e ao
						adentrá-lo, o som que você escolheu é reproduzido automaticamente em
						loop, ao deixá-lo o som para de tocar.
					</Text>
				</View>

				<Animatable.View
					style={styles.animationContainer}
					animation='bounceIn'
					useNativeDriver
					duration={2000}>
					<View style={styles.animation1}>
						<LottieView
							source={require('../assets/pinLocation.json')}
							autoPlay
							loop
							resizeMode='contain'
						/>
					</View>
				</Animatable.View>
				<Animatable.View
					// animation='bounceIn'
					// useNativeDriver
					// duration={2000}
					style={styles.textContainer3}>
					<Text style={styles.text3}>
						Todos os outros sons reproduzidos ao mesmo tempo, assim é possível
						combinar sons e ou reproduzi-los de forma alternada ao sair e entrar
						do espaço.
					</Text>
				</Animatable.View>
			</View>
			<View style={styles.view1}>
				<Animatable.View
					// animation='bounceIn'
					// useNativeDriver
					// duration={2000}
					style={styles.textContainer}>
					<Text style={styles.text1}>Compomus</Text>
					<Text style={styles.text2}>Como Funciona?</Text>
				</Animatable.View>
				<View style={styles.textContainer2}>
					<Text style={styles.text3}>
						O ambiente de interação do Compomus possui suporte à espacialização
						sonora para uma experiência imersiva em um campo sonoro similar ao
						do cinema.
					</Text>
				</View>

				<Animatable.View
					style={styles.animationContainer}
					animation='bounceIn'
					useNativeDriver
					duration={2000}>
					<View style={styles.animationPhone}>
						<LottieView
							source={require('../assets/movePhone.json')}
							autoPlay
							loop
							resizeMode='contain'
						/>
					</View>
				</Animatable.View>
				<Animatable.View
					// animation='bounceIn'
					// useNativeDriver
					// duration={2000}
					style={styles.textContainer3}>
					<Text style={styles.text3}>
						O App ainda detecta seus movimentos no ambiente permitindo
						direcionar em tempo real o som escolhido para a direção desejada de
						acordo com a sua localização. Você pode trocar de som a qualquer
						momento.
					</Text>
				</Animatable.View>
			</View>
			<View style={styles.view1}>
				<Animatable.View style={styles.textContainer}>
					<Text style={styles.text1}>Compomus</Text>
					<Text style={styles.text2}>Como Funciona?</Text>
				</Animatable.View>
				<View style={styles.textContainer2}>
					<Text style={styles.text3}>
						Agora sim! você pode clicar em ir para o App para podermos interagir
						com o som e compormos juntos!
					</Text>
					<Text style={styles.text3}>
						A qualquer momento você pode voltar aqui abrindo o menu no canto
						superior!
					</Text>
				</View>

				<Animatable.View
					style={styles.animationContainer}
					animation='bounceIn'
					useNativeDriver
					duration={2000}>
					<View style={styles.animationContainer}>
						<LottieView
							source={require('../assets/playing2.json')}
							autoPlay
							loop
							resizeMode='contain'
						/>
					</View>
				</Animatable.View>
				<Animatable.View
					// animation='bounceIn'
					// useNativeDriver
					// duration={2000}
					style={styles.textContainer3}>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('Home');
						}}
						style={styles.button}>
						<Text style={styles.buttonText}>Ir para o App</Text>
					</TouchableOpacity>
				</Animatable.View>
			</View>
		</ScrollView>
	);

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<NavigationEvents
					onDidFocus={() => {
						this.state.track.setValue(0),
							this.scrollview_ref.scrollTo({
								x: 0,
								y: 0,
								animated: false,
							});
					}}
				/>
				<this.renderItem />

				<View style={styles.circleContainer}>
					{items.map(i => {
						const { index } = this.state;

						const translateX = Animated.multiply(
							Animated.subtract(index, i),
							8
						);
						const transform = {
							transform: [{ translateX }],
						};
						return (
							<View style={styles.circle} key={i}>
								<Animated.View style={[styles.mover, transform]} />
							</View>
						);
					})}
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignSelf: 'stretch',
		alignItems: 'center',
		backgroundColor: '#4DAE4C',
	},
	textContainer: {
		// flex: 1,

		// backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: '5%',
		marginRight: '5%',
		// marginBottom: '5%',
	},
	textContainer2: {
		flex: 1,

		// background5Color: '#fff',
		// marginTop: '5%',
		alignItems: 'flex-end',
		justifyContent: 'center',
		marginLeft: '5%',
		marginRight: '5%',
		// marginBottom: '2%',
	},
	textContainer3: {
		flex: 1,

		// background5Color: '#fff',
		// marginTop: '5%',

		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: '5%',
		marginRight: '5%',
		marginBottom: '7%',
	},
	soundContainer2: {
		alignItems: 'stretch',
		// flex: 1,
		// marginBottom: '6%',
		// justifyContent: 'flex-end',
	},

	soundContainer: {
		// alignItems: 'stretch',
		padding: '5%',
		backgroundColor: '#fff',
		// marginBottom: 20,
		marginLeft: '5%',
		marginRight: '5%',
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#ddd',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		// shadowRadius: 1,
		elevation: 0,
	},
	animationContainer: {
		flex: 1,
		// width: '100%',
		// height: '100%',
		// resizeMode: 'contain',
		// alignSelf: 'stretch',
		justifyContent: 'center',
		backgroundColor: '#fff',
		borderRadius: 7,
		// marginBottom: '5%',
		marginLeft: '5%',
		marginRight: '5%',
	},
	animationPhone: {
		// flex: 2,
		resizeMode: 'center',
		//position: 'absolute',
		// justifyContent: 'center',
		// alignItems: 'center',
		// marginTop: '-35%',
		width: '100%',
		height: '280%',
	},
	animation1: {
		//flex: 2,
		resizeMode: 'contain',
		//position: 'absolute',
		// justifyContent: 'center',
		// alignItems: 'center',
		// marginTop: '-35%',
		width: '100%',
		height: '100%',
	},
	mover: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: 8,
		height: 8,
		borderRadius: 3,
		backgroundColor: 'tomato',
	},
	circleContainer: {
		position: 'absolute',
		// marginTop: '10%',
		bottom: '3%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	circle: {
		width: 8,
		height: 8,
		backgroundColor: '#ddd',
		borderRadius: 4,
		marginRight: 5,
		overflow: 'hidden',
	},

	view1: {
		// flex: 1,
		width: screenWidth,
		height: screeenHeight,
		alignSelf: 'stretch',
		// justifyContent: 'center',
		// alignItems: 'center',
		backgroundColor: '#4DAE4C',
	},
	view2: {
		// flex: 1,
		width: screenWidth,
		height: screeenHeight,
		alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: '#fff',
	},
	view3: {
		flex: 1,
		width: screenWidth,
		height: screeenHeight,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'tomato',
	},
	list: {
		padding: 20,
	},

	text1: {
		// backgroundColor: '#fff',
		textAlign: 'center',
		marginTop: '5%',
		color: '#fff',
		fontSize: 40,
		fontWeight: 'bold',
	},

	text2: {
		// backgroundColor: '#fff',
		textAlign: 'center',
		marginBottom: '8%',
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
	},

	text3: {
		// backgroundColor: '#fff',

		textAlign: 'justify',
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	text4: {
		// backgroundColor: '#fff',

		textAlign: 'center',
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},

	soundName: {
		color: '#333',
		fontSize: 16,
		fontWeight: 'bold',
	},
	buttonContent: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	playButton: {
		width: '40%',
		height: 45,
		marginTop: 20,
		borderRadius: 14,
		backgroundColor: '#00A4DC',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		// shadowRadius: 1,
		elevation: 0,
	},
	chooseButton: {
		width: '40%',
		height: 45,
		marginTop: 20,
		borderRadius: 14,
		backgroundColor: '#4DAE4C',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		// shadowRadius: 1,
		elevation: 0,
	},
	soundButtonText: {
		fontSize: 16,
		color: '#fff',
		fontWeight: 'bold',
	},
	soundDescription: {
		color: '#999',
		marginTop: 10,
		fontSize: 14,
		fontWeight: 'bold',
	},
	button: {
		width: 300,
		height: 45,
		//marginTop: 40,
		borderRadius: 14,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: '#4DAE4C',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
