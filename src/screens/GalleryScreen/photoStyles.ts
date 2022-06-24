import {StyleSheet} from 'react-native';

export const photoStyles = StyleSheet.create({
  container: {
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
  flatlist: {
    width: '100%',
    height: '100%',
  },
  touchableOpacity: {
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
  viewStyle: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
  },
  dropdown: {
    height: 50,
    width: 200,
  },
});
