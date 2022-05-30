import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Alert, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {CAMERA_ROUTE, GALLERY_ROUTE} from '../../routes';
import {NavigationProps} from '../../types/NavigationProps';
import {Camera} from 'react-native-vision-camera';

export const HomeScreen: React.FC = () => {
  //router
  const navigation = useNavigation<NavigationProps>();

  const checkCameraPermission = async () => {
    let status = await Camera.getCameraPermissionStatus();
    if (status !== 'authorized') {
      await Camera.requestCameraPermission();
      status = await Camera.getCameraPermissionStatus();
      if (status === 'denied') {
        Alert.alert(
          'You cannot take a picture if you do not allow camera use. ',
        );
      }
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const navigateToCameraScreen = () => navigation.navigate(CAMERA_ROUTE);
  const navigateToGalleryScreen = () => navigation.navigate(GALLERY_ROUTE);
  return (
    <SafeAreaView>
      <>
        {/* Navigate to Camera */}
        <TouchableOpacity onPress={navigateToCameraScreen}>
          <Text> Camera </Text>
        </TouchableOpacity>
        {/* Navigate to Gallery */}
        <TouchableOpacity onPress={navigateToGalleryScreen}>
          <Text> Gallery </Text>
        </TouchableOpacity>
      </>
    </SafeAreaView>
  );
};
