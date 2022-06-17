import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PhotoFile} from 'react-native-vision-camera';
import {hasAndroidPermission} from '../../permissions/hasAndroidPermission';
import {styles} from './styles';

export const GalleryScreen: React.FC = () => {
  //Hooks
  const [photoArray, setPhotoArrayState] = useState<PhotoFile[]>();

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
      setPhotoArrayState(undefined);
    } catch (err) {
      console.log(err);
    }
  };

  const onLongPress = () => {
    deletePhoto(index);
    Alert.alert('Selected photo has been deleted. ');
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
      }
    } catch (error) {
      Alert.alert('Something went wrong at GalleryScreen PhotoJSON');
      console.warn(error);
    }
  };

  // const renderedPhoto = ({photo}: PhotoFile) => {
  //   <TouchableOpacity onLongPress={onLongPress}>
  //     <Image style={styles.image} source={{uri: 'file://' + photo.path}} />
  //   </TouchableOpacity>;
  // };

  const renderItem = ({item}: any) => (
    <TouchableOpacity style={styles.container} onLongPress={onLongPress}>
      <Image style={styles.image} source={{uri: 'file://' + item.path}} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={photoArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};
