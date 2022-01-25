import React, { useState, useEffect, useCallback } from 'react';
import { View, Platform, KeyboardAvoidingView, Text } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import {
	collection,
	onSnapshot,
	where,
	query,
	orderBy,
	addDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth, db } from './Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default function Chat({ route, navigation }) {
	const [messages, setMessages] = useState([]);
	const [user, setUser] = useState({});
	const [connection, setConnection] = useState(false);
	const { bgColor, name } = route.params;

	const getMessages = async () => {
		try {
			let messages = await AsyncStorage.getItem('messages');
			setMessages(messages !== null ? JSON.parse(messages) : []);
		} catch (error) {
			alert(error);
		}
	};

	const saveMessages = async () => {
		try {
			await AsyncStorage.setItem('messages', JSON.stringify(messages));
		} catch (error) {
			alert(error);
		}
	};

	const deleteMessages = async () => {
		try {
			await AsyncStorage.removeItem('messages');
			setMessages([]);
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		navigation.setOptions({ title: name });
		NetInfo.fetch().then(connection => {
			if (connection.isConnected === false) {
				setConnection(false);
				getMessages();
			} else {
				onAuthStateChanged(auth, async user => {
					if (!user) await signInAnonymously(auth);
					setUser(user);
					setMessages([]);
					setConnection(true);
				});
        saveMessages();

				const collectionRef = collection(db, 'messages');
				const q = query(collectionRef, orderBy('createdAt', 'desc'));
				const unsubscribe = onSnapshot(q, querySnapshot =>
					onCollectionUpdate(querySnapshot)
				);
				return unsubscribe;
			}
		});
	}, []);

	const onCollectionUpdate = querySnapshot => {
		setMessages(
			querySnapshot.docs.map(doc => ({
				_id: doc.data()._id,
				createdAt: doc.data().createdAt.toDate(),
				text: doc.data().text,
				user: doc.data().user,
			}))
		);
	};

	const renderBubble = props => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#00bfff',
					},
					left: {
						backgroundColor: 'lightgray',
					},
				}}
			/>
		);
	};

	const renderInputToolbar = props => {
		if (connection === false) {
		} else {
			return <InputToolbar {...props} />;
		}
	};

	const addMessage = () => {
		const { _id, createdAt, text, user} = messages[0];
		addDoc(collection(db, 'messages'), {
			_id,
			createdAt,
			text,
			user,
		});
	};

	const onSend = useCallback((messages = []) => {
		setMessages(prevMessages => GiftedChat.append(prevMessages, messages));
		addMessage();
		saveMessages();
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: bgColor }}>
			<Text style={{ color: '#fff', fontSize: 30, textAlign: 'center' }}>
				Connection is: {connection.toString()}
			</Text>
			<GiftedChat
				renderInputToolbar={renderInputToolbar}
				renderBubble={renderBubble}
				showAvatarForEveryMessage={true}
				messages={messages}
				onSend={messages => onSend(messages)}
				user={{
					_id: user.uid,
					name: user.displayName,
					avatar: 'https://placeimg.com/140/140/any',
				}}
			/>
			{Platform.OS === 'android' ? (
				<KeyboardAvoidingView behavior='height' />
			) : null}
		</View>
	);
}
