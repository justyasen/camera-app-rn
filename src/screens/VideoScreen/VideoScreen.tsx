import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {VideoFile} from 'react-native-vision-camera';
import {hasAndroidPermission} from '../../permissions/hasAndroidPermission';
import {videoKey} from '../../utils/global_variables/videoKey';
import {styles} from './styles';

export const VideoScreen: React.FC = () => {
  //Hooks
  const [videoArray, setVideoArrayState] = useState<VideoFile[]>();

  useEffect(() => {
    hasAndroidPermission();
  }, []);

  useEffect(() => {
    getVideo();
  }, []);

  const getVideo = async () => {
    try {
      const videoArrayFromLocalStorage = await AsyncStorage.getItem(videoKey);
      if (videoArrayFromLocalStorage === null) {
        Alert.alert('No videos from local storage');
      } else {
        const videoArrayJSON: VideoFile[] = JSON.parse(
          videoArrayFromLocalStorage,
        );
        setVideoArrayState(videoArrayJSON);
        console.log('Got video! ');
      }
    } catch (error) {
      Alert.alert('Something went wrong at VideoScreen VideoJSON');
      console.warn(error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.container}>
      <Video style={styles.video} source={{uri: item.path}} shouldPlay />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={videoArray} renderItem={renderItem} />
    </SafeAreaView>
  );
};
