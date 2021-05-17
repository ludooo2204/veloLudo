import React from 'react';
import {Text, View} from 'react-native';
import Location from './location';
const ActivationGps = ({gpsReady}) => {
 
    return (

      <View style={{flex:1,borderWidth:3,borderColor:'black',justifyContent: 'center',alignItems: 'center',}}>
    <Location remonterData={gpsReady} />
  </View>)
}

export default ActivationGps;
