import {Alert} from 'react-native';
import {Camera} from 'react-native-vision-camera';

/**
 * Checks whether user has granted camera permissions to VisionCamera.
 */
export const checkCameraPermission = async () => {
  let status = await Camera.getCameraPermissionStatus();
  if (status !== 'authorized') {
    await Camera.requestCameraPermission();
    status = await Camera.getCameraPermissionStatus();
    if (status === 'denied') {
      Alert.alert('You cannot take a picture if you do not allow camera use. ');
      await Camera.requestCameraPermission();
    }
  }
  return status;
};
