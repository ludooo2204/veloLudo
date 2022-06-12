/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';
import Modal from 'react-native-modal';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChoixDuParcours = ({parcoursChoisi}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [listeDesParcours, setListeDesParcours] = useState(null);
  const list = [
    {id: '1', title: 'Sossay - Orches - Sérigny - saint Christophe'},
    {id: '2', title: 'Parcours 2'},
    {id: '3', title: 'Parcours 3'},
  ];

  useEffect(() => {
    retrieveData();
  }, []);

  const storeData = async (dataToStore) => {
    try {
      await AsyncStorage.setItem('listeParcours', JSON.stringify(dataToStore));
    } catch (error) {
      // Error saving data
    }
  };
  const retrieveData = async () => {
    try {
      console.log('look for value');
      const value = await AsyncStorage.getItem('listeParcours');
      if (value !== null) {
        // We have data!!
        console.log('value');
        console.log(value);
        setListeDesParcours(value);
      } else {
        storeData(list);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        parcoursChoisi(item);
        setModalVisible(false);
      }}>
      <Text
        style={{
          color: 'white',
          backgroundColor: 'green',
          textAlign: 'center',
          marginVertical: 10,
          paddingVertical: 10,
        }}>
        {item.title}
      </Text>
    </Pressable>
  );
  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={{color: 'white', textAlign: 'center'}}>
          ChoixDuParcours
        </Text>
      </Pressable>
      <Modal animationType="fade" transparent={true} isVisible={isModalVisible}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View
          style={{
            color: 'white',
            backgroundColor: 'lightgrey',
            textAlign: 'center',
            marginVertical: 10,
            paddingVertical: 10,
          }}>
          <TextInput placeholder="Saisissez ici votre nouveau parcours" />
        </View>
      </Modal>
    </View>
  );
};

export default ChoixDuParcours;
