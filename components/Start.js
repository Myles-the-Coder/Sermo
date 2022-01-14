import React, { useState } from 'react';
import {
	View,
	Text,
	Button,
	TextInput,
	Image,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';

export default function Start({ navigation }) {
	const [name, setName] = useState('');
	const [bgColor, setBgColor] = useState('');
	const {
		outerContainer,
		innerContainer,
		textInput,
		text,
		colorList,
		colorCircle,
		img,
		blackBackground,
		lighterBackground,
		grayBackground,
		lightBlueBackground,
	} = style;

	return (
		<View style={outerContainer}>
			<ImageBackground
				source={require('../Background.png')}
				resizeMode='cover'
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					flex: 1,
				}}>
				<Image source={require('../Sermo_Logo.png')} style={img} />
				<View style={innerContainer}>
					<TextInput
						style={textInput}
						placeholder='Enter Username...'
						onChangeText={text => setName(text)}
					/>
					<Text style={text}>Your username is: {name}</Text>
					<Text style={text}>Choose Background Color: </Text>
					<View style={colorList}>
						<TouchableOpacity
              accessible={true}
              accessibilityLabel='Black button'
              accessibilityHint='Lets you choose black as your background color'
              accessibilityRole='button'
							onPress={() => setBgColor(blackBackground.backgroundColor)}>
							<View style={[colorCircle, blackBackground]}></View>
						</TouchableOpacity>
						<TouchableOpacity
             accessible={true}
             accessibilityLabel='Light black button'
             accessibilityHint='Lets you choose light black as your background color'
             accessibilityRole='button'
							onPress={() => setBgColor(lighterBackground.backgroundColor)}>
							<View style={[colorCircle, lighterBackground]}></View>
						</TouchableOpacity>
						<TouchableOpacity
             accessible={true}
             accessibilityLabel='Gray button'
             accessibilityHint='Lets you choose gray as your background color'
             accessibilityRole='button'
							onPress={() => setBgColor(grayBackground.backgroundColor)}>
							<View style={[colorCircle, grayBackground]}></View>
						</TouchableOpacity>
						<TouchableOpacity
             accessible={true}
             accessibilityLabel='Light blue button'
             accessibilityHint='Lets you choose light blue as your background color'
             accessibilityRole='button'
							onPress={() => setBgColor(lightBlueBackground.backgroundColor)}>
							<View style={[colorCircle, lightBlueBackground]}></View>
						</TouchableOpacity>
					</View>
					<Button
						title='Start Conversation'
						onPress={() => navigation.navigate('Chat', { name, bgColor })}
					/>
				</View>
			</ImageBackground>
		</View>
	);
}

const style = StyleSheet.create({
	outerContainer: {
		flex: 1,
	},
	innerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,0.8)',
		padding: 25,
		borderRadius: 20,
	},
	img: {
		width: 175,
		height: 175,
		margin: 20,
	},
	textInput: {
		width: 300,
		margin: 10,
		padding: 10,
		backgroundColor: 'whitesmoke',
		borderWidth: 1,
		borderColor: 'gray',
	},
	text: {
		fontSize: 20,
		margin: 10,
	},
	colorList: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	colorCircle: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: 'blue',
		margin: 20,
	},
	blackBackground: {
		backgroundColor: '#090c08',
	},
	lighterBackground: {
		backgroundColor: '#474056',
	},
	grayBackground: {
		backgroundColor: '#8A95A5',
	},
	lightBlueBackground: {
		backgroundColor: '#add8e6',
	},
});
