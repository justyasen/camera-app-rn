import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {CAMERA_ROUTE, GALLERY_ROUTE} from '../../routes';
import {NavigationProps} from '../../types/NavigationProps';

export const HomeScreen: React.FC = () => {
  //router
  const navigation = useNavigation<NavigationProps>();

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
