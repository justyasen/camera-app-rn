import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Button, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import {styles} from './styles';

export let photo: PhotoFile | undefined;

export const CameraScreen: React.FC = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>();

  const takePicture = async () => {
    photo = await camera?.current?.takePhoto({
      flash: 'auto',
      qualityPrioritization: 'quality',
    });
    setPictureHasBeenTaken(prevPictureTaken => !prevPictureTaken);
    console.warn(photo);
  };

  //useState to keep track of permissions and whether picture has been taken
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
    <SafeAreaView style={styles.safeAreaView}>
      <Camera
        device={device}
        isActive={true}
        photo={true}
        style={styles.cameraView}
      />
      <TouchableOpacity style={styles.takePictureBtn} onPress={takePicture}>
        <Text> Shoot </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
