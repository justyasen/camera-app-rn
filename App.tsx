import {LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {CAMERA_ROUTE, GALLERY_ROUTE, HOME_ROUTE} from './src/routes/routes';
import {CameraScreen} from './src/screens/CameraScreen/';
import {GalleryScreen} from './src/screens/GalleryScreen';
import {HomeScreen} from './src/screens/HomeScreen';
import Toast from 'react-native-toast-message';

export type RootStackParamList = {
  HomeScreen: undefined;
  CameraScreen: undefined;
  GalleryScreen: undefined;
};
//Ignoring warnings for ViewPropTypes
if (__DEV__) {
  const ignoreWarns = [
    'EventEmitter.removeListener',
    '[fuego-swr-keys-from-collection-path]',
    'Setting a timer for a long period of time',
    'ViewPropTypes will be removed from React Native',
    'AsyncStorage has been extracted from react-native',
    "exported from 'deprecated-react-native-prop-types'.",
    'Non-serializable values were found in the navigation state.',
    'VirtualizedLists should never be nested inside plain ScrollViews',
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].includes(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const clearAsyncStorage = async () => {
  AsyncStorage.clear();
};

const App = () => {
  useEffect(() => {
    return () => {
      clearAsyncStorage;
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={HOME_ROUTE}>
        <Stack.Screen
          name={HOME_ROUTE}
          component={HomeScreen}
          options={{
            headerShown: true,
            title: 'A picture is worth a thousand words! ',
          }}
        />
        <Stack.Screen
          name={CAMERA_ROUTE}
          component={CameraScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={GALLERY_ROUTE}
          component={GalleryScreen}
          options={{title: 'Gallery', headerShown: true}}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
