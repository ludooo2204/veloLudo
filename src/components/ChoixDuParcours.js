/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, View, StyleSheet} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {matchSorter} from 'match-sorter';
import {useDispatch, useSelector} from 'react-redux';
import {addListeParcours, addParcours} from '../redux/action';
import ListeVilleAChoisir from './ListeVilleAChoisir';

const list = [
  {id: '1', title: ['Sossay', 'orches', 'leugny']},
  {id: '2', title: 'Paris - Orches - Sérigny - saint Christophe'},
  {id: '3', title: 'Sossay - Sérigny - saint Christophe'},
  {id: '4', title: 'Sossay - Orches - Sérigny'},
  {id: '5', title: 'Lyon - Orches - Sérigny - saint Christophe'},
  {id: '6', title: 'Sossay - Orches - Sérigny - saint Christophe'},
  {id: '7', title: 'Tokyo - Orches - Sérigny - saint Christophe'},
  {id: '8', title: 'Sossay - Orches - Sérigny - saint Christophe'},
  {id: '9', title: 'Paris - Orches - Sérigny - saint Christophe'},
  {id: '10', title: 'Sossay - Sérigny - saint Christophe'},
];

const listVille = [
  {id: '1', title: 'Sossay'},
  {id: '2', title: 'Orches'},
  {id: '3', title: 'Sérigny'},
  {id: '4', title: 'Saint Christophe'},
  {id: '5', title: 'Lencloitre'},
  {id: '6', title: 'Jaulnay'},
  {id: '7', title: 'Scorbé-clairvaux'},
  {id: '8', title: 'Naintré'},
  {id: '9', title: 'Leigné sur usseau'},
  {id: '10', title: 'Chatellerault'},
];

const ChoixDuParcours = ({parcoursChoisi}) => {
  const [villeDejaSaisie, setVilleDejaSaisie] = useState('');
  // const [listeDesParcours, setListeDesParcours] = useState(list);
  const [listeDesVilles, setListeDesVilles] = useState(listVille);
  const [ajoutVilleVisible, setAjoutVilleVisible] = useState(false);
  const [ListeVilleVisible, setListeVilleVisible] = useState(false);
  const [ajoutInputVilleVisible, setAjoutInputVilleVisible] = useState(false);

  const listeDesParcours = useSelector((state) => state.parcours);
  // const listeInitialesDesParcours = useSelector((state) => state.parcours);
  const dispatch = useDispatch();

  useEffect(() => {
    retrieveData();
  }, []);

  console.log('listeDesParcours');
  console.log(listeDesParcours);
  console.log(typeof listeDesParcours);

  const validerNouvelleVille = (e) => {
    let newId = Math.max(...listeDesVilles.map((e) => e.id)) + 1;
    listeDesVilles.push({id: newId.toString(), title: e.nativeEvent.text});
    storeDataVille(listeDesVilles);
  };
  const ajouterParcours = () => {
    console.log('ajouter parcours');
    setListeVilleVisible(true);
  };
  const handleText = (e) => {
    if (e === '') {
      setListeDesParcours(list);
      setAjoutVilleVisible(false);
    } else {
      const resultatDeRecherche = matchSorter(listeDesParcours, e, {
        keys: ['title'],
      });

      if (resultatDeRecherche.length === 0) setAjoutVilleVisible(true);
      else setAjoutVilleVisible(false);
      setListeDesParcours(resultatDeRecherche);
    }
  };

  const handleTexttest = (e) => {
    const resultatDeRecherche = matchSorter(
      listVille.map((element) => element.title),
      e,
    );
  };
  const storeDataParcours = async (dataToStore) => {
    try {
      await AsyncStorage.setItem('listeParcours', JSON.stringify(dataToStore));
    } catch (error) {
      // Error saving data
    }
  };
  const storeDataVille = async (dataToStore) => {
    console.log('sauvergarde villes');
    console.log(dataToStore);
    try {
      await AsyncStorage.setItem('listeVille', JSON.stringify(dataToStore));
    } catch (error) {
      // Error saving data
    }
  };
  const retrieveData = async () => {
    try {
      console.log('look for value');
      const valueParcours = await AsyncStorage.getItem('listeParcours');
      console.log(JSON.parse(valueParcours));
      if (valueParcours !== null) {
        // We have data!!
        dispatch(addListeParcours(JSON.parse(valueParcours)));

        // setListeDesParcours(JSON.parse(valueParcours));
      } else {
        storeDataParcours(list);
      }
      const valueVille = await AsyncStorage.getItem('listeVille');
      console.log('valueVille');
      console.log(valueVille);
      if (valueVille !== null) {
        // We have data!!

        setListeDesVilles(JSON.parse(valueVille));
      } else {
        storeDataVille(listVille);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('listeParcours');
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };
  // removeData();
  const removeDataVille = async () => {
    try {
      await AsyncStorage.removeItem('listeVille');
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };
  // removeDataVille();
  const renderItem = ({item}) => (
    <Pressable
      key={item.id}
      onPress={() => {
        parcoursChoisi(item);
        // setModalVisible(false);
      }}>
      <Text style={styles.textParcours}>{item.title}</Text>
    </Pressable>
  );
  // const renderItemVille = ({item}) => (
  //   <Pressable
  //     key={item.id}
  //     style={styles.pressableVille}
  //     onPress={() => {
  //       parcoursChoisi(item);
  //       // setModalVisible(false);
  //     }}>
  //     <Text style={styles.textParcours}>{item.title}</Text>
  //   </Pressable>
  // );

  return (
    <View style={styles.viewChoixParcoursGlobal}>
      <View style={styles.viewTitreParcours}>
        <Text style={styles.textTitreParcours}>Listes des parcours</Text>
      </View>
      <View style={styles.viewPressableGroupAjout}>
        {/* AJOUT PARCOURS */}
        <Pressable
          style={styles.pressableAjoutParcours}
          onPress={ajouterParcours}>
          <Text style={styles.textAjoutParcours}>Ajouter un parcours</Text>
        </Pressable>
        {/* AJOUT VILLE */}
        <Pressable
          style={styles.pressableAjoutParcours}
          onPress={() => setAjoutInputVilleVisible(true)}>
          <Text style={styles.textAjoutParcours}>Ajouter une ville</Text>
        </Pressable>
      </View>

      {!ListeVilleVisible && (
        <FlatList
          style={styles.flatlistParcours}
          data={listeDesParcours}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id}
        />
      )}
      {ListeVilleVisible && (
        <ListeVilleAChoisir />
        // <FlatList
        //   style={styles.flatlistParcours}
        //   numColumns={3}
        //   data={listeDesVilles}
        //   renderItem={renderItemVille}
        //   // keyExtractor={(item) => item.id}
        // />
      )}
      {/* <FlatList
				data={villeDejaSaisie}
				renderItem={renderItemVille}
				keyExtractor={(i) => i.id}
			/> */}
      {!ListeVilleVisible && (
        <View style={styles.input}>
          {ajoutInputVilleVisible ? (
            <TextInput
              placeholder="Saisissez ici votre nouvelle ville"
              onSubmitEditing={validerNouvelleVille}
            />
          ) : (
            <TextInput
              placeholder="Rechercher un parcours"
              onChangeText={handleText}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default ChoixDuParcours;

const styles = StyleSheet.create({
  input: {
    color: 'white',
    backgroundColor: 'yellow',
    textAlign: 'center',
    marginVertical: 10,
    paddingVertical: 10,
  },
  viewPressableGroupAjout: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  pressableAjoutParcours: {
    color: 'white',
    backgroundColor: 'lightgrey',
    textAlign: 'center',
    height: 50,
    justifyContent: 'center',
    // paddingVertical: 10,
    borderRadius: 50,
  },
  textAjoutParcours: {fontSize: 20, padding: 5},
  textVille: {
    color: 'black',
    // textAlign: 'center',
    marginVertical: 10,
    paddingVertical: 30,
  },
  textParcours: {
    color: 'white',
    backgroundColor: 'green',
    textAlign: 'center',
    marginVertical: 10,
    paddingVertical: 10,
  },
  pressableVille: {
    color: 'white',
    backgroundColor: 'green',
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    // paddingVertical: 10,
    borderRadius: 5,
    width: 110,
  },
  viewChoixParcoursGlobal: {
    backgroundColor: 'black',
    flex: 1,
  },
  flatlistParcours: {
    // backgroundColor: 'blue',
    height: 300,
    // flex: 1,
  },
  viewTitreParcours: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitreParcours: {
    fontSize: 50,
    color: 'white',
  },
});
