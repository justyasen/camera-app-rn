import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  cameraView: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  takePictureBtn: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 15,
    bottom: 0,
    left: 50,
    right: 50,
    position: 'absolute',
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    alignItems: 'center',
  },
  safeAreaView: {
    alignItems: 'center',
    flex: 1,
  },
});
