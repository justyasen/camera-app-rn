import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  PhotoFile,
  useCameraDevices,
  VideoFile,
} from 'react-native-vision-camera';
import {checkCameraPermission} from '../../permissions/checkCameraPermission';
import {hasAndroidPermission} from '../../permissions/hasAndroidPermission';
import {GALLERY_ROUTE} from '../../routes';
import {NavigationProps} from '../../types/NavigationProps';
import {photoKey} from '../../utils/global_variables/photoKey';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {videoKey} from '../../utils/global_variables/videoKey';

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

  //START OF PHOTO FUNCTIONS
  const takePhotoAndStoreIt = async () => {
    if (!camera || !camera.current) {
      Alert.alert('No active camera. @takePhotoAndStoreIt');
    } else {
      const photo: PhotoFile = await camera.current.takePhoto({
        qualityPrioritization: 'speed',
      });
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
      Alert.alert('No newPhoto @addMultiplePhotos');
    }
  };
  //END OF PHOTO FUNCTIONS

  //START OF VIDEO FUNCTIONS
  const takeVideoAndStoreIt = () => {
    if (!camera || !camera.current) {
      Alert.alert('No active camera. @takeVideoAndStoreIt');
    } else {
      camera.current.startRecording({
        flash: 'off',
        onRecordingFinished: vid => {
          addMultipleVideos(vid);
          console.log(vid);
        },
        onRecordingError: error => console.error(error),
      });
      setTimeout(() => {
        camera.current?.stopRecording();
        console.log('Recording done');
      }, 3000);
    }
  };

  const addMultipleVideos = async (video: VideoFile) => {
    const existingVideosStringify = await AsyncStorage.getItem(videoKey);

    let existingVideos: VideoFile[] = existingVideosStringify
      ? JSON.parse(existingVideosStringify)
      : [];

    if (existingVideos) {
      existingVideos.push(video);
      await AsyncStorage.setItem(videoKey, JSON.stringify(existingVideos));
    } else {
      Alert.alert('No video @addMultipleVideos');
    }
  };
  //END OF VIDEO FUNCTIONS

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
            video
            style={styles.cameraView}
          />

          <TouchableOpacity
            style={styles.takePictureBtn}
            onLongPress={takeVideoAndStoreIt}
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
