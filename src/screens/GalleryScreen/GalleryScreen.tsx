import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PhotoFile} from 'react-native-vision-camera';
import {hasAndroidPermission} from '../../permissions/hasAndroidPermission';
import {styles} from './styles';
import {photoKey} from '../../utils/global_variables/photoKey';

export const GalleryScreen: React.FC = () => {
  //Hooks
  const [photoArray, setPhotoArrayState] = useState<PhotoFile[]>();

  useEffect(() => {
    hasAndroidPermission();
  }, []);

  useEffect(() => {
    getPhoto();
  }, []);

  /**
   *
   * @param path Takes in parameter path from photo in order to delete only photo which user pressed
   *
   * Filters array based on what picture user has pressed and creates a new array with the photos that have not been deleted.
   * Sets that array to ***state*** and in ***AsyncStorage***.
   */
  const deleteSelectedPhoto = async (path: string) => {
    if (photoArray === undefined) {
      Alert.alert('No photos @deleteSelectedPhoto');
      return undefined;
    }
    const photoArrayAfterDeleted = photoArray.filter(
      photo => photo.path !== path,
    );
    setPhotoArrayState(photoArrayAfterDeleted);
    await AsyncStorage.setItem(photoKey, JSON.stringify(photoArray));
  };

  /**
   *
   * Returns a photo file from local storage and sets it in a local state, if it is not *null*
   */
  const getPhoto = async () => {
    try {
      const photoArrayFromLocalStorage = await AsyncStorage.getItem(photoKey);
      if (photoArrayFromLocalStorage === null) {
        Alert.alert('No photos from local storage');
      } else {
        const photoArrayJSON: PhotoFile[] = JSON.parse(
          photoArrayFromLocalStorage,
        );
        setPhotoArrayState(photoArrayJSON);
        console.log('Got photo! ');
      }
    } catch (error) {
      Alert.alert('Something went wrong at GalleryScreen PhotoJSON');
      console.warn(error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => {
        deleteSelectedPhoto(item.path);
        Alert.alert('Photo deleted');
      }}>
      <Image style={styles.image} source={{uri: 'file://' + item.path}} />
    </TouchableOpacity>
  );

  if (photoArray) {
    if (photoArray.length < 1) {
      <Text>Your gallery is currently empty! </Text>;
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={photoArray} renderItem={renderItem} />
    </SafeAreaView>
  );
};
