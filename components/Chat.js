import React, { useState, useEffect, useCallback } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default function Chat({ route, navigation }) {
	const [messages, setMessages] = useState([]);

  const { bgColor, name } = route.params;
	navigation.setOptions({ title: name });
	useEffect(() => {
		setMessages([
			{
				_id: 1,
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
      {
        _id: 2,
        text: `${name} has entered the chat`,
        createdAt: new Date(),
        system: true
      }
		]);
	}, []);

  const renderBubble = props => {
    return (
      < Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000'
        }
      }}
      />
    )
  }

	const onSend = useCallback((messages = []) => {
		setMessages(prevMessages => GiftedChat.append(prevMessages, messages));
	});

	return (
    <View style={{flex: 1, backgroundColor: bgColor}}>
    	<GiftedChat
      renderBubble={renderBubble}
			messages={messages}
			onSend={messages => onSend(messages)}
			user={{ _id: 1 }}
		/>
    {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height'/> : null}
    </View>
	);  
}
