import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {checkCameraPermission} from '../../permissions/checkCameraPermission';
import {CAMERA_ROUTE, GALLERY_ROUTE} from '../../routes';
import {NavigationProps} from '../../types/NavigationProps';
import {styles} from './styles';

export const HomeScreen: React.FC = () => {
  //Navigation and where it's used
  const navigation = useNavigation<NavigationProps>();
  const navigateToCameraScreen = () => navigation.navigate(CAMERA_ROUTE);
  const navigateToGalleryScreen = () => navigation.navigate(GALLERY_ROUTE);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.parentButtons}>
        <TouchableOpacity onPress={navigateToCameraScreen}>
          <Image
            style={styles.cameraIcon}
            source={require('../../img/camera_icon.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToGalleryScreen}>
          <Image
            style={styles.galleryIcon}
            source={require('../../img/gallery_icon.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
