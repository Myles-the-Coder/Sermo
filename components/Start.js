import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	Image,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';

export default function Start({ navigation }) {
	const [name, setName] = useState('');
	const [bgColor, setBgColor] = useState('');
	const [greeting, setGreeting] = useState('');
	const {
		outerContainer,
		innerContainer,
		textInput,
		text,
		img,
		button,
		bgBtn,
		chatBtn,
    btnText
	} = style;

  useEffect(() => {
    greetingMessage()
  }, []);
  

	const greetingMessage = () => {
		const today = new Date();
		const currentHour = today.getHours();

		setGreeting(
			currentHour < 12
				? 'Good Morning'
				: currentHour < 18
				? 'Good Afternoon'
				: 'Good Evening'
		);
	};

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
					{name ? <Text style={text}>{greeting}, {name}</Text> : null}
					<TouchableOpacity
						style={[button, bgBtn]}
						onPress={() =>
							navigation.navigate('ColorWheel', { bgColor, setBgColor })
						}>
						<Text
							style={btnText}>
							Choose Background Color
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[button, chatBtn]}
						onPress={() => navigation.navigate('Chat', { name, bgColor })}>
						<Text
							style={btnText}>
							Enter Chat
						</Text>
					</TouchableOpacity>
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
	button: {
		margin: 10,
		padding: 15,
		borderRadius: 5,
	},
	bgBtn: {
		backgroundColor: '#072A6C',
	},
	chatBtn: {
		backgroundColor: 'skyblue',
	},
  btnText: {
    color: 'whitesmoke', fontSize: 15, fontWeight: 'bold'
  }
});
