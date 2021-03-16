/**
 * Sample BLE React Native App
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Location from './components/location';
import Bpm from './components/heartrate';
import LineChartScreen from './components/LineChartScreen';
import styles from './components/styles';

const App = () => {
  const [listBpm, setListBpm] = useState([]);

  const handleBpm = (lastBpm) => {
    setListBpm((listBpm) => [...listBpm, lastBpm]);
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" hidden/>
      <Location />
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
