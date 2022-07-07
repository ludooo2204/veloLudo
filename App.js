/**
 *
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';

import Orientation from 'react-native-orientation';
import KeepAwake from 'react-native-keep-awake';
import 'react-native-gesture-handler';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import Bpm from './src/components/heartrate';
import Save from './src/components/save';
import Home from './src/components/home';
import ChoixDuParcours from './src/components/ChoixDuParcours';
// import Main from './src/components/main';

const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <NavigationContainer>
        <StatusBar barStyle="dark-content" hidden />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Bpm"
            component={Bpm}
          />
          <Stack.Screen
            name="Save"
            component={Save}
            options={{title: 'gestion des parcours'}}
          />
          <Stack.Screen
            name="ChoixDuParcours"
            component={ChoixDuParcours}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
