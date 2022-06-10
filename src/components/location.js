import React, {useState, useEffect} from 'react';
import {Text, PermissionsAndroid, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {DefaultColorsText} from '../styles/styles';
const Location = ({remonterData, isRunning}) => {
  // const Location = ({ remonterData, isVisible }) => {
  const [position, setPosition] = useState(null);

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
        <Text></Text>
      </View>
    );
  } else {
    if (position) {
      return <DefaultColorsText>GPS ON!!!</DefaultColorsText>;
    } else {
      return <DefaultColorsText>GPS OFF</DefaultColorsText>;
    }
  }
};
export default Location;
