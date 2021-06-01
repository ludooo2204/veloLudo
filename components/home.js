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
import Svg, {Path} from 'react-native-svg';

const Compteur = ({data}) => {
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

  return (
    <View
      style={{
        flex: 7,
        backgroundColor: 'black',
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
            color: 'white',
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
            color: 'white',
            alignSelf: 'center',
          }}>
          km/h
        </Text>
      </View>
      <Text style={{fontSize: 30, color: 'white'}}>{altitude} m</Text>
      {/* <Text style={{fontSize: 30, color: 'white'}}>{distance} m</Text> */}
      <Text style={{fontSize: 30, color: 'white'}}>
        {distanceTotale > 1000
          ? distanceTotale / 1000 + ' km'
          : distanceTotale + ' m'}
      </Text>

      <Text style={{fontSize: 30, color: 'white'}}>{vitesseMoyenne} km/h </Text>
      <Text style={{fontSize: 10, color: 'white'}}>d+ </Text>
      <Text style={{fontSize: 10, color: 'white'}}>
        nbr mesure = {nbrMesure}{' '}
      </Text>
      <Text
        style={{
          fontSize: 60,
          fontFamily: 'sans-serif-thin',
          fontStyle: 'italic',
          fontWeight: 'bold',
          color: 'white',
        }}>
        {new Date(time).toLocaleTimeString('fr-FR').substr(0, 5)}
      </Text>
      <Text style={{fontSize: 30, color: 'white'}}>{tempsEcoule} </Text>
        <Svg width="100" height="100" fill="white">
          <Path
            d="m50.011 0c-2.8839 0-5.7139 0.25936-8.4642 0.7281l-1.3424 14.221c-2.8444 0.79287-5.5365 1.9015-8.0546 3.322l-10.99-9.0785c-4.6419 3.286-8.7054 7.3259-11.991 11.968l9.1012 10.99c-1.4188 2.5151-2.552 5.214-3.3447 8.0546l-14.197 1.35c-0.46893 2.75-0.728 5.58-0.728 8.49 0 2.8897 0.25747 5.7085 0.7281 8.4641l14.198 1.3425c0.79274 2.8406 1.926 5.5395 3.3447 8.0546l-9.0785 10.99c3.2796 4.6294 7.3161 8.6885 11.945 11.968l11.013-9.1013c2.5197 1.4217 5.2082 2.5515 8.0546 3.3447l1.3424 14.221c2.7503 0.4688 5.5803 0.7054 8.4642 0.7054 2.8838 0 5.6911-0.2366 8.4414-0.7054l1.3424-14.221c2.8465-0.7932 5.5349-1.923 8.0546-3.3447l11.013 9.1013c4.6293-3.2797 8.6658-7.3388 11.945-11.968l-9.0785-10.99c1.4188-2.5151 2.552-5.214 3.3447-8.0546l14.198-1.3425c0.47063-2.7556 0.7281-5.5744 0.7281-8.4641 0-2.8848-0.25907-5.7131-0.7281-8.4642l-14.198-1.3424c-0.79274-2.8406-1.926-5.5395-3.3447-8.0546l9.1012-10.99c-3.2855-4.6423-7.349-8.6821-11.991-11.968l-10.99 9.0785c-2.5181-1.4205-5.2102-2.5291-8.0546-3.322l-1.3424-14.221c-2.7503-0.46874-5.5576-0.7281-8.4414-0.7281zm0 30.967c10.516 0 19.022 8.528 19.022 19.044s-8.5053 19.044-19.022 19.044c-10.516 0-19.044-8.528-19.044-19.044s8.528-19.044 19.044-19.044z"
            stroke="white"
          />
        </Svg>
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
