import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  cameraView: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  takePictureBtn: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    position: 'absolute',
    bottom: 0,
    opacity: 0.5,
    marginBottom: 10,
  },
  safeAreaView: {
    alignItems: 'center',
    flex: 1,
  },
  galleryButton: {
    width: 60,
    height: 60,
    right: 5,
    marginBottom: 10,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    position: 'absolute',
    bottom: 0,
    opacity: 0.5,
  },
});
