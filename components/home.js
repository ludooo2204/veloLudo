import React, {useState} from 'react';
import {Button, Text, StatusBar, View} from 'react-native';
import Modal from 'react-native-modal';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Location from './location';
import ActivationCardio from './activationCardio';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Bpm from './heartrate';
import RunningScreen from './RunningScreen';
import Main from './main';
import LineChartScreen from './LineChartScreen';
let dataGPS = [];

const Compteur =({data})=>{
  console.log('data')
  console.log(data)
  const speed = data[0]
  const altitude = data[1]
  const time = data[2]
  return(<View style={{flex: 1,backgroundColor:"black", justifyContent: 'center',alignItems: 'center',}}>
    <Text style={{fontSize:30,color:"white"}}>{speed} km/h</Text>
    <Text style={{fontSize:30,color:"white"}}>{altitude} m</Text>
    <Text style={{fontSize:30,color:"white"}}>distance parcouru </Text>
    <Text style={{fontSize:30,color:"white"}}>Temps ecoulé </Text>
    <Text style={{fontSize:30,color:"white"}}>vitesse moyenne </Text>
    <Text style={{fontSize:30,color:"white"}}>d+   </Text>
    <Text style={{fontSize:30,color:"white"}}>{new Date(time).toLocaleTimeString('fr-FR').substr(0, 5)}</Text>
    </View>
  )
}

const Home = ({navigation}) => {
  const [isRunning, setRunning] = useState(false);
  const [BPM, setBPM] = useState(null);
  const [listBpm, setListBpm] = useState([]);
  const [listGPS, setListGPS] = useState([]);
  const [altitude, setAltitude] = useState(null);
  const [time, setTime] = useState(null);
  const [speed, setSpeed] = useState(null);
  // const [GPS, setGPS] = useState(null);
  const [infoConnexion, setInfoConnexion] = useState(true);
  const [isGpsReady, setIsGpsReady] = useState(false);

  const handleGPS = (position) => {
    console.log('gpsReady', position);
    setIsGpsReady(true);
    // setGPS(position);

    // dataGPS.push(position)
    const altitudeValue = Math.round(position.coords.altitude * 100) / 100;
    const speedValue = Math.round(position.coords.speed * 36) / 10;
    setAltitude(altitudeValue);
    setSpeed(speedValue);
    setTime(position.timestamp)
    // setDistanceParcouru()
    setListGPS((listGPS) => [...listGPS, position]);
    // traitementPositionGPS();
  };
  // const traitementPositionGPS = () => {};
  const handleBPM = (bpm) => {
    console.log('handleBPM from home');
    setInfoConnexion(false);
    const date = new Date();
    let dataBPMtemp = [date, bpm];
    setBPM(BPM);
    console.log('gcn', dataBPMtemp);
    setListBpm((listBpm) => [...listBpm, dataBPMtemp]);
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
      {listGPS.length<2 &&  <View style={{flex: 1, backgroundColor: isGpsReady ? 'green' : 'red'}}>
          <Location remonterData={(e) => handleGPS(e)} isRunning={isRunning} />
        </View>}
        
            {listGPS.length>1 && <Compteur data={[speed,altitude,time]}/>}
            {/* {listGPS.length>1 && <View style={{flex: 1}}><Text>nbr de mesures :{listGPS.length}</Text></View>} */}
        

        <View
          style={{
            flex: 1,
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
      </View>
      {!isRunning && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Pressable
            style={{
              borderRadius: 15,
              backgroundColor: 'yellow',
              padding: 10,
              borderWidth: 2,
              borderColor: 'grey',
            }}
            onPress={() => setRunning(true)}>
            <Text>GO !!!</Text>
          </Pressable>
        </View>
      )}
      {/* {isRunning &&  <RunningScreen/>} */}
    </View>
  );
};

export default Home;
