import React, { useState, useEffect, useCallback } from 'react';
import { View, Platform, KeyboardAvoidingView, LogBox } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {
	collection,
	onSnapshot,
	where,
	query,
	orderBy,
	addDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, signInAnonymously} from 'firebase/auth';
import { auth, db } from './Firebase';

// LogBox.ignoreWarnings(['Setting a timer for a long period of time']);
export default function Chat({ route, navigation }) {
	const [messages, setMessages] = useState([]);
	const [uid, setUid] = useState(0);
	const [user, setUser] = useState({});

	const { bgColor, name } = route.params;
	navigation.setOptions({ title: name });

	useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (!user) await signInAnonymously(auth);
			setMessages([]);
			setUid(user.uid);
			setUser(user);
		});
    
    const collectionRef = collection(db, 'messages');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
		const unsubscribe = onSnapshot(q, querySnapshot => {
			setMessages(
				querySnapshot.docs.map(doc => ({
					_id: doc.data()._id,
					createdAt: doc.data().createdAt.toDate(),
					text: doc.data().text,
					user: doc.data().user,
				}))
			);
		});
		return unsubscribe;
	}, []);

	const renderBubble = props => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: 'blue',
					},
          left: {
            backgroundColor: 'lightgray',
          }
				}}
			/>
		);
	};

	const onSend = useCallback((messages = []) => {
		setMessages(prevMessages => GiftedChat.append(prevMessages, messages));
    const { _id, createdAt, text, user } = messages[0];
		addDoc(collection(db, 'messages'), {
			_id,
			createdAt,
			text,
			user,
		});
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: bgColor }}>
			<GiftedChat
				renderBubble={renderBubble}
        showAvatarForEveryMessage={true}
				messages={messages}
				onSend={messages => onSend(messages)}
				user={{
					_id: user.uid,
					name: user.displayName,
					avatar:'https://placeimg.com/140/140/any',
				}}
			/>
			{Platform.OS === 'android' ? (
				<KeyboardAvoidingView behavior='height' />
			) : null}
		</View>
	);
}
