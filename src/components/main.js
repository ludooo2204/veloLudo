/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
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
import 'react-native-gesture-handler';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getDistanceFromLatLonInMeter, deg2rad} from './helpers';
import Location from './location';
import Bpm from './heartrate';
import LineChartScreen from './LineChartScreen';
import Save from './save';

import styles from './styles';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Main = ({navigation}) => {
  const [listBpm, setListBpm] = useState([]);
  const [listPosition, setListPosition] = useState([]);
  const [positionTemporaire, setPositionTemporaire] = useState(null);
  const [lastPositionLatLong, setLastPositionLatLong] = useState([]);
  const [distance, setDistance] = useState(0);
  const [isMenuBpmVisible, setIsMenuBpmVisible] = useState(true);
  const [isMenuLocationVisible, setIsMenuLocationVisible] = useState(true);
  useEffect(() => {
    KeepAwake.activate();
    console.log('ne fait pas dodo!');
    Orientation.lockToLandscape();
  }, []);
  // let listPosition=[]
  useEffect(() => {
    console.log(
      '#########################useEffect#####################################',
    );
    let positionTemporaire2 = JSON.parse(JSON.stringify(positionTemporaire));

    if (listPosition.length > 2) {
      const actualLat = listPosition[listPosition.length - 1][3];
      const actualLong = listPosition[listPosition.length - 1][2];
      const lastLat = listPosition[listPosition.length - 2][3];
      const lastLong = listPosition[listPosition.length - 2][2];
      const distanceFromlastPosition = getDistanceFromLatLonInMeter(
        lastLat,
        lastLong,
        actualLat,
        actualLong,
      );

      setDistance(distance + Math.round(distanceFromlastPosition));
      console.log(
        'distance depuis la derniere fois en m =',
        distanceFromlastPosition,
      );
      positionTemporaire2.push(distance);
      // setPositionTemporaire(positionTemporaire2);
    }

    setListPosition((listPosition) => [...listPosition, positionTemporaire2]);
  }, [positionTemporaire]);

  console.log('coucou');
  console.log('coucou');
  console.log('coucou');
  console.log('coucou');
  console.log('coucou');
  console.log('coucou');
  console.log('coucou');
  console.log('coucou');

  const handleBpm = (lastBpm) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setIsMenuBpmVisible(!isMenuBpmVisible);
    const timestamp = new Date();
    let bpm = [];
    bpm[0] = timestamp;
    bpm[1] = lastBpm;
    console.log(bpm);
    setListBpm((listBpm) => [...listBpm, bpm]);
  };
  const collapseMenuBpm = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setIsMenuBpmVisible(!isMenuBpmVisible);
  };

  const handlePosition = (lastPosition) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setIsMenuLocationVisible(!isMenuLocationVisible);
    console.log('lastPosition from app');
    console.log('coords', lastPosition.coords);
    let {altitude, speed} = lastPosition.coords;
    const {longitude, latitude} = lastPosition.coords;
    const timestamp = new Date(lastPosition.timestamp);
    altitude = Math.round(altitude * 100) / 100;
    speed = Math.round(speed * 36) / 10;

    // let position = [timestamp, altitude, longitude, latitude, speed];
    // position[0] = timestamp;
    // position[1] = altitude;
    // position[2] = longitude;
    // position[3] = latitude;
    // position[4] = speed;

    setPositionTemporaire([timestamp, altitude, longitude, latitude, speed]);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'red',
        color: 'white',
      }}>
      <StatusBar barStyle="dark-content" hidden />
      <View style={{flex: 2, flexDirection: 'column'}}>
        <Text style={styles.indicationText}>
          nbr de position = {listPosition.length}
        </Text>
        <Text style={[styles.indicationText, styles.kmhText]}>
          {listPosition.length > 3
            ? JSON.stringify(listPosition[listPosition.length - 1][4])
            : null}
          km/h
        </Text>
        <Text style={styles.indicationText}>{distance} en metre</Text>
        <Text style={styles.indicationText}>
          {listPosition.length > 3
            ? JSON.stringify(listPosition[listPosition.length - 1][1])
            : null}
          m
        </Text>
        {listBpm.length > 1 && (
          <Text style={{color: 'white', textAlign: 'center', fontSize: 30}}>
            BPM ={listBpm[listBpm.length - 1][1]}
          </Text>
        )}
        <Button
          title="Fin du parcouuuuurs"
          onPress={() =>
            navigation.navigate('Save', {
              listBpm: listBpm,
              listPosition: listPosition,
            })
          }
        />
      </View>

      <View style={{flex: 2, flexDirection: 'column'}}>
        {!isMenuBpmVisible && (
          <View style={{flex: 2, backgroundColor: 'grey'}}>
            <LineChartScreen data={listBpm} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Main;
