import {StyleSheet} from 'react-native';

export const videoStyles = StyleSheet.create({
  container: {
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
  flatlist: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
  },
  touchableOpacity: {
    margin: 3,
    backgroundColor: '#fff',
    flex: 1.8,
  },
});
