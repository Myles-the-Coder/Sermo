import React from 'react';
import { View, Text } from 'react-native';

export default function Chat({ route, navigation }) {
  const {bgColor, name} = route.params
	navigation.setOptions({ title: name });
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor}}>
			<Text>Example Text</Text>
		</View>
	);
}
