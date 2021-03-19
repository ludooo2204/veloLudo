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
    const {longitude, latitude} = lastPosition.coords;
    const timestamp = new Date(lastPosition.timestamp);
    altitude = Math.round(altitude * 100) / 100;
    speed = Math.round(speed * 10) / 10;

    let position = [];
    position[0] = timestamp;
    position[1] = altitude;
    position[2] = longitude;
    position[3] = latitude;
    position[4] = speed;
   
    if(listPosition.length>1){
      const lastLat = listPosition[listPosition.length - 1][3];
      const lastLong = listPosition[listPosition.length - 1][2];

      const distanceFromlastPosition = getDistanceFromLatLonInMeter(
        lastLat,
        lastLong,
        latitude,
        longitude,
      );
      position[5] = distanceFromlastPosition;
    }
    console.log('position');
    console.log(position);

    setListPosition((listPosition) => [...listPosition, position]);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black', color: 'white'}}>
      <StatusBar barStyle="dark-content" hidden />
      <Text style={{color: 'white',fontSize:40}}>Revoir la fin de parcours avec deplacement sur map pour le calul de la distance!</Text>
      <Text style={{color: 'white'}}>
        {'\n'}
        nbr de position = {listPosition.length}
        {'\n '}
        derniere poosition = {JSON.stringify(listPosition[listPosition.length-1])}
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

//helpers
function getDistanceFromLatLonInMeter(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c*1000; // Distance in m
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
