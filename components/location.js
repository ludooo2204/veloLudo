import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import styles from './styles';
const Location = () => {
  const [position, setPosition] = useState(null);
  const [time, setTime] = useState(null);
  const [listPosition, setListPosition] = useState(null);
  const [positionsLength, setPositionLength] = useState(0);
  const [listAltitude, setListAltitude] = useState(null);

  useEffect(() => {
    let positions = [];
    let altitudes = [];
    Geolocation.watchPosition(
      (positionI) => {
        // console.log('position');
        // console.log(positionI.coords);
        let time = new Date(positionI.timestamp).toLocaleTimeString('FR-fr');

        positions.push(positionI);
        setPosition(JSON.stringify(positionI));
        setPositionLength(positions.length);
        setTime(time);
        setListAltitude(altitudes);
        // console.log('positionff');
        // console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 2,
        interval: 1000,
        fastestInterval: 100,
      }, // timeout: 15000, maximumAge: 10000 }
    ),
      [];
  });

  return (
    <Text>
      {time}
      {/* {position.coords.altitude} */}
      {/* {console.log(position)} */}
    </Text>
  );
};
export default Location;
