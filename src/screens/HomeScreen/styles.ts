import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parentButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    top: 500,
    paddingLeft: 2,
    paddingRight: 2,
  },
  cameraIcon: {
    backgroundColor: 'gray',
    padding: 2,
    width: '2800%',
    height: 90,
    right: -80,
  },
  galleryIcon: {
    backgroundColor: 'gray',
    padding: 2,
    width: '3000%',
    height: 90,
    left: -160,
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
