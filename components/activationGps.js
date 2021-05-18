import React from 'react';
import {Text, View} from 'react-native';
import Location from './location';
const ActivationGps = ({remonterData,isRunning}) => {
 
    return (

      // <View style={{flex:1,borderWidth:3,borderColor:'yellow',justifyContent: 'center',alignItems: 'center',}}>
    <Location remonterData={remonterData}  isRunning={isRunning}  />)
  // </View>)
}

export default ActivationGps;
