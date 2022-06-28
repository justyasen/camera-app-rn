import {StyleSheet} from 'react-native';

export const photoStyles = StyleSheet.create({
  containerPhoto: {
    flexDirection: 'column',
    margin: 5,
    borderWidth: 1,
    borderColor: '#8C92AC',
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  image: {
    height: 350,
    width: 350,
    resizeMode: 'contain', //so it can resize depending on device size
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 15,
    marginBottom: 14,
  },
  flatlistPhoto: {
    width: '100%',
    height: '100%',
  },
  touchableOpacityPhoto: {
    margin: 3,
    backgroundColor: '#fff',
    flex: 1.8,
  },
  videoText: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginBottom: 5,
    top: 5,
  },
  viewStylePhoto: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
  },
  dropdown: {
    flexDirection: 'column',
  },
});

export const videoStyles = StyleSheet.create({
  containerVideo: {
    flexDirection: 'row',
    margin: 5,
    borderWidth: 1,
    borderColor: '#8C92AC',
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  video: {
    height: 350,
    width: 450,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'stretch',
    marginLeft: 15,
    marginBottom: 14,
    marginRight: 0,
    flexDirection: 'row',
    marginTop: 10,
  },
  flatlistVideo: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
  },
  touchableOpacityVideo: {
    margin: 3,
    backgroundColor: '#fff',
    flex: 1.8,
  },
});

export const noMediaStyles = StyleSheet.create({
  mainText: {
    textAlign: 'center',
  },
  touchableOpacity: {
    alignItems: 'center',
  },
  btnText: {
    color: 'green',
  },
});
