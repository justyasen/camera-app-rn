import React, {useEffect} from 'react';
import {Alert, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

export const CameraScreen: React.FC = () => {
    return(
      <></>
    )

};


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
