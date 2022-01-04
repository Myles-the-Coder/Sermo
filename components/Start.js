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
	const { outerContainer, innerContainer, textInput, text, colorList, colorCircle, img } =
		style;

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
							onPress={() => setBgColor(style.blackBackground.backgroundColor)}>
							<View style={[colorCircle, style.blackBackground]}></View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								setBgColor(style.lighterBackground.backgroundColor)
							}>
							<View style={[colorCircle, style.lighterBackground]}></View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setBgColor(style.grayBackground.backgroundColor)}>
							<View style={[colorCircle, style.grayBackground]}></View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								setBgColor(style.lightBlueBackground.backgroundColor)
							}>
							<View
								style={[colorCircle, style.lightBlueBackground]}></View>
						</TouchableOpacity>
					</View>
					<Text>Your color is: {bgColor}</Text>
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
