import React, {useEffect} from 'react';
import {Alert, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

export const CameraScreen: React.FC = () => {
  const checkCameraPermission = async () => {
    let status = await Camera.getCameraPermissionStatus();
    if (status !== 'authorized') {
      await Camera.requestCameraPermission();
      status = await Camera.getCameraPermissionStatus();
      if (status === 'denied') {
        Alert.alert(
          'You will not be able to scan if you do not allow camera access',
        );
      }
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const devices = useCameraDevices();
  const device = devices.back;
  return (
    <SafeAreaView>
      <>
        <Text> Camera Screen</Text>
      </>
    </SafeAreaView>
  );
};
