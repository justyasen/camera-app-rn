import React, {useEffect, useState} from 'react';
import {Alert, Text, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevices,
  useCameraFormat,
} from 'react-native-vision-camera';

export const CameraScreen: React.FC = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const takePicture = async () => {
    const photo = await camera.current.takePhoto({
      flash: 'auto',
    });
  };

  //useState to keep track of permissions
  const [hasPermission, setHasPermission] = useState(false);
  const [pictureTaken, setPictureHasBeenTaken] = useState(false);

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
    <SafeAreaView>
      <>
        <Camera device={device} isActive={true} audio={false} photo={true} />
      </>
    </SafeAreaView>
  );
};
