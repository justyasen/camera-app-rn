import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Video from 'react-native-video';
import {PhotoFile, VideoFile} from 'react-native-vision-camera';
import {hasAndroidPermission} from '../../permissions/hasAndroidPermission';
import {CAMERA_ROUTE} from '../../routes';
import {MediaTypes} from '../../types/MediaTypes';
import {NavigationProps} from '../../types/NavigationProps';
import {GENERIC_ERROR_MESSAGE} from '../../utils/error_messages/err_msgs';
import {photoKey} from '../../utils/global_variables/photoKey';
import {videoKey} from '../../utils/global_variables/videoKey';
import {noMediaStyles, onNullRender, photoStyles, videoStyles} from './styles';

export const GalleryScreen: React.FC = () => {
  //Hooks
  const navigation = useNavigation<NavigationProps>();
  const navigateToCameraScreen = () => navigation.navigate(CAMERA_ROUTE);

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
        Toast.show({
          type: 'error',
          text1: "There aren't any videos to show. Go take one! ",
        });
        return;
      }
      const videoArrayJSON: VideoFile[] = JSON.parse(
        videoArrayFromLocalStorage,
      );
      setVideoArrayState(videoArrayJSON);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: GENERIC_ERROR_MESSAGE,
      });
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
      Toast.show({
        text1: 'No videos to delete. ',
      });
      return;
    }
    const videoArrayAfterDeleted = videoArray.filter(
      video => video.path !== path,
    );
    setVideoArrayState(videoArrayAfterDeleted);
    if (videoArrayAfterDeleted.length === 0) {
      setVideoArrayState(undefined);
    }

    await AsyncStorage.setItem(videoKey, JSON.stringify(videoArray));
    Toast.show({
      type: 'success',
      text1: 'Video has been deleted successfully.',
    });
  };

  /**
   *
   * @param item is taken from FlatList and used to render video inside Video component.
   * @returns a Video component.
   */
  const renderVideo = ({item}: {item: VideoFile}) => (
    <TouchableOpacity
      style={videoStyles.containerVideo}
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
      Toast.show({
        text1: 'No photos to delete. ',
      });
      return;
    }
    const photoArrayAfterDeleted = photoArray.filter(
      photo => photo.path !== path,
    );
    setPhotoArrayState(photoArrayAfterDeleted);
    if (photoArrayAfterDeleted.length === 0) {
      setVideoArrayState(undefined);
      await AsyncStorage.removeItem(photoKey);
    }
    await AsyncStorage.setItem(photoKey, JSON.stringify(photoArray));
    Toast.show({
      type: 'success',
      text1: 'Photo has been deleted successfully.',
    });
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
        return;
      }

      const photoArrayJSON: PhotoFile[] = JSON.parse(
        photoArrayFromLocalStorage,
      );

      setPhotoArrayState(photoArrayJSON);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong, please try again later. ',
      });
    }
  };

  const renderPhoto = ({item}: {item: PhotoFile}) => (
    <TouchableOpacity
      style={photoStyles.containerPhoto}
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
    <SafeAreaView style={photoStyles.containerPhoto}>
      {photoArray === undefined && (
        <View style={noMediaStyles.viewStyle}>
          <Text style={noMediaStyles.mainText}>
            There are no photos to show. Take one to see it here!
          </Text>
          <TouchableOpacity
            onPress={navigateToCameraScreen}
            style={noMediaStyles.touchableOpacity}>
            <Text style={noMediaStyles.btnText}> Take a photo </Text>
          </TouchableOpacity>
        </View>
      )}
      {videoArray === undefined && (
        <Text>There are no videos to show. Take one to see it here!</Text>
      )}

      <View>
        <Picker
          mode="dropdown"
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
