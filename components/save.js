import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Save = ({listBpm, listPosition}) => {
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
      let test = dateDuParcours.toLocaleString('fr-FR', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      console.log('dateDuParcours');
      console.log(dateDuParcours);
      console.log(test);
      const valueBpm = JSON.stringify(listBpm);
      await AsyncStorage.setItem(`bpm-${test}`, valueBpm);
      const valuePosition = JSON.stringify(listPosition);
      await AsyncStorage.setItem(`position-${test}`, valuePosition);
    } catch (e) {
      console.log('error', e);
    }
    console.log('save done !');
  };

  return (
    <>
      <Button
        title="Fin du parcours"
        onPress={() => finParcours(listBpm, listPosition)}
      />
      <Text>{'\n'}</Text>
      <Button title="clear keys" onPress={() => effacerKeys()} />
      <Text>{'\n'}</Text>
      <Button title="get parcours" onPress={() => getParcours()} />
    </>
  );
};
export default Save;
