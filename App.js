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
  // console.log(listPosition)
  const [listBpm, setListBpm] = useState([]);
  const [listPosition, setListPosition] = useState([]);

  const handleBpm = (lastBpm) => {
    setListBpm((listBpm) => [...listBpm, lastBpm]);
  };
  const handlePosition = (lastPosition) => {
    console.log('lastPosition from app')
    console.log("coords", lastPosition.coords)
    console.log("timestamp", lastPosition.timestamp)
    console.log("test");
    setListPosition((listPosition) => [...listPosition, lastPosition]);
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
