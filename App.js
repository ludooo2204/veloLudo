/**
 *
 *
 * @format
 * @flow strict-local
 */

/**TODO
 * 
 * - revoir listPosition avec la vitesse en plus. il faut creer un state position et y ajouter la vitesse
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
  const [positionTemporaire, setPositionTemporaire] = useState(null);
  const [lastPositionLatLong, setLastPositionLatLong] = useState([]);
  const [distance, setDistance] = useState(0);
  // let listPosition=[]
  useEffect(() => {
    console.log(
      '##############################################################',
    );
    let positionTemporaire2 = positionTemporaire;
    // positionTemporaire2.push()
    // console.log('positionTemporaire2');
    // console.log(positionTemporaire2);
    if (listPosition.length > 2) {
      console.log('distance a venir');
      console.log('listPosition[listPosition.length-1]');
      console.log(listPosition[listPosition.length - 1]);
      console.log('listPosition');
      console.log(listPosition);
      const actualLat = listPosition[listPosition.length - 1][3];
      const actualLong = listPosition[listPosition.length - 1][2];
      const lastLat = listPosition[listPosition.length - 2][3];
      const lastLong = listPosition[listPosition.length - 2][2];
      // console.log(lastLat,lastLong,actualLat,actualLong);
      const distanceFromlastPosition = getDistanceFromLatLonInMeter(
        lastLat,
        lastLong,
        actualLat,
        actualLong,
      );
      console.log('distanceFromlastPosition');
      console.log(distanceFromlastPosition);
      setDistance(distance + Math.round(distanceFromlastPosition));
      console.log('distance en m =', distance);
      // console.log(positionTemporaire2);
      positionTemporaire2.push(distance);
      console.log(positionTemporaire2);
      setPositionTemporaire(positionTemporaire2);
    }

    setListPosition((listPosition) => [...listPosition, positionTemporaire2]);
    //  console.log('listPosition nono');
    //  console.log(listPosition);
  }, [positionTemporaire]);

  const handleBpm = (lastBpm) => {
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
    position[4] = speed*3.6;

    setPositionTemporaire(position);
    // setLastPositionLatLong([latitude, longitude]);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black', color: 'white'}}>
      <StatusBar barStyle="dark-content" hidden />

      <Text style={{color: 'white', fontSize: 20}}>
        {'\n'}
        {/* {console.log('listPosition')} */}
        nbr de position = {listPosition.length}
        {'\n '}
        {}
        derniere position ={'\n '} {listPosition.length>2?(new Date(positionTemporaire[0]).toLocaleTimeString('fr-FR')):null}
        {'\n '}
        {listPosition.length>2?JSON.stringify(positionTemporaire[4]):null} km/h
        {'\n '}
        {listPosition.length>2?JSON.stringify(positionTemporaire[5]):null} en metre
        {/* lastPositionLatLong = {JSON.stringify(lastPositionLatLong)} */}
      </Text>
      <Save listBpm={listBpm} listPosition={listPosition} />
      {/* <Button title="testDistance" onPress={() => testDistance()} /> */}
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
  var d = R * c * 1000; // Distance in m
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
