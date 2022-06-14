import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import {checkCameraPermission} from '../../permissions/checkCameraPermission';
import {hasAndroidPermission} from '../../permissions/hasAndroidPermission';
import {GALLERY_ROUTE} from '../../routes';
import {NavigationProps} from '../../types/NavigationProps';
import {styles} from './styles';

export const CameraScreen: React.FC = () => {
  //All variables for Vision camera
  const devices = useCameraDevices();
  const cameraBackDevice = devices.back;
  const camera = useRef<Camera>(null);

  //Hooks
  const navigation = useNavigation<NavigationProps>();
  const navigateToGalleryScreen = () => navigation.navigate(GALLERY_ROUTE);
  //States
  const [photoID, setPhotoID] = useState('');

  //Commented out for debugging purposes

  // const checkCameraPermission = async () => {
  //   const status = await Camera.getCameraPermissio(use the commented out part) if status is not authorized alert or pop up againStatus();
  //   setHasPermission(() => status === 'authorized');
  // };
  useEffect(() => {
    checkCameraPermission();
    hasAndroidPermission();
  }, [camera]);

  const hasBackCamera =
    cameraBackDevice !== null && cameraBackDevice !== undefined;

  const makeKey = () => {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      let key =
        '' + possible.charAt(Math.floor(Math.random() * possible.length));
      setPhotoID(key);
    }
    console.log(photoID);
  };

  const storePhoto = async (photo: PhotoFile, _id: string) => {
    try {
      await AsyncStorage.setItem(
        '@photo_key',
        JSON.stringify({
          photoID: photoID,
          photo: photo,
        }),
      );
    } catch (e) {
      Alert.alert(
        'Storing Error',
        'Had problem storing photo, please contact technical support.',
      );
      console.warn(e);
      return photo;
    }
  };

  const takePhotoAndStoreIt = async () => {
    if (!camera || !camera.current) {
      Alert.alert('No active camera. ');
    } else {
      makeKey();
      const photo: PhotoFile = await camera.current.takePhoto();
      storePhoto(photo, photoID);
      console.log(photoID);
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      {!hasBackCamera && (
        <View>
          <Text>There are no camera devices.</Text>
        </View>
      )}
      {hasBackCamera && (
        <>
          <Camera
            ref={camera}
            device={cameraBackDevice}
            isActive
            photo
            style={styles.cameraView}
          />

          <TouchableOpacity
            style={styles.takePictureBtn}
            onPress={takePhotoAndStoreIt}>
            <Text> Shoot </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.galleryButton}
            onPress={navigateToGalleryScreen}>
            <Text> Gallery </Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};
