import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {HOME_ROUTE, CAMERA_ROUTE, GALLERY_ROUTE} from './src/routes/routes';
import {CameraScreen} from './src/screens/CameraScreen/';
import {GalleryScreen} from './src/screens/GalleryScreen';
import {HomeScreen} from './src/screens/HomeScreen';

export type RootStackParamList = {
  HomeScreen: undefined;
  CameraScreen: undefined;
  GalleryScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
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
          options={{headerShown: false, title: 'Take a picture! '}}
        />
        <Stack.Screen
          name={GALLERY_ROUTE}
          component={GalleryScreen}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
