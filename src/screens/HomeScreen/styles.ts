import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parentButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 15,
    top: 500,
  },
  backgroundImageCamera: {
    backgroundColor: 'gray',
    padding: 2,
    width: '390%',
    height: 90,
    right: 50,
  },
  backgroundImageGallery: {
    backgroundColor: 'gray',
    padding: 2,
    width: '350%',
    height: 90,
    left: -20,
  },
  imageStyle: {
    borderRadius: 0,
    backgroundColor: 'rgba(255,0,0,.6)',
    borderColor: 'white',
  },
  textInsideImage: {
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 15,
    color: 'black',
  },
});
