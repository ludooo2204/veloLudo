import React from 'react';
import {Text, View} from 'react-native';
import Bpm from './heartrate';
const ActivationCardio = ({gpsReady}) => {
 const handleBpm=(e)=>{
     console.log(e)
 }
    return (

      <View style={{flex:1,borderWidth:3,borderColor:'black',justifyContent: 'center',alignItems: 'center',}}>
<Text>CARDIO</Text>
<Bpm
					style={{backgroundColor: 'red'}}
					remonterData={(e) => handleBpm(e)}
                    isVisible
					/>


  </View>)
}

export default ActivationCardio;