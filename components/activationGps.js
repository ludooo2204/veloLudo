import React from 'react';
import {Text, View} from 'react-native';
import Location from './location';
const ActivationGps = () => {
  const test=(o)=>{
      console.log("o",o)
  }
    return (
  <View>
    <Text>ActivationGps</Text>
    <Location remonterData={test} />
  </View>)
}

export default ActivationGps;
