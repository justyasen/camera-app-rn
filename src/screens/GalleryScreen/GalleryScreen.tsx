import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PhotoFile} from 'react-native-vision-camera';
import {hasAndroidPermission} from '../../permissions/hasAndroidPermission';
import {styles} from './styles';

export const GalleryScreen: React.FC = () => {
  //Hooks
  const [photo, setPhoto] = useState<PhotoFile>();
  const [photoID, setPhotoID] = useState<string>('');

  useEffect(() => {
    hasAndroidPermission();
  }, []);

  useEffect(() => {
    getPhoto();
  }, []);
  const photoKey: string = '@photo_key';

  /**
   * Delete functionality for photos.
   * @param key photo key which is assigned when using setItem() in AsyncStorage.
   * Sets true in a stateful value to trigger a useEffect re-render.
   */
  const deletePhoto = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      setPhoto(undefined);
    } catch (err) {
      console.log(err);
    }
  };

  const onLongPress = () => {
    deletePhoto(photoKey);
    Alert.alert('Selected photo has been deleted. ');
  };

  /**
   *
   * Returns a photo file from local storage and sets it in a local state, if it is not *null*
   */
  const getPhoto = async () => {
    try {
      const photoFromLocalStorage = await AsyncStorage.getItem(photoKey);
      if (photoFromLocalStorage === null) {
        Alert.alert('No photo from local storage');
      } else {
        const photoJSON: PhotoFile = JSON.parse(photoFromLocalStorage).photo;
        const photoIDJSON = JSON.parse(photoFromLocalStorage).photoID;
        setPhoto(photoJSON);
        setPhotoID(photoIDJSON);
        console.log(photoIDJSON);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onLongPress={onLongPress}>
        <Image style={styles.image} source={{uri: 'file://' + photo?.path}} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
