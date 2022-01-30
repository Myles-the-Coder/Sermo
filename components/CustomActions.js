import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { storage } from './Firebase';

class CustomActions extends React.Component {
	pickImage = async () => {
		const permission = await ImagePicker.getMediaLibraryPermissionsAsync();
		try {
			if (permission) {
				let result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
				}).catch(err => console.log(err));
				if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl });
        } 
			}
		} catch (err) {
			console.log(err);
		}
	};

	takePhoto = async () => {
    const permission = ImagePicker.getCameraPermissionsAsync()
    try {
			if (permission) {
				let result = await ImagePicker.launchCameraAsync();
				if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl });
        }
			}
		} catch (err) {
			console.log(err);
		}
	};

	sendImage = async result => {
		try {
			if (result && !result.cancelled) {
				const imageUrl = await this.uploadImageFetch(result.uri);
				this.props.onSend({ image: imageUrl });
			}
		} catch (err) {
			console.log(err);
		}
	};

	getLocation = async () => {
		try {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status === 'granted') {
				let location = await Location.getCurrentPositionAsync({}).catch(err =>
					console.log(err)
				);
				const { longitude, latitude } = location.coords;
				console.log(longitude, latitude);
				location &&
					this.props.onSend({
						location: {
							longitude,
							latitude,
						},
					});
			}
		} catch (err) {
			console.log(err);
		}
	};

	uploadImageFetch = async uri => {
		const blob = await new Promise((res, rej) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = () => res(xhr.response);
			xhr.onerror = e => {
				console.log(e);
				rej(new TypeError('Network request failed'));
			};
			xhr.responseType = 'blob';
			xhr.open('GET', uri, true);
			xhr.send(null);
		});

		const imageNameBefore = uri.split('/');
		const imageName = imageNameBefore[imageNameBefore.length - 1];
    
		const storageRef = ref(storage, `images/${imageName}`);
		await uploadBytes(storageRef, blob)
		blob.close();

		return await getDownloadURL(storageRef).then(url => url)
	};

	onActionPress = () => {
		const options = [
			'Choose from Library',
			'Take Picture',
			'Send Location',
			'Cancel',
		];
		const cancelBtnIndex = options.length - 1;
		this.props.showActionSheetWithOptions(
			{
				options,
				cancelBtnIndex,
			},
			async buttonIndex => {
				switch (buttonIndex) {
					case 0:
						return this.pickImage();
					case 1:
						return this.takePhoto();
					case 2:
						return this.getLocation();
					default:
				}
			}
		);
	};

	render() {
		return (
			<TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
				<View style={[styles.wrapper]}>
					<Text style={[styles.iconText]}>+</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const ConnectedActions = connectActionSheet(CustomActions);
export default ConnectedActions;

const styles = StyleSheet.create({
	container: {
		width: 26,
		height: 26,
		marginLeft: 10,
		marginBottom: 10,
	},
	wrapper: {
		borderRadius: 13,
		borderColor: '#b2b2b2',
		borderWidth: 2,
		flex: 1,
	},
	iconText: {
		color: '#b2b2b2',
		fontWeight: 'bold',
		fontSize: 16,
		backgroundColor: 'transparent',
		textAlign: 'center',
	},
});
