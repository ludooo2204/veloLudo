import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  Button,
  UIManager,
  LayoutAnimation,
} from 'react-native';

import Orientation from 'react-native-orientation';
import KeepAwake from 'react-native-keep-awake';


if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const RunningScreen = ({navigation}) => {
  useEffect(() => {
    KeepAwake.activate();
    console.log('ne fait pas dodo!');
    Orientation.lockToLandscape();
  }, []);

  return (
     <Text>lolo!!!</Text>
  )
};

export default RunningScreen;
