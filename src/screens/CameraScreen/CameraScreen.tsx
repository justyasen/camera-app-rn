import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
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

  useEffect(() => {
    checkCameraPermission();
    hasAndroidPermission();
  }, [camera]);

  const hasBackCamera =
    cameraBackDevice !== null && cameraBackDevice !== undefined;

  // const storePhoto = async (photo: PhotoFile) => {
  //   try {
  //     await AsyncStorage.setItem('@photo_key', JSON.stringify(photo));
  //   } catch (e) {
  //     Alert.alert(
  //       'Storing Error',
  //       'Had problem storing photo, please contact technical support.',
  //     );
  //     console.warn(e);
  //   }
  // };

  const takePhotoAndStoreIt = async () => {
    if (!camera || !camera.current) {
      Alert.alert('No active camera. ');
    } else {
      const photo: PhotoFile = await camera.current.takePhoto();
      if (!photo) {
        Alert.alert('No photo @takePhotoAndStoreIt');
      } else {
        addMultiplePhotos(photo);
      }
    }
  };

  const addMultiplePhotos = async (photo: PhotoFile) => {
    const existingPhotoStringify = await AsyncStorage.getItem('@photo_key');

    const existingPhotos: PhotoFile[] = existingPhotoStringify
      ? JSON.parse(existingPhotoStringify)
      : [];

    if (existingPhotos) {
      existingPhotos.push(photo);
      await AsyncStorage.setItem('@photo_key', JSON.stringify(existingPhotos));
    } else {
      Alert.alert('No newPhoto @takePhotoAndStoreIt');
    }
  };

  // const addNewPhoto = async (photo, path) => {
  //   let existingPhotos = await getExistingPhotos();
  //   const updatedPhotos = [...existingPhotos, [photo, path]];
  //   console.log('Updated photos', updatedPhotos);
  //   await AsyncStorage.setItem('@following', JSON.stringify(updatedFollowers));
  // };

  // const getExistingPhotos = async () => {
  //   let existingPhotos = await AsyncStorage.getItem('@photo_key');
  //   console.log('existing photos', existingPhotos);
  //   if (existingPhotos) {
  //     JSON.parse(existingPhotos);
  //   }
  // };
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
