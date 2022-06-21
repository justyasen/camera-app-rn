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
import {photoKey} from '../../utils/global_variables/photoKey';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export const CameraScreen: React.FC = () => {
  //All variables for Vision camera
  const devices = useCameraDevices();
  const cameraBackDevice = devices.back;
  const camera = useRef<Camera>(null);
  const myIcon = <Icon name="rocket" size={30} color="#900" />;

  //Hooks
  const navigation = useNavigation<NavigationProps>();
  const navigateToGalleryScreen = () => navigation.navigate(GALLERY_ROUTE);

  useEffect(() => {
    checkCameraPermission();
    hasAndroidPermission();
  }, [camera]);

  const hasBackCamera =
    cameraBackDevice !== null && cameraBackDevice !== undefined;

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
    const existingPhotoStringify = await AsyncStorage.getItem(photoKey);

    let existingPhotos: PhotoFile[] = existingPhotoStringify
      ? JSON.parse(existingPhotoStringify)
      : [];

    if (existingPhotos) {
      existingPhotos.push(photo);
      await AsyncStorage.setItem(photoKey, JSON.stringify(existingPhotos));
    } else {
      Alert.alert('No newPhoto @takePhotoAndStoreIt');
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
            <Icon name="camera" size={30} color="#100" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.galleryButton}
            onPress={navigateToGalleryScreen}>
            <Icon name="photo" size={30} color="#100" />
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};
