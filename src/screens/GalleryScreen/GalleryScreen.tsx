import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {PhotoFile, VideoFile} from 'react-native-vision-camera';
import {hasAndroidPermission} from '../../permissions/hasAndroidPermission';
import {MediaTypes} from '../../types/MediaTypes';
import {photoKey} from '../../utils/global_variables/photoKey';
import {videoKey} from '../../utils/global_variables/videoKey';
import {photoStyles} from './photoStyles';
import {videoStyles} from './videoStyles';

export const GalleryScreen: React.FC = () => {
  //Hooks

  //States
  const [isMediaPhoto, setIsMediaPhoto] = useState<boolean>(true);
  const [photoArray, setPhotoArrayState] = useState<PhotoFile[]>();
  const [videoArray, setVideoArrayState] = useState<VideoFile[]>();
  const [pickerState, setPickerState] = useState<MediaTypes>('photo');

  //useEffects
  useEffect(() => {
    hasAndroidPermission();
  }, []);

  useEffect(() => {
    getPhoto();
    getVideo();
  }, []);

  //Video functions

  /**
   *
   * Returns a video file from local storage and sets it in a local state, if it is not ***null***
   */
  const getVideo = async () => {
    try {
      const videoArrayFromLocalStorage = await AsyncStorage.getItem(videoKey);
      if (videoArrayFromLocalStorage === null) {
        Alert.alert('No videos from local storage');
        return;
      }
      const videoArrayJSON: VideoFile[] = JSON.parse(
        videoArrayFromLocalStorage,
      );
      setVideoArrayState(videoArrayJSON);
    } catch (error) {
      Alert.alert('Something went wrong at VideoScreen VideoJSON');
      console.warn(error);
    }
  };

  /**
   *
   * @param path Takes in parameter path and uses that to delete the video which the user selected.
   *
   *
   * Creates new array and sets that in state to be used
   */
  const deleteSelectedVideo = async (path: string) => {
    if (videoArray === undefined) {
      Alert.alert('No videos @deleteSelectedPhoto');
      return;
    }
    const videoArrayAfterDeleted = videoArray.filter(
      video => video.path !== path,
    );
    setVideoArrayState(videoArrayAfterDeleted);

    await AsyncStorage.setItem(videoKey, JSON.stringify(videoArray));
    Alert.alert('Deleted video.');
  };

  /**
   *
   * @param item is taken from FlatList and used to render video inside Video component.
   * @returns a Video component.
   */
  const renderVideo = ({item}: any) => (
    <TouchableOpacity
      style={videoStyles.container}
      onLongPress={() => {
        deleteSelectedVideo(item.path);
      }}>
      <Video style={videoStyles.video} source={{uri: item.path}} />
    </TouchableOpacity>
  );

  //END OF VIDEO FUNCTIONS

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
      return;
    }
    const photoArrayAfterDeleted = photoArray.filter(
      photo => photo.path !== path,
    );
    setPhotoArrayState(photoArrayAfterDeleted);
    await AsyncStorage.setItem(photoKey, JSON.stringify(photoArray));
    Alert.alert('Deleted selected photo.');
  };

  /**
   *
   * Returns a photo file from local storage and sets it in a local state, if it is not *null*
   */
  const getPhoto = async () => {
    try {
      const photoArrayFromLocalStorage = await AsyncStorage.getItem(photoKey);
      //Guard
      if (photoArrayFromLocalStorage === null) {
        Alert.alert('No photos from local storage');
        return;
      }

      const photoArrayJSON: PhotoFile[] = JSON.parse(
        photoArrayFromLocalStorage,
      );

      setPhotoArrayState(photoArrayJSON);
    } catch (error) {
      Alert.alert('Something went wrong at GalleryScreen PhotoJSON');
      console.error(error);
    }
  };

  const renderPhoto = ({item}: any) => (
    <TouchableOpacity
      style={photoStyles.container}
      onLongPress={() => {
        deleteSelectedPhoto(item.path);
      }}>
      <Image style={photoStyles.image} source={{uri: 'file://' + item.path}} />
    </TouchableOpacity>
  );

  const onValueChange = () => {
    setIsMediaPhoto(isPhotoCurr => !isPhotoCurr);
    if (pickerState === 'photo') {
      setPickerState('video');
    } else {
      setPickerState('photo');
    }
  };

  return (
    <SafeAreaView style={photoStyles.container}>
      <View style={photoStyles.viewStyle}>
        <Picker
          style={photoStyles.dropdown}
          selectedValue={pickerState}
          onValueChange={onValueChange}>
          <Picker.Item label="Photos" value="photo" />
          <Picker.Item label="Videos" value="video" />
        </Picker>
      </View>
      {isMediaPhoto && <FlatList data={photoArray} renderItem={renderPhoto} />}
      {!isMediaPhoto && <FlatList data={videoArray} renderItem={renderVideo} />}
    </SafeAreaView>
  );
};
