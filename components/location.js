import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import styles from './styles';
const Location = ({remonterData}) => {
  const [position, setPosition] = useState(null);
  const [errors, setErrors] = useState(null);
  const [time, setTime] = useState(null);



  useEffect(() => {

    Geolocation.watchPosition(
      (positionI) => {
        console.log('positionI');
        console.log(positionI);
        console.log('positionI.coords');
        console.log(positionI.coords);
        let time = new Date(positionI.timestamp).toLocaleTimeString('FR-fr');
        setTime(time)
        setPosition(positionI)
        remonterData(positionI)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
        setErrors(error.message)
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 2000,
        fastestInterval: 2000,
      }, // timeout: 15000, maximumAge: 10000 }
    ),
      [];
  });

  return (
    <Text>
      time
      {time?time:"nada time"}
      {"\n"}
      latitude
      {position?position.coords.latitude:"nada"}
      {"\n"}
        Error 
     {errors?errors:null}
    </Text>
  );
};
export default Location;
