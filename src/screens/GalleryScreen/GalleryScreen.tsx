import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PhotoFile} from 'react-native-vision-camera';
import {hasAndroidPermission} from '../../permissions/hasAndroidPermission';
import {styles} from './styles';

export const GalleryScreen: React.FC = () => {
  const [photo, setPhoto] = useState<PhotoFile>();

  useEffect(() => {
    hasAndroidPermission();
  }, []);

  /**
   *
   * Returns a photo file from local storage and sets it in a local state, if it is not *null*
   */
  const getPhoto = async () => {
    try {
      const photoFromLocalStorage = await AsyncStorage.getItem('@photo_key');
      if (photoFromLocalStorage === null) {
        Alert.alert('No photo from local storage');
      } else {
        const photoJSON: PhotoFile = JSON.parse(photoFromLocalStorage);
        setPhoto(photoJSON);
        console.log(photoJSON);
      }
      //test console.log for debugging purposes.
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getPhoto();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{uri: 'file://' + photo?.path}} />
    </SafeAreaView>
  );
};
