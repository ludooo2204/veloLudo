import React, {useState} from 'react';
import {Text, View, Pressable, Modal} from 'react-native';
import Bpm from './heartrate';
import {useNavigation} from '@react-navigation/native';
const ActivationCardio = ({cardioReady,isModalVisible}) => {


  return (
	
    <View
      style={{
        flex: 1,
        borderWidth: 3,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
		<Bpm remonterData={(e)=>console.log("toto",e)}/>
      </View>
    </View>
  );
};

export default ActivationCardio;
