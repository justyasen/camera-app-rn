import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Image, PermissionsAndroid, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';

//Async function returning whether user has given permission
async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export const GalleryScreen: React.FC = () => {
  const [imageURI, setImageURI] = useState<string>();

  useEffect(() => {
    hasAndroidPermission();
    getData();
  });

  const getData = async () => {
    try {
      const photoFromLocalStorage: string = await AsyncStorage.getItem(
        '@photo_key',
      );
      console.log('@photo_key', photoFromLocalStorage);
      if (photoFromLocalStorage !== null) {
        setImageURI(photoFromLocalStorage);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <Image style={styles.image} source={{uri: imageURI}} />
      </ScrollView>
    </SafeAreaView>
  );
};
