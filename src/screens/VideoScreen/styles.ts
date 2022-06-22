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
  video: {
    height: 350,
    width: 350,
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
});
