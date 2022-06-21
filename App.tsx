import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {CAMERA_ROUTE, GALLERY_ROUTE, HOME_ROUTE} from './src/routes/routes';
import {CameraScreen} from './src/screens/CameraScreen/';
import {GalleryScreen} from './src/screens/GalleryScreen';
import {HomeScreen} from './src/screens/HomeScreen';

export type RootStackParamList = {
  HomeScreen: undefined;
  CameraScreen: undefined;
  GalleryScreen: undefined;
};

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
      <Stack.Navigator initialRouteName={CAMERA_ROUTE}>
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
          options={{headerTransparent: false, title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
