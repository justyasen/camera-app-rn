import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import {GALLERY_ROUTE} from '../../routes';
import {NavigationProps} from '../../types/NavigationProps';
import {styles} from './styles';
import {checkCameraPermission} from '../../permissions/checkCameraPermission';
import {hasAndroidPermission} from '../../permissions/hasAndroidPermission';

//да се запазват снимките в масив или нещо подобно, оправи черния екран в камера екрана като се върнеш в него(най-вероятно edge case) някакъв cleanup (може в app.tsx да се чистят снимките от AsyncStorage)
//статуса да ползвам от закоментираната част по надолу да се показва някакво съобщение или пак да се показва рекуест за пермишъни
export const CameraScreen: React.FC = () => {
  //All variables for Vision camera
  const devices = useCameraDevices();
  const cameraBackDevice = devices.back;
  const camera = useRef<Camera>(null);

  //Hooks
  const navigation = useNavigation<NavigationProps>();
  const navigateToGalleryScreen = () => navigation.navigate(GALLERY_ROUTE);

  //Commented out for debugging purposes
  // //States
  // const [hasPermission, setHasPermission] = useState<Boolean>(false);

  // useEffect(() => {
  //   checkCameraPermission();
  // }, []);

  // const checkCameraPermission = async () => {
  //   const status = await Camera.getCameraPermissionStatus();
  //   setHasPermission(() => status === 'authorized');
  // };
  useEffect(() => {
    checkCameraPermission();
    hasAndroidPermission();
  }, [camera]);

  const hasBackCamera =
    cameraBackDevice !== null && cameraBackDevice !== undefined;

  const storePhoto = async (photo: PhotoFile) => {
    try {
      const photoJSON: string = JSON.stringify(photo);
      await AsyncStorage.setItem('@photo_key', photoJSON);
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
      const photo: PhotoFile = await camera.current.takePhoto();
      storePhoto(photo);
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
