import React, {useState, useEffect} from 'react';
import {Button, Text, PermissionsAndroid, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Bpm from './heartrate';
import styles from './styles';
const Location = ({remonterData, isRunning}) => {
  // const Location = ({ remonterData, isVisible }) => {
  const [position, setPosition] = useState(null);
  // const [errors, setErrors] = useState(null);
  // const [time, setTime] = useState(null);
  // const [gpsRunning, setGpsRunning] = useState(false);

  const granted = PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  useEffect(() => {
    console.log('lancement du GPS');

    Geolocation.watchPosition(
      (positionI) => {
        setPosition(positionI);
        remonterData(positionI);
      },
      (error) => {
        // See error code charts below.
        console.log('errors');
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 5,
        interval: 2000,
        fastestInterval: 1900,
      }, // timeout: 15000, maximumAge: 10000 }
    );
    return () => {};
  }, []);

  if (isRunning) {
    return (
      <View>
        <Text>z</Text>
      </View>
    )
  } else {
    if (position) {
      return (
        <Text
          style={{
            fontSize: 50,
          }}>
          GPS ON!!!
        </Text>
      );
    } else {
      return (
        <Text
          style={{
            fontSize: 50,
          }}>
          GPS OFF
        </Text>
      );
    }
  }
};
export default Location;
