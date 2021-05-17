import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import styles from './styles';
const Location = ({remonterData}) => {
  // const Location = ({ remonterData, isVisible }) => {
  const [position, setPosition] = useState(null);
  const [bg, setBg] = useState("red")
  // const [errors, setErrors] = useState(null);
  // const [time, setTime] = useState(null);
  // const [gpsRunning, setGpsRunning] = useState(false);

  useEffect(() => {
    console.log('lancement du GPS');
    // setGpsRunning(true);
    setBg("green")
    Geolocation.watchPosition(
      (positionI) => {
        // let time = new Date(positionI.timestamp).toLocaleTimeString('FR-fr');
        // setTime(time);
        setPosition(positionI);
        remonterData(positionI);
      },
      (error) => {
        // See error code charts below.
        console.log('errors');
        console.log(error.code, error.message);
        // setErrors(error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 5,
        interval: 2000,
        fastestInterval: 1900,
      }, // timeout: 15000, maximumAge: 10000 }
    );
    return () => {
      Geolocation.stopObserving()
    }
  }, [])
  
    
  
  // const startGps = () => {
  //   console.log('lancement du GPS');
  //   setGpsRunning(true);
  //   setBg("green")
  //   Geolocation.watchPosition(
  //     (positionI) => {
  //       // let time = new Date(positionI.timestamp).toLocaleTimeString('FR-fr');
  //       // setTime(time);
  //       setPosition(positionI);
  //       remonterData(positionI);
  //     },
  //     (error) => {
  //       // See error code charts below.
  //       console.log('errors');
  //       console.log(error.code, error.message);
  //       // setErrors(error.message);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       distanceFilter: 5,
  //       interval: 2000,
  //       fastestInterval: 1900,
  //     }, // timeout: 15000, maximumAge: 10000 }
  //   );
  // };
if (position) {return (
    <View style={{backgroundColor:bg}}>
     
      <Text style={styles.indicationText}>
        POSITION !!
      {JSON.stringify(position)}
      </Text>
      <Text style={styles.kmhText}>
        time !! 
      {JSON.stringify(new Date(position.timestamp).toLocaleTimeString('FR-fr'))}
      </Text>

    </View>
  
  )}
  else {return <Text>ya rien</Text>}
};
export default Location;
