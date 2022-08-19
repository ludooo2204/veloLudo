/**
 *
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';

import Orientation from 'react-native-orientation';
import KeepAwake from 'react-native-keep-awake';
import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Bpm from './src/components/heartrate';
import Save from './src/components/save';
import Home from './src/components/home';
import ChoixDuParcours from './src/components/ChoixDuParcours';
// import Main from './src/components/main';
import store from './src/store/store';
import { Provider } from 'react-redux';
import Analyse from './src/components/Analyse';

const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" hidden />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Bpm"
            component={Bpm}
          />
          <Stack.Screen
            name="Save"
            component={Save}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChoixDuParcours"
            component={ChoixDuParcours}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Analyse"
            component={Analyse}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
