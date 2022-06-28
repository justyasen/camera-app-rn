import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  PhotoFile,
  useCameraDevices,
  VideoFile,
} from 'react-native-vision-camera';
import {checkCameraPermission} from '../../permissions/checkCameraPermission';
import {hasAndroidPermission} from '../../permissions/hasAndroidPermission';
import {GALLERY_ROUTE} from '../../routes';
import {NavigationProps} from '../../types/NavigationProps';
import {photoKey} from '../../utils/global_variables/photoKey';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {videoKey} from '../../utils/global_variables/videoKey';
import Toast from 'react-native-toast-message';
import {GENERIC_ERROR_MESSAGE} from '../../utils/error_messages/err_msgs';
import {VideoIcon} from '../../types/VideoIcon';

export const CameraScreen: React.FC = () => {
  //All variables for Vision camera
  const devices = useCameraDevices();
  const cameraBackDevice = devices.back;
  const camera = useRef<Camera>(null);

  //State
  const [videoIcon, setVideoIcon] = useState<VideoIcon>('video-camera');
  const [isRecording, setIsRecording] = useState(false);

  //Hooks
  const navigation = useNavigation<NavigationProps>();
  const navigateToGalleryScreen = () => navigation.navigate(GALLERY_ROUTE);

  useEffect(() => {
    checkCameraPermission();
    hasAndroidPermission();
  }, [camera]);

  const hasBackCamera =
    cameraBackDevice !== null && cameraBackDevice !== undefined;

  //START OF PHOTO FUNCTIONS
  const takePhotoAndStoreIt = async () => {
    if (!camera || !camera.current) {
      Toast.show({
        type: 'error',
        text1: GENERIC_ERROR_MESSAGE,
      });
    } else {
      const photo: PhotoFile = await camera.current.takePhoto({
        qualityPrioritization: 'speed',
      });
      if (!photo) {
        Toast.show({
          type: 'warning',
          text1: 'Take a picture first! ',
        });
      } else {
        addMultiplePhotos(photo);
      }
    }
  };

  const addMultiplePhotos = async (photo: PhotoFile) => {
    const existingPhotoStringify = await AsyncStorage.getItem(photoKey);

    let existingPhotos: PhotoFile[] = existingPhotoStringify
      ? JSON.parse(existingPhotoStringify)
      : [];

    if (existingPhotos) {
      existingPhotos.push(photo);
      await AsyncStorage.setItem(photoKey, JSON.stringify(existingPhotos));
    } else {
      Toast.show({
        type: 'error',
        text1: GENERIC_ERROR_MESSAGE,
      });
      return;
    }
  };
  //END OF PHOTO FUNCTIONS

  //START OF VIDEO FUNCTIONS
  const takeVideoAndStoreIt = () => {
    if (!camera || !camera.current) {
      Toast.show({
        text1: 'No active camera. ',
        type: 'error',
      });
    } else {
      camera.current.startRecording({
        flash: 'off',
        onRecordingFinished: vid => {
          addMultipleVideos(vid);
        },
        onRecordingError: () => {
          Toast.show({
            type: 'error',
            text1: GENERIC_ERROR_MESSAGE,
          });
        },
      });

      if (videoIcon === 'video-camera') {
        setVideoIcon('stop-circle');
      } else {
        setVideoIcon('video-camera');
      }
      setIsRecording(true);
    }
  };

  const addMultipleVideos = async (video: VideoFile) => {
    const existingVideosStringify = await AsyncStorage.getItem(videoKey);

    let existingVideos: VideoFile[] = existingVideosStringify
      ? JSON.parse(existingVideosStringify)
      : [];

    if (existingVideos) {
      existingVideos.push(video);
      await AsyncStorage.setItem(videoKey, JSON.stringify(existingVideos));
    } else {
      Toast.show({
        type: 'error',
        text1: GENERIC_ERROR_MESSAGE,
      });
    }
  };

  const stopRecordingVideo = () => {
    if (!camera || !camera.current) {
      return;
    }
    camera.current.stopRecording();
    setVideoIcon('video-camera');
  };
  //END OF VIDEO FUNCTIONS
  return (
    <SafeAreaView style={styles.safeAreaView}>
      {!hasBackCamera && (
        <View>
          <Text>There are no camera devices.</Text>
        </View>
      )}
      {hasBackCamera && (
        <>
          <Camera
            ref={camera}
            device={cameraBackDevice}
            isActive
            photo
            video
            style={styles.cameraView}
          />

          <TouchableOpacity
            style={styles.takePictureBtn}
            onPress={takePhotoAndStoreIt}
            onLongPress={takeVideoAndStoreIt}>
            <Icon name="camera" size={30} color="#100" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.galleryButton}
            onPress={navigateToGalleryScreen}>
            <Icon name="photo" size={30} color="#100" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.videoButton}
            onPress={takeVideoAndStoreIt}>
            <Icon name={videoIcon} size={30} color="#100" />
          </TouchableOpacity>

          {isRecording && (
            <TouchableOpacity
              style={styles.stopButton}
              onPress={stopRecordingVideo}>
              <Icon name={videoIcon} size={30} color="#100" />
            </TouchableOpacity>
          )}
        </>
      )}
    </SafeAreaView>
  );
};
