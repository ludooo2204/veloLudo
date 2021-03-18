/**
 *
 *
 * @format
 * @flow strict-local
 */


/**TODO
 - BUG kan montre + deplacement !!
-gerer la deconnexion bluetooth lors de l'arret de l'app (sinon redemarrage du tel)
 -ecran de veille a desactiver npm keepScreenawake
 -revoir la connexion a ma montre
 -lolo
*/

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import Location from './components/location';
import Bpm from './components/heartrate';
import LineChartScreen from './components/LineChartScreen';
import styles from './components/styles';

const App = () => {



  const [listBpm, setListBpm] = useState([]);
  const [listPosition, setListPosition] = useState([]);

  const handleBpm = (lastBpm) => {
    // console.log(lastBpm);
    const timestamp = new Date().toLocaleTimeString('fr-FR')
    let bpm = []
    bpm[0]=timestamp
    bpm[1]=lastBpm
    console.log(bpm);
    setListBpm((listBpm) => [...listBpm, bpm]);
  };
  const handlePosition = (lastPosition) => {
    console.log('lastPosition from app')
    console.log("coords", lastPosition.coords)
    let {altitude,speed} =lastPosition.coords
    altitude = Math.round(altitude * 100) / 100
    speed = Math.round(speed * 10) / 10
    
      const {longitude,latitude} = lastPosition.coords
    console.log("timestamp", lastPosition.timestamp)
    const timestamp = new Date(lastPosition.timestamp).toLocaleTimeString('fr-FR');
    // console.log(altitude,longitude,speed,latitude,timestamp);
    let position=[];
    position[0]=timestamp;
     position[1]=altitude
     position[2]=longitude
     position[3]=latitude
     position[4]=speed
    console.log(position);
    // console.log(altitude);
    // console.log(new Date().toLocaleTimeString('fr-FR'));
    setListPosition((listPosition) => [...listPosition, position]);
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" hidden/>
     
        
      <Text> nbr de position = {listPosition.length}</Text>
      <Button
        title="Press me"
        color="#f194ff"
        onPress={() => console.log(listPosition)}
      />
      <Location remonterData={(e) => handlePosition(e)}/>
      {/* <Chart dataBpm={listBpm}/> */}
      <View style={{flex: 3}}>
        <LineChartScreen data={listBpm} />
        {/* <Text style={{fontSize: 50}}>{listBpm}</Text> */}
      </View>

      <Bpm remonterData={(e) => handleBpm(e)} />
    </View>
  );
};

export default App;
