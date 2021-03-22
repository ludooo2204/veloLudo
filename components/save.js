import React, {useState, useEffect} from 'react';
import {Button, Text, View, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Save = ({route, navigation}) => {
  const [listParcours, setListParcours] = useState('');
  const [choisingParcours, setChoisingParcours] = useState(false);
  const {listBpm, listPosition} = route.params;

  const renderItem = ({item}) => (
    <ParcoursItem title={item.title} onPress={() => console.log(item.id)} />
  );

  const effacerKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log('error', e);
    }
    console.log('keys');
    console.log(keys);
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      console.log('error', e);
    }
    console.log('ca a du marcher');
  };
  const getParcours = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log('error', e);
    }
    console.log('keys');
    console.log(keys);
    setChoisingParcours(true);
    let parcoursKeys = [];
    for (const iterator of keys) {
      parcoursKeys.push({
        title: iterator,
        id: keys.indexOf(iterator).toString(),
      });
    }

    console.log('parcoursKeys', parcoursKeys);
    setListParcours(parcoursKeys);
  };
  const getParcoursTest = async () => {
    let data;
    try {
      data = await AsyncStorage.getItem(
        'bpm-Sat Mar 20 2021 18:13:29 GMT+0100 (CET)',
      );
    } catch (e) {
      console.log('error', e);
    }
    console.log('datas');
    console.log(JSON.parse(data));
    console.log(data);
  };

  const finParcours = async (listBpm, listPosition) => {
    console.log('fin du parcours et sauvegarde en local');
    console.log('list BPM', listBpm);
    console.log('list position', listPosition);
    console.log(
      `${listBpm.length} bpm à sauvegarder et ${listPosition.length} positions à sauvegarder `,
    );

    try {
      const dateDuParcours = new Date();

      console.log('dateDuParcours');
      console.log(dateDuParcours);

      const valueBpm = JSON.stringify(listBpm);
      await AsyncStorage.setItem(`bpm-${dateDuParcours}`, valueBpm);
      const valuePosition = JSON.stringify(listPosition);
      await AsyncStorage.setItem(`position-${dateDuParcours}`, valuePosition);
    } catch (e) {
      console.log('error', e);
    }
    console.log('save done !');
  };

  return !choisingParcours ? (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Button
        title="Fin du parcours"
        onPress={() => finParcours(listBpm, listPosition)}
      />
      <Text>{'\n'}</Text>
      {/* <Button title="clear keys" onPress={() => effacerKeys()} />
      <Text>{'\n'}</Text> */}
      <Button title="get parcours" onPress={() => getParcours()} />
      <Text>{'\n'}</Text>
      <Button title="get parcoursTest" onPress={() => getParcoursTest()} />
      <Text>{'\n'}</Text>
      <Button
        title="debug"
        onPress={() => console.log('list position', listPosition)}
      />
    </View>
  ) : (
    <FlatList
      data={listParcours}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
export default Save;

const ParcoursItem = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text> {title}</Text>
    </TouchableOpacity>
  );
};
