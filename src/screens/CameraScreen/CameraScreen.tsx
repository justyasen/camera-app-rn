import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import {GALLERY_ROUTE} from '../../routes';
import {NavigationProps} from '../../types/NavigationProps';
import {styles} from './styles';

export const CameraScreen: React.FC = () => {
  //All variables for vision camera
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>();

  //values for async storage

  //States
  const [hasPermission, setHasPermission] = useState<Boolean>(false);

  const storeData = async (value: PhotoFile | undefined) => {
    try {
      const jsonValue: string | null = JSON.stringify(value);
      await AsyncStorage.setItem('@photo_key', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  //navigating to gallery
  const navigation = useNavigation<NavigationProps>();
  const navigateToGalleryScreen = () => navigation.navigate(GALLERY_ROUTE);

  //take a pic
  const takePicture = async () => {
    const photo: PhotoFile | undefined = await camera?.current?.takePhoto();
    storeData(photo);
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    setHasPermission(() => status === 'authorized');
  };

  if (device == null) {
    return <ActivityIndicator size="large" color="blue" />;
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Camera
        device={device}
        isActive={true}
        photo={true}
        style={styles.cameraView}
      />
      <TouchableOpacity
        style={styles.takePictureBtn}
        onPress={() => {
          takePicture();
          navigateToGalleryScreen();
        }}>
        <Text> Shoot </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
