import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CAMERA_ROUTE, GALLERY_ROUTE} from '../../routes';
import {NavigationProps} from '../../types/NavigationProps';
import {Camera} from 'react-native-vision-camera';

import {styles} from './styles';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.parentButtons}>
        {/* Navigate to Camera */}
        <TouchableOpacity onPress={navigateToCameraScreen}>
          <ImageBackground
            style={styles.backgroundImageCamera}
            imageStyle={styles.imageStyle}
            source={require('../../img/camera_icon.png')}>
            <View>
              <Text style={styles.textInsideImage}> </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        {/* Navigate to Gallery */}
        <TouchableOpacity onPress={navigateToGalleryScreen}>
          <ImageBackground
            style={styles.backgroundImageGallery}
            imageStyle={styles.imageStyle}
            source={require('../../img/gallery_icon.png')}>
            <View>
              <Text style={styles.textInsideImage}> </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
