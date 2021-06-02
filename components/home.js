import React, {useState, useEffect} from 'react';
import {Button, Text, StatusBar, View} from 'react-native';
import Modal from 'react-native-modal';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Location from './location';
import ActivationCardio from './activationCardio';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Bpm from './heartrate';
import Orientation from 'react-native-orientation';
import KeepAwake from 'react-native-keep-awake';
import RunningScreen from './RunningScreen';
import Main from './main';
import LineChartScreen from './LineChartScreen';
import {getDistanceFromLatLonInMeter, deg2rad} from './helpers';
import Icon from "react-native-vector-icons/FontAwesome5"

const Compteur = ({data}) => {
  const [nightMode,setNightMode]= useState(false)
  const speed = data[0];
  const altitude = data[1];
  const time = data[2];
  const distance = data[3];
  const nbrMesure = data[4];
  const distanceTotale = data[5];
  const tempsEcouleSecondes = Math.round(data[6] / 1000);
  const tempsEcoule = new Date(tempsEcouleSecondes * 1000)
    .toISOString()
    .substr(11, 8);
  const vitesseMoyenne = Math.round(data[7] * 10) / 10;
  let primaryColor="black";
  let secondaryColor="white"
  console.log('nightMode')
  console.log(nightMode)
  const toggleNightMode = () =>{
    console.log('toggle')
    setNightMode(!nightMode)
  }
  if (nightMode) {primaryColor="black";secondaryColor="white"}
  else {primaryColor="white";secondaryColor="black"}

  return (
    <View
      style={{
        flex: 7,
        backgroundColor: primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 90,
            fontFamily: 'sans-serif-thin',
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: secondaryColor,
          }}>
          {speed}{' '}
        </Text>

        <Text
          allowFontScaling={false}
          style={{
            fontSize: 30,
            fontFamily: 'sans-serif-thin',
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: secondaryColor,
            alignSelf: 'center',
          }}>
          km/h
        </Text>
      </View>
      <Text style={{fontSize: 30, color: secondaryColor}}>{altitude} m</Text>
      {/* <Text style={{fontSize: 30, color: 'white'}}>{distance} m</Text> */}
      <Text style={{fontSize: 30, color: secondaryColor}}>
        {distanceTotale > 1000
          ? distanceTotale / 1000 + ' km'
          : distanceTotale + ' m'}
      </Text>

      <Text style={{fontSize: 10, color: secondaryColor}}>d+ </Text>
      <Text style={{fontSize: 10, color: secondaryColor}}>
      <Text style={{fontSize: 30, color: secondaryColor}}>{vitesseMoyenne} km/h </Text>
        nbr mesure = {nbrMesure}{' '}
      </Text>
      <Text
        style={{
          fontSize: 60,
          fontFamily: 'sans-serif-thin',
          fontStyle: 'italic',
          fontWeight: 'bold',
          color: secondaryColor,
        }}>
        {new Date(time).toLocaleTimeString('fr-FR').substr(0, 5)}
      </Text>
    <Icon name='adjust'  size={30} color={secondaryColor} onPress={()=>toggleNightMode()}style={{backgroundColor:'transparent'}}/>
      <Text style={{fontSize: 30, color: secondaryColor}}>{tempsEcoule} </Text>
      
    </View>
  );
};

const Home = ({navigation}) => {
  const [isRunning, setRunning] = useState(false);
  const [BPM, setBPM] = useState(null);
  const [listBpm, setListBpm] = useState([]);
  const [listGPS, setListGPS] = useState([]);
  const [altitude, setAltitude] = useState(null);
  const [vitesseMoyenne, setVitesseMoyenne] = useState(0);
  const [distance, setDistanceParcouru] = useState(null);
  const [distanceTotale, setDistanceParcouruTotale] = useState(0);
  const [time, setTime] = useState(null);
  const [topDepart, setTopDepart] = useState(null);
  const [tempsEcoule, setTempsEcoule] = useState(null);
  const [speed, setSpeed] = useState(null);
  // const [GPS, setGPS] = useState(null);
  const [infoConnexion, setInfoConnexion] = useState(true);
  const [isGpsReady, setIsGpsReady] = useState(false);
  useEffect(() => {
    KeepAwake.activate();
    console.log('ne fait pas dodo!');
    Orientation.lockToLandscape();
  }, []);
  useEffect(() => {
    if (listGPS.length > 2) {
      const lastLongPosition = listGPS[listGPS.length - 1].coords.longitude;
      const lastLatPosition = listGPS[listGPS.length - 1].coords.latitude;
      const beforeLastLongPosition =
        listGPS[listGPS.length - 2].coords.longitude;
      const beforeLastLatPosition = listGPS[listGPS.length - 2].coords.latitude;
      setDistanceParcouru(
        Math.round(
          getDistanceFromLatLonInMeter(
            beforeLastLatPosition,
            beforeLastLongPosition,
            lastLatPosition,
            lastLongPosition,
          ),
        ),
      );
      setDistanceParcouruTotale(
        Math.round(
          getDistanceFromLatLonInMeter(
            beforeLastLatPosition,
            beforeLastLongPosition,
            lastLatPosition,
            lastLongPosition,
          ) + distanceTotale,
        ),
      );
      let vitesseMoyenneValue = 0;
      setTempsEcoule(new Date().getTime() - topDepart);
      for (const iterator of listGPS) {
        vitesseMoyenneValue += Math.round(iterator.coords.speed * 36) / 10;
      }
      setVitesseMoyenne(vitesseMoyenneValue / listGPS.length);
    }
  }, [listGPS]);

  const handleGPS = (position) => {
    setIsGpsReady(true);

    const altitudeValue = Math.round(position.coords.altitude * 100) / 100;
    const speedValue = Math.round(position.coords.speed * 36) / 10;

    setAltitude(altitudeValue);
    setSpeed(speedValue);
    setTime(position.timestamp);

    setListGPS((listGPS) => [...listGPS, position]);
    // traitementPositionGPS();
  };

  const handleBPM = (bpm) => {
    setInfoConnexion(false);
    const date = new Date();
    let dataBPMtemp = [date, bpm];
    setBPM(BPM);
    setListBpm((listBpm) => [...listBpm, dataBPMtemp]);
  };

  const ajoutDeplacement = () => {
    console.log('ajout deplacement');
    // {"coords": {"accuracy": 2400, "altitude": 101.2497769490799, "heading": 0, "latitude": 46.8489719, "longitude": 0.5446598, "speed": 0}, "mocked": false, "timestamp": 1621421193993}
    let position = {
      coords: {
        accuracy: Math.random() * 2000,
        altitude: Math.random() * 100 + 100,
        heading: 0,
        latitude: 46 + Math.random() / 1000,
        longitude: Math.random() / 1000 + 0.5,
        speed: (Math.random() * 10 + 20) / 3.6,
      },
      mocked: false,
      timestamp: new Date().getTime(),
    };
    const altitudeValue = Math.round(position.coords.altitude * 100) / 100;
    const speedValue = Math.round(position.coords.speed * 36) / 10;
    setAltitude(altitudeValue);
    setSpeed(speedValue);
    setTime(position.timestamp);

    let vitesseMoyenneValue = 0;
    for (const iterator of listGPS) {
      vitesseMoyenneValue += Math.round(iterator.coords.speed * 36) / 10;
    }
    console.log(
      'la vitesse moyenne est de ',
      vitesseMoyenneValue / listGPS.length,
      'instant est de ',
      speedValue,
    );
    setVitesseMoyenne(vitesseMoyenneValue / listGPS.length);
    setTempsEcoule(new Date().getTime() - topDepart);
    setListGPS((listGPS) => [...listGPS, position]);
    // traitementPositionGPS();
  };

  const startParcours = () => {
    console.log('top départ!', new Date().getTime());
    setRunning(true);
    setTopDepart(new Date().getTime());
  };
  const stopParcours = () => {
    console.log('fin parcours!!!');
    let dataToSave = [];
    for (let i = 2; i < listGPS.length; i++) {
      const element = listGPS[i];
      let distanceI =
        Math.round(
          getDistanceFromLatLonInMeter(
            listGPS[i - 1].coords.latitude,
            listGPS[i - 1].coords.longitude,
            listGPS[i].coords.latitude,
            listGPS[i].coords.longitude,
          ) * 10,
        ) / 10;
      let accuracyI = Math.round(element.coords.accuracy);
      let latitudeI = element.coords.latitude;
      let longitudeI = element.coords.longitude;
      let altitudeI = Math.round(element.coords.altitude);
      let speedI = Math.round(element.coords.speed * 10) / 10;
      let tempsI = element.timestamp;
      dataToSave.push([
        tempsI,
        distanceI,
        latitudeI,
        longitudeI,
        altitudeI,
        speedI,
        accuracyI,
      ]);
    }
    console.log('dataToSave');
    console.log(dataToSave);
    console.log('listBPm');
    console.log(listBpm);
    navigation.navigate('Save', {
      listBpm: listBpm,
      listPosition: dataToSave,
    });
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" hidden />

      {!isRunning && (
        <View style={{flex: 1}}>
          <Text>Bienvenue !</Text>
        </View>
      )}
      <View style={{flex: 1, flexDirection: 'row'}}>
        {/* {listGPS.length < 2 && ( */}
        {/* <View
            style={{flex: 1, backgroundColor: isGpsReady ? 'green' : 'red'}}> */}
        <Location remonterData={(e) => handleGPS(e)} isRunning={isRunning} />
        {/* </View> */}
        {/* )} */}

        {listGPS.length > 1 && isRunning && (
          <Compteur
            data={[
              speed,
              altitude,
              time,
              distance,
              listGPS.length,
              distanceTotale,
              tempsEcoule,
              vitesseMoyenne,
            ]}
            nightMode={true}
          />
        )}
        {listGPS.length == 1 && isRunning && (
          <Text>
            En attente deplacement car nbr de mesure = {listGPS.length}
          </Text>
        )}

        <View
          style={{
            flex: 6,
            backgroundColor: 'purple',
          }}>
          {!infoConnexion && !isRunning && (
            <Text style={{fontSize: 30}}>{BPM}</Text>
          )}
          {isRunning && <LineChartScreen data={listBpm} />}
          <Bpm
            remonterData={(e) => handleBPM(e)}
            isConnexionVisible={infoConnexion}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button title="ajout deplacement" onPress={ajoutDeplacement} />
          <Button title="fin du Parcours" onPress={stopParcours} />
        </View>
      </View>
      {!isRunning && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Pressable
            style={{
              borderRadius: 15,
              backgroundColor: 'yellow',
              color: '#fff',
              padding: 10,
              borderWidth: 2,
              borderColor: 'grey',
            }}
            onPress={startParcours}>
            <Text>GO !!!</Text>
          </Pressable>
        </View>
      )}
      {/* {isRunning &&  <RunningScreen/>} */}
    </View>
  );
};

export default Home;
