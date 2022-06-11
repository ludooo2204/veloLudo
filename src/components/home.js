/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, StatusBar, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Location from './location';

import Bpm from './heartrate';
import Orientation from 'react-native-orientation';
import KeepAwake from 'react-native-keep-awake';
import LineChartScreen from './LineChartScreen';
import {getDistanceFromLatLonInMeter, moyennePourDplus} from '../helpers/math';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Compteur} from './Compteur';

// const Compteur = ({data, nightMode}) => {
//   const speed = data[0];
//   const altitude = data[1];
//   const time = data[2];
//   const distance = data[3];
//   const nbrMesure = data[4];
//   const distanceTotale = data[5];
//   const tempsEcouleSecondes = Math.round(data[6] / 1000);
//   const tempsEcoule = new Date(tempsEcouleSecondes * 1000)
//     .toISOString()
//     .substr(11, 8);
//   const vitesseMoyenne = Math.round(data[7] * 10) / 10;
//   const BPM = data[8];
//   const dPlus = data[9];
//   let primaryColor;
//   let secondaryColor;
//   if (nightMode) {
//     primaryColor = 'black';
//     secondaryColor = 'white';
//   } else {
//     primaryColor = 'white';
//     secondaryColor = 'black';
//   }

//   return (
//     <View
//       style={{
//         flex: 7,
//         backgroundColor: primaryColor,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <View style={{flexDirection: 'row'}}>
//         <Text
//           allowFontScaling={false}
//           style={{
//             fontSize: 100,
//             fontFamily: 'sans-serif-thin',
//             fontStyle: 'italic',
//             fontWeight: 'bold',
//             color: secondaryColor,
//             lineHeight: 100,
//             alignSelf: 'center',
//             paddingLeft: 20,
//             marginTop: 30,
//           }}>
//           {speed}
//         </Text>

//         <Text
//           allowFontScaling={false}
//           style={{
//             fontSize: 30,
//             fontFamily: 'sans-serif-thin',
//             fontStyle: 'italic',
//             fontWeight: 'bold',
//             color: secondaryColor,
//             // backgroundColor:'blue',
//             marginBottom: 20,
//             paddingLeft: 20,
//             alignSelf: 'flex-end',
//           }}>
//           km/h
//         </Text>
//       </View>
//       <View style={{flexDirection: 'row'}}>
//         <Text
//           allowFontScaling={false}
//           style={{
//             fontSize: 90,
//             fontFamily: 'sans-serif-thin',
//             fontStyle: 'italic',
//             fontWeight: 'bold',
//             color: secondaryColor,
//             // backgroundColor:'green',
//             lineHeight: 90,
//             alignSelf: 'center',
//             // textAlignVertical:'bottom',
//             paddingLeft: 0,
//             // marginStart:0
//           }}>
//           {BPM}
//         </Text>

//         <Text
//           allowFontScaling={false}
//           style={{
//             fontSize: 30,
//             fontFamily: 'sans-serif-thin',
//             fontStyle: 'italic',
//             fontWeight: 'bold',
//             color: secondaryColor,
//             // backgroundColor:'blue',
//             marginBottom: 20,
//             paddingLeft: 20,
//             alignSelf: 'flex-end',
//           }}>
//           bpm
//         </Text>
//       </View>

//       {/* <Text style={{fontSize: 30, color: 'white'}}>{distance} m</Text> */}
//       <View style={{flexDirection: 'row', marginBottom: 10}}>
//         <Text
//           allowFontScaling={false}
//           style={{
//             fontSize: 40,
//             fontFamily: 'sans-serif-thin',
//             fontStyle: 'italic',
//             fontWeight: 'bold',
//             lineHeight: 40,
//             color: secondaryColor,
//           }}>
//           {Math.round(distanceTotale / 100) / 10}
//         </Text>

//         <Text
//           allowFontScaling={false}
//           style={{
//             fontSize: 30,
//             fontFamily: 'sans-serif-thin',
//             fontStyle: 'italic',
//             fontWeight: 'bold',
//             color: secondaryColor,
//             alignSelf: 'center',
//             lineHeight: 30,
//             paddingLeft: 10,
//             paddingRight: 30,
//           }}>
//           km
//         </Text>
//         <Text
//           allowFontScaling={false}
//           style={{
//             fontSize: 40,
//             fontFamily: 'sans-serif-thin',
//             fontStyle: 'italic',
//             fontWeight: 'bold',
//             color: secondaryColor,
//             lineHeight: 40,
//           }}>
//           {vitesseMoyenne}
//         </Text>

//         <Text
//           allowFontScaling={false}
//           style={{
//             fontSize: 30,
//             fontFamily: 'sans-serif-thin',
//             fontStyle: 'italic',
//             fontWeight: 'bold',
//             color: secondaryColor,
//             alignSelf: 'center',
//             paddingLeft: 10,
//             paddingRight: 30,
//             lineHeight: 30,
//           }}>
//           km/h
//         </Text>
//       </View>

//       <View style={{flexDirection: 'row'}}>
//         <Text
//           allowFontScaling={false}
//           style={{
//             fontSize: 40,
//             fontFamily: 'sans-serif-thin',
//             fontStyle: 'italic',
//             fontWeight: 'bold',
//             color: secondaryColor,
//             lineHeight: 40,
//             paddingLeft: 10,
//             paddingRight: 40,
//           }}>
//           {new Date(time).toLocaleTimeString('fr-FR').substr(0, 5)}
//         </Text>

//         <Text
//           allowFontScaling={false}
//           style={{
//             fontSize: 40,
//             fontFamily: 'sans-serif-thin',
//             fontStyle: 'italic',
//             fontWeight: 'bold',
//             color: secondaryColor,
//             paddingLeft: 10,
//             paddingRight: 30,
//             lineHeight: 40,
//           }}>
//           {tempsEcoule}
//         </Text>
//       </View>

//       <Text
//         allowFontScaling={false}
//         style={{
//           fontSize: 40,
//           fontFamily: 'sans-serif-thin',
//           fontStyle: 'italic',
//           fontWeight: 'bold',
//           color: secondaryColor,
//           paddingLeft: 10,
//           paddingRight: 30,
//           lineHeight: 40,
//         }}>
//         d+ {Math.round(dPlus * 10) / 10} m{' '}
//       </Text>
//       <Text style={{fontSize: 10, color: secondaryColor}}>
//         nbr mesure = {nbrMesure}{' '}
//       </Text>
//     </View>
//   );
// };

const Home = ({navigation}) => {
  const [isRunning, setRunning] = useState(false);
  const [BPM, setBPM] = useState(null);
  const [listBpm, setListBpm] = useState([]);
  const [listGPS, setListGPS] = useState([]);
  const [listAltitude, setListAltitude] = useState([]);
  const [altitude, setAltitude] = useState(null);
  const [vitesseMoyenne, setVitesseMoyenne] = useState(0);
  const [distance, setDistanceParcouru] = useState(null);
  const [distanceTotale, setDistanceParcouruTotale] = useState(0);
  const [time, setTime] = useState(null);
  const [topDepart, setTopDepart] = useState(null);
  const [tempsEcoule, setTempsEcoule] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [dPlus, setdPlus] = useState(0);
  const [lastAltitudeMoyen, setLastAltitudeMoyen] = useState(null);
  const [nightMode, setNightMode] = useState(true);
  // const [GPS, setGPS] = useState(null);
  const [infoConnexion, setInfoConnexion] = useState(true);
  const [isGpsReady, setIsGpsReady] = useState(false);
  useEffect(() => {
    KeepAwake.activate();
    Orientation.lockToPortrait();
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

      setListAltitude((listAltitude) => [
        ...listAltitude,
        listGPS[listGPS.length - 1].coords.altitude,
      ]);

      //le calcul de dplus se fait ici
      if (listAltitude.length > 5) {
        let altitudeMoyen = moyennePourDplus(listAltitude, 5);
        if (lastAltitudeMoyen != null) {
          let ecart = altitudeMoyen - lastAltitudeMoyen;
          console.log('ecart', ecart);
          if (ecart > 0.3) {
            console.log('increment altitude!!');
            console.log('dPlus');
            console.log(dPlus + ecart);
            setdPlus(dPlus + ecart);
          }
        }

        setLastAltitudeMoyen(altitudeMoyen);
      }
      // let ecart =
      // listAltitudeLissé[listAltitudeLissé.length - 1] -
      // listAltitudeLissé[listAltitudeLissé.length - 2];
      // console.log('ecart', ecart);
      // if (ecart > 0.4) {
      //   console.log('increment altitude!!');
      //   setdPlus(dPlus + ecart);
      // }
    }
  }, [listGPS]);
  let primaryColor = 'black';
  let secondaryColor = 'white';
  if (nightMode) {
    primaryColor = 'black';
    secondaryColor = 'white';
  } else {
    primaryColor = 'white';
    secondaryColor = 'black';
  }
  const toggleNightMode = () => {
    setNightMode(!nightMode);
  };

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

    // if (listGPS.length > 5) {
    // setListAltitudeLissé((listAltitudeLissé) => [...listAltitudeLissé, position]);

    //   let ecart =
    //     position.coords.altitude - listGPS[listGPS.length - 1].coords.altitude;
    //   console.log('ecart', ecart);
    //   if (ecart > 0.5) {
    //     console.log('increment altitude!!');
    //     setdPlus(dPlus + ecart);
    //   }
    // }

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
  const handleBPM = (bpm) => {
    setInfoConnexion(false);
    const date = new Date().getTime();
    let dataBPMtemp = [date, bpm];
    setBPM(bpm);
    setListBpm((listBpm) => [...listBpm, dataBPMtemp]);
  };

  const ajoutBPM = () => {
    let BPMtemp = Math.round(Math.random() * 30 + 70);
    setInfoConnexion(false);
    const date = new Date().getTime();
    let dataBPMtemp = [date, BPMtemp];
    setBPM(BPMtemp);
    setListBpm((listBpm) => [...listBpm, dataBPMtemp]);
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
      // let distanceI =
      //   Math.round(
      //     getDistanceFromLatLonInMeter(
      //       listGPS[i - 1].coords.latitude,
      //       listGPS[i - 1].coords.longitude,
      //       listGPS[i].coords.latitude,
      //       listGPS[i].coords.longitude,
      //     ) * 10,
      //   ) / 10;
      // let accuracyI = Math.round(element.coords.accuracy);
      let latitudeI = element.coords.latitude;
      let longitudeI = element.coords.longitude;
      let altitudeI = Math.round(element.coords.altitude);
      let speedI = Math.round(element.coords.speed * 10) / 10;
      let tempsI = element.timestamp;
      dataToSave.push([tempsI, latitudeI, longitudeI, altitudeI, speedI]);
    }
    // dataToSave.push(distanceTotale);
    console.log('dataToSave');
    console.log(dataToSave);
    console.log('listBPm');
    console.log(listBpm);
    navigation.navigate('Save', {
      listBpm: listBpm,
      listPosition: dataToSave,
      distanceTotale: distanceTotale,
      dPlus: dPlus,
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar barStyle="dark-content" hidden />

      {!isRunning && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 80, fontStyle: 'italic'}}>
            VeloLudo
          </Text>
        </View>
      )}
      <View
        style={{
          flex: 1,
          //  flexDirection: 'row'
        }}>
        <Location remonterData={(e) => handleGPS(e)} isRunning={isRunning} />
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
              BPM,
              dPlus,
            ]}
            nightMode={nightMode}
          />
        )}
        {listGPS.length == 1 && isRunning && (
          <View
            style={{
              flex: 1,
              backgroundColor: primaryColor,
              color: secondaryColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: secondaryColor, textAlign: 'center'}}>
              En attente deplacement
            </Text>
          </View>
        )}

        <View
          style={{
            flex: 6,
            backgroundColor: 'purple',
          }}>
          {!infoConnexion && !isRunning && (
            <Text style={{fontSize: 30}}>{BPM}</Text>
          )}
          {isRunning && (
            <LineChartScreen data={listBpm} nightMode={nightMode} />
          )}
          <Bpm
            remonterData={(e) => handleBPM(e)}
            isConnexionVisible={infoConnexion}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: primaryColor,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Pressable
            style={{backgroundColor: primaryColor, padding: 10}}
            onPress={ajoutDeplacement}>
            <Text style={{color: secondaryColor}}>ajout Deplacement</Text>
          </Pressable>
          <Pressable
            style={{backgroundColor: primaryColor, padding: 10}}
            onPress={ajoutBPM}>
            <Text style={{color: secondaryColor}}>ajout BPM</Text>
          </Pressable>
          <Pressable
            style={{backgroundColor: primaryColor, padding: 10}}
            onPress={stopParcours}>
            <Text style={{color: secondaryColor}}>fin du Parcours</Text>
          </Pressable>
          <Icon
            name="adjust"
            size={20}
            color={secondaryColor}
            onPress={() => toggleNightMode()}
            style={{backgroundColor: 'transparent', padding: 10}}
          />
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
