import { useState } from 'react';
import { View } from 'react-native';
import { Portal, Dialog, IconButton, Button, Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

import { styles } from '../utils/Styles';
import { theme } from '../utils/Themes';

export default function AvatarPicker(props) {
    const [picture, setPicture] = useState(null);
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    // camera & taking the picture
    const takePic = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.granted) {
            try {
                let result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.back,
                    allowsEditing: true,
                    aspect: [1, 1]
                });
                if (!result.canceled) {
                    await saveResult(result.assets[0].uri);
                }
            } catch (error) {
                alert('error: ' + error)
                setVisible(false);
            }
        } else {
            console.log('Give permission to take picture.');
        }
    };

    // choose a picture from phone's memory
    const choosePic = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted) {
            try {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1]
                });
                if (!result.canceled) {
                    await saveResult(result.assets[0].uri);
                }
            } catch (error) {
                alert('error: ' + error)
                setVisible(false);
            }
        } else {
            console.log('Give permission to take access images.');
        }
    };

    // set picture to state
    const saveResult = async (pic) => {
        try {
            setPicture(pic);
        } catch (error) {
            throw error;
        }
    };

    // save the picture to phone's library, in a dedicated folder
    const SaveToLibrary = async (picture) => {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
            try {
                const asset = await MediaLibrary.createAssetAsync(picture);
                MediaLibrary.createAlbumAsync('Plant-app', asset, false)
                .then( async () => {
                    await configureFilePath(asset.uri);
                    hideDialog();
                    setPicture(null);
                    console.log('img saved');
                });
            } catch (error) {
                console.log(error);
            }
        } else {
          console.log('Give permission to save the picture.');
        }
      };

    // adjust the file path to ensure the uri can be used when showing the picture
    const configureFilePath = async (picUri) => {
        try {
            uri = picUri.replace('DCIM', 'Pictures/Plant-app');
            const fileInfo = await FileSystem.getInfoAsync(uri);
            if (fileInfo.exists) {
                setPicture(uri);
                props.updateAvatar(uri, props.item.id)
            } else {
            console.error('File does not exist at the specified path');
            }
        } catch (error) {
            throw error;
        };
    };

    // set picture back to default
    const defaultPic = async () => {
        try {
            setPicture(null);
            props.updateAvatar(null, props.item.id)
            setVisible(false);
        } catch (error) {
            alert('error: ' + error)
            setVisible(false);
        }
    };

    return (
        <View style={styles.center}>
            <IconButton style={styles.avatarButton} icon='camera' mode='contained' onPress={showDialog}></IconButton>
            <Portal>
                <Dialog visible={visible} onDismiss={() => {hideDialog();setPicture(null)}}>
                    <View style={styles.center}>
                        <Avatar.Image size={200} source={picture ? { uri: picture } : props.item.avatar ? { uri: props.item.avatar } : require('../../assets/default.png')} />
                        <IconButton style={styles.avatarButton2} icon='delete' iconColor={theme.colors.error} mode='contained' onPress={() => {defaultPic()}}></IconButton>
                        <View>
                            <Button style={styles.button} mode='contained' onPress={() => {takePic()}}>Take Photo</Button>
                            <Button style={styles.button} mode='contained' onPress={() => {choosePic()}}>Gallery</Button>
                            <Button style={styles.button} mode='contained' onPress={() => {SaveToLibrary(picture)}}>Save</Button>
                        </View>
                    </View>
                </Dialog>
            </Portal>
        </View>
    );
};