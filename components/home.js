import React, {useState} from 'react';
import {Button, Text, StatusBar, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import ActivationGps from './activationGps';
import ActivationCardio from './activationCardio';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Bpm from './heartrate';
const Home = ({navigation}) => {
  const [isGpsReady, setIsGpsReady] = useState(false);
  const gpsReady = (e) => {
    console.log('gpsReady', e);
    setIsGpsReady(true);
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" hidden />
      <View style={{flex: 1}}>
        <Text>Bienvenue !</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, backgroundColor: isGpsReady ? 'green' : 'red'}}>
          <ActivationGps gpsReady={gpsReady} />
        </View>
        <View style={{flex: 1,backgroundColor:"purple"}}>
		<ActivationCardio/>
        </View>
       
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Pressable
          style={{
            borderRadius: 15,
            backgroundColor: 'yellow',
            padding: 10,
            borderWidth: 2,
            borderColor: 'grey',
          }}
		  onPress={()=>navigation.navigate('Main')}
		  >
          <Text>GO !!!</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
