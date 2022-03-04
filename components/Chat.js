import React, { useState, useEffect, useCallback } from 'react';
import { View, Platform, KeyboardAvoidingView, LogBox } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import ConnectedActions from './CustomActions';
import MapView from 'react-native-maps';
import {
	collection,
	onSnapshot,
	query,
	orderBy,
	addDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth, db } from './Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

LogBox.ignoreAllLogs();

export default function Chat({ route, navigation }) {
	const [messages, setMessages] = useState([]);
	const [user, setUser] = useState({});
	const [connection, setConnection] = useState(false);
	const { bgColor, name } = route.params;

	const getMessages = async () => {
		try {
			let messages = await AsyncStorage.getItem('messages');
			setMessages(messages !== null ? JSON.parse(messages) : []);
		} catch (err) {
			alert(err);
		}
	};

	const saveMessages = async () => {
		try {
			await AsyncStorage.setItem('messages', JSON.stringify(messages));
		} catch (err) {
			alert(err);
		}
	};

	useEffect(() => {
		navigation.setOptions({ title: name ? name : 'User' });
		NetInfo.fetch().then(async connection => {
			if (connection.isConnected === false) {
				setConnection(false);
				getMessages();
			} else {
				onAuthStateChanged(auth, async user => {
					!user && (await signInAnonymously(auth));
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
				text: doc.data().text || '',
				user: doc.data().user,
				image: doc.data().image || null,
				location: doc.data().location || null,
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
		return connection ? <InputToolbar {...props} /> : null;
	};

	const onSend = useCallback((messages = []) => {
		setMessages(prevMessages => GiftedChat.append(prevMessages, messages));
		const { _id, createdAt, text, user, image, location } = messages[0];
		addDoc(collection(db, 'messages'), {
			_id,
			text: text || '',
			createdAt,
			user,
			image: image || null,
			location: location || null,
		});
		saveMessages();
	}, []);

	const renderCustomActions = props => <ConnectedActions {...props} />;;

	const renderCustomView = ({currentMessage}) => {
    const {location} = currentMessage
		if (location) {
			const { latitude, longitude } = location;
			return (
				<MapView
					style={{ width: 225, height: 175, margin: 7 }}
					region={{
						latitude,
						longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
			);
		}
		return null;
	};

	const fixKeyboardView = () => {
		return Platform.OS === 'android' ? (
			<KeyboardAvoidingView behavior='height' />
		) : null;
	};

	return (
		<View style={{ flex: 1, backgroundColor: bgColor }}>
			<GiftedChat
				renderInputToolbar={renderInputToolbar}
				renderBubble={renderBubble}
				renderActions={renderCustomActions}
				renderCustomView={renderCustomView}
				showAvatarForEveryMessage={true}
				messages={messages}
				onSend={messages => onSend(messages)}
				user={{
					_id: user.uid,
					name: user.displayName,
					avatar: user.photoURL || 'https://placeimg.com/140/140/any',
				}}
			/>
			{fixKeyboardView}
		</View>
	);
}
