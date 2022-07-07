/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';
import Modal from 'react-native-modal';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {matchSorter} from 'match-sorter';

const ChoixDuParcours = ({parcoursChoisi}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [villeDejaSaisie, setVilleDejaSaisie] = useState('');
  const [ajoutParcoursVisible, setAjoutParcoursVisible] = useState(false);
  const [listeDesParcours, setListeDesParcours] = useState(null);
  const list = [
    {id: '1', title: 'Sossay - Orches - Sérigny - saint Christophe'},
    {id: '2', title: 'Parcours 2'},
    {id: '3', title: 'Parcours 3'},
  ];
  const listVille = [
    {id: '11', title: 'Sossay'},
    {id: '21', title: 'Orches'},
    {id: '31', title: 'Sérigny'},
    {id: '41', title: 'Saint Christophe'},
  ];

  useEffect(() => {
    retrieveData();
  }, []);
  console.log('villeDejaSaisie');
  console.log(villeDejaSaisie);
  const handleText = (e) => {
    const resultatDeRecherche = matchSorter(
      listVille.map((element) => element.title),
      e,
    );
    console.log('resultatDeRecherche');
    console.log(resultatDeRecherche);
    setVilleDejaSaisie(resultatDeRecherche);
  };
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
  const renderItemVille = ({item}) => (
    <Pressable
      onPress={() => {
        // parcoursChoisi(item);
        // setModalVisible(false);
      }}>
      <Text
        style={{
          color: 'white',
          backgroundColor: 'black',
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
      <Modal
        animationType="fade"
        transparent={true}
        isVisible={ajoutParcoursVisible}>
        <View
          style={{
            color: 'white',
            backgroundColor: 'lightgrey',
            textAlign: 'center',
            marginVertical: 10,
            paddingVertical: 10,
          }}>
          <FlatList
            data={villeDejaSaisie}
            renderItem={renderItemVille}
            keyExtractor={(i) => i.id}
          />
          <TextInput
            placeholder="Saisissez ici votre nouveau parcours"
            onChangeText={handleText}
          />
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} isVisible={isModalVisible}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <Pressable
          onPress={() => setAjoutParcoursVisible(!ajoutParcoursVisible)}
          style={{
            color: 'white',
            backgroundColor: 'lightgrey',
            textAlign: 'center',
            marginVertical: 10,
            width: 70,
            height: 70,
            paddingVertical: 10,
            left: 300,
            borderRadius: 50,
          }}>
          <Text style={{textAlign: 'center', lineHeight: 55, fontSize: 50}}>
            +
          </Text>
        </Pressable>
        {/* {ajoutParcoursVisible && (
          <View
            style={{
              color: 'white',
              backgroundColor: 'lightgrey',
              textAlign: 'center',
              marginVertical: 10,
              paddingVertical: 10,
            }}></View>
        )} */}
      </Modal>
    </View>
  );
};

export default ChoixDuParcours;
