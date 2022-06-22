import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
    borderWidth: 1,
    borderColor: '#8C92AC',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  image: {
    height: 350,
    width: 350,
    resizeMode: 'contain', //so it can resize depending on device size
    justifyContent: 'space-between',
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
  },
});
