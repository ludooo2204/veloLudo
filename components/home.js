import React, {useState} from 'react';
import {Button, Text, StatusBar, View} from 'react-native';
import Modal from 'react-native-modal';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import ActivationGps from './activationGps';
import ActivationCardio from './activationCardio';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Bpm from './heartrate';
import RunningScreen from './RunningScreen';
import Main from './main';
import LineChartScreen from './LineChartScreen';
let dataGPS=[]
const Home = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRunning, setRunning] = useState(false);
  const [BPM, setBPM] = useState(null);
  const [listBpm, setListBpm] = useState([]);
  const [listGPS, setListGPS] = useState([]);
  const [GPS, setGPS] = useState(null);
  const [infoConnexion, setInfoConnexion] = useState(true);
  const [isGpsReady, setIsGpsReady] = useState(false);



  const handleGPS = (position) => {
    console.log('gpsReady', position);
    setIsGpsReady(true);
    setGPS(position);
    // dataGPS.push(position)
    console.log('dataGPS')
    console.log(listGPS)
    setListGPS((listGPS)=>[...listGPS,position])
  };
  const handleBPM = (bpm) => {
    console.log('handleBPM from home');
    setInfoConnexion(false);
    const date= new Date()
    let dataBPMtemp=[date,bpm]
    setBPM(BPM);
    console.log('gcn', dataBPMtemp);
    setListBpm((listBpm)=>[...listBpm,dataBPMtemp])
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
        <View style={{flex: 1, backgroundColor: isGpsReady ? 'green' : 'red'}}>
          <ActivationGps
            remonterData={(e) => handleGPS(e)}
            isRunning={isRunning}
          />
          <Text>nbr de mesures :{listGPS.length}</Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: 'purple',
          }}>
          {(!infoConnexion && !isRunning) && <Text style={{fontSize: 30}}>{BPM}</Text>}
          {isRunning&&<LineChartScreen  data={listBpm}/>}
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
