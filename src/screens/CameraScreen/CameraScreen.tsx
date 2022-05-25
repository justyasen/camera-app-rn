import React, {useState} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {LoadingView} from 'react-native-loading-view';

export const CameraScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const devices = useCameraDevices();
  const device = devices.back;
  if (device == null) {
    return <LoadingView />;
  }
  return (
    <SafeAreaView>
      <>
        <Text> Camera Screen</Text>
      </>
    </SafeAreaView>
  );
};
