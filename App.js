/**
 *
 *
 * @format
 * @flow strict-local
 */

/**TODO
 * 
 * 
-gerer la deconnexion bluetooth lors de l'arret de l'app (sinon redemarrage du tel)

 -revoir la connexion a ma montre
 
*/

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import Orientation from 'react-native-orientation';
import KeepAwake from 'react-native-keep-awake';
import 'react-native-gesture-handler';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import Location from './components/location';
import Bpm from './components/heartrate';
import LineChartScreen from './components/LineChartScreen';
import Save from './components/save';
import Home from './components/home';
import Main from './components/main';

import styles from './components/styles';

const Stack = createStackNavigator();

const App = () => {
  return (<>
<Toast ref={(ref) => Toast.setRef(ref)} />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      
        <Stack.Screen options={{headerShown: false}} name="Main" component={Main} />
        <Stack.Screen name="Home" component={Home} options={{title: 'Overview'}} />
        <Stack.Screen name="Save" component={Save} options={{title: 'gestion des parcours'}} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};



export default App;

