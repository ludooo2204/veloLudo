/**
 *
 *
 * @format
 * @flow strict-local
 */

/**TODO
 - BUG kan montre + deplacement !!
-gerer la deconnexion bluetooth lors de l'arret de l'app (sinon redemarrage du tel)
 -ecran de veille a desactiver npm keepScreenawake
 -revoir la connexion a ma montre
 -lolo
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

import Location from './components/location';
import Bpm from './components/heartrate';
import LineChartScreen from './components/LineChartScreen';
import Save from './components/save';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './components/styles';

const App = () => {
  const [listBpm, setListBpm] = useState([]);
  const [listPosition, setListPosition] = useState([]);

  const handleBpm = (lastBpm) => {
    // console.log(lastBpm);
    const timestamp = new Date();
    let bpm = [];
    bpm[0] = timestamp;
    bpm[1] = lastBpm;
    console.log(bpm);
    setListBpm((listBpm) => [...listBpm, bpm]);
  };

  const handlePosition = (lastPosition) => {
    console.log('lastPosition from app');
    console.log('coords', lastPosition.coords);
    let {altitude, speed} = lastPosition.coords;
    altitude = Math.round(altitude * 100) / 100;
    speed = Math.round(speed * 10) / 10;

    const {longitude, latitude} = lastPosition.coords;
    console.log('timestamp', lastPosition.timestamp);
    const timestamp = new Date(lastPosition.timestamp);
    const timestamp2 = new Date(lastPosition.timestamp);
    console.log(typeof timestamp2);
    let position = [];
    position[0] = timestamp;
    position[1] = altitude;
    position[2] = longitude;
    position[3] = latitude;
    position[4] = speed;
    console.log('position');
    console.log(position);

    setListPosition((listPosition) => [...listPosition, position]);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black', color: 'white'}}>
      <StatusBar barStyle="dark-content" hidden />

      <Text style={{color: 'white'}}>
        {' '}
        nbr de position = {listPosition.length}
      </Text>
      <Save listBpm={listBpm} listPosition={listPosition} />

      <Location remonterData={(e) => handlePosition(e)} />

      <View style={{flex: 3}}>
        <LineChartScreen data={listBpm} />
      </View>

      <Bpm
        style={{backgroundColor: 'black'}}
        remonterData={(e) => handleBpm(e)}
      />
    </View>
  );
};

export default App;
