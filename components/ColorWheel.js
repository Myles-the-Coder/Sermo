import { View, Text, StyleSheet, LogBox } from 'react-native';
import React, {useEffect } from 'react';
import ColorPicker from 'react-native-wheel-color-picker';
import { useState } from 'react';

LogBox.ignoreLogs([
	'Non-serializable values were found in the navigation state',
]);

export default function ColorWheel({ route, navigation }) {
	useEffect(() => navigation.setOptions({ title: 'Color Wheel' }), []);

	const { setBgColor } = route.params;
	const [color, setColor] = useState('');
	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 26, textAlign: 'center' }}>
				Current background color is: {color}
			</Text>
			<View
				style={{ backgroundColor: color, width: '100%', height: 100 }}></View>
			<ColorPicker
				thumbSize={40}
				sliderSize={40}
				noSnap={true}
				row={false}
				onColorChange={color => {
					setBgColor(color);
					setColor(color);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		margin: 10,
		borderWidth: 3,
		borderRadius: 10,
		borderColor: 'lightgray',
	},
});
