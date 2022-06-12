import React, {useState, useEffect} from 'react';
import {
  Button,
  Modal,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const Save = ({route, navigation}) => {
  const [listParcours, setListParcours] = useState('');
  const [choisingParcours, setChoisingParcours] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [responseAxios, setResponse] = useState('pas envoyé');
  const [responseAxiosLocal, setResponseLocal] = useState('pas envoyé');

  const {listBpm, listPosition, distanceTotale, dPlus} = route.params;
  useEffect(() => {
    getParcours();
    console.log('useEffect');
    console.log('listBpm');
    console.log(listBpm);
    console.log('listPosition');
    console.log(listPosition);
    console.log('distanceTotale');
    console.log(distanceTotale);
    console.log('dPlus');
    console.log(dPlus);
  }, []);
  const renderItem = ({item}) => (
    <ParcoursItem
      title={item.title}
      onPress={() => {
        console.log(item.id);
        console.log('listParcours');
        console.log(listParcours.filter((e) => e.id == item.id)[0].key);
        getValeurParcours(listParcours.filter((e) => e.id == item.id)[0].key);
      }}
      effacerKeys={(keyToErase) => effacerKeys(keyToErase)}
    />
  );

  const effacerKeys = async (keyToErase) => {
    console.log('keys a effacer');
    console.log(keyToErase);
    try {
      // await AsyncStorage.multiRemove(keys);
      await AsyncStorage.removeItem(keyToErase);
    } catch (e) {
      console.log('error', e);
    }
    console.log('ca a du marcher effacement ');
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

    let parcoursKeys = [];
    for (const iterator of keys) {
      if (iterator.includes('position')) {
        let dateParcours = new Date(
          iterator.split('position-')[1],
        ).toLocaleString('fr-FR');
        parcoursKeys.push({
          title: dateParcours,
          id: keys.indexOf(iterator).toString(),
          key: iterator,
        });
      }
    }

    // console.log('parcoursKeys', parcoursKeys);
    setListParcours(parcoursKeys);
  };
  const getParcoursBpm = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log('error', e);
    }
    console.log('keys');
    console.log(keys);

    let parcoursKeys = [];
    for (const iterator of keys) {
      if (iterator.includes('bpm')) {
        let dateParcours = new Date(iterator.split('bpm-')[1]).toLocaleString(
          'fr-FR',
        );
        parcoursKeys.push({
          title: dateParcours,
          id: keys.indexOf(iterator).toString(),
          key: iterator,
        });
      }
    }

    // console.log('parcoursKeys', parcoursKeys);
    setListParcours(parcoursKeys);
  };
  const analyseDataParcours = (data) => {
    console.log('data');
    console.log(data);
    let distanceParcourue = 0;
    for (const position of data) {
      distanceParcourue += position[1];
    }
    distanceParcourue = Math.round(distanceParcourue) / 1000;
    console.log('distanceParcourue');
    console.log(distanceParcourue + ' km');
    return distanceParcourue;
  };
  const getValeurParcours = async (key) => {
    let data;
    try {
      data = await AsyncStorage.getItem(key);
    } catch (e) {
      console.log('error', e);
    }
    if (data.length > 1) {
      console.log('datas');
      console.log(data.split('\n'));
      data = JSON.parse(data);
      console.log('nbr data');
      console.log(data.length);
      //  analyseDataParcours(data)
      //  console.log(toastConfig.success())
      Toast.show({
        type: 'customType',
        text1: 'Parcours du ' + new Date(data[1][0]).toLocaleString('fr-FR'),
        text2:
          'BRAVO !! 👋 Tu as roulé sur ' + analyseDataParcours(data) + ' km',

        props: {
          onPress: () => {
            console.log("toto l'asticot !");
          },
        },
      });
      console.log(data);

      console.log('data.length');
      console.log(data.length);
      console.log('distance de ', data[data.length - 1][5] / 1000, ' km');
    }
  };
  const toastConfig = {
    customType: ({text1, text2, props, ...rest}) => (
      <View style={{width: '50%', backgroundColor: 'black'}}>
        <Text style={{padding: 10, fontSize: 20, color: 'white'}}>{text1}</Text>

        <Text style={{padding: 10, fontSize: 20, color: 'white'}}>{text2}</Text>
        {/* <Text>{props.guid}</Text> */}
      </View>
    ),
  };
  const postData = () => {
    axios
      // .post('http://lomano.go.yo.fr/testVelo.php', [listBpm, listPosition,distanceTotale,dPlus])
      .post('http://192.168.1.20:7000', [
        listBpm,
        listPosition,
        distanceTotale,
        dPlus,
      ])
      .then(function (response) {
        console.log('response');
        console.log(response);
        setResponse('ca a marché', JSON.stringify([listBpm, listPosition]));
      })
      .catch(function (error) {
        console.log('error');
        console.log(error);
        setResponse('ca marche pas...', error);
      });
  };
  const finParcours = async (listBpm, listPosition, distanceTotale, dPlus) => {
    console.log('fin du parcours et sauvegarde en local');
    console.log('list BPM', listBpm);
    console.log('list position', listPosition);
    console.log('distanceTotale', distanceTotale, 'm');
    console.log('dPlus', dPlus, 'm');
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
      await AsyncStorage.setItem(
        `distance-${dateDuParcours}`,
        distanceTotale.toString(),
      );
      await AsyncStorage.setItem(`dplus-${dateDuParcours}`, dPlus.toString());
    } catch (e) {
      console.log('error', e);
      setResponseLocal('Erreur ... !' + e);
    }
    console.log('save done !');
    setResponseLocal('Sauvegarde effectué !');
  };

  return !choisingParcours ? (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      <Button
        title="Fin du parcours"
        onPress={() =>
          finParcours(listBpm, listPosition, distanceTotale, dPlus)
        }
      />
      <Text>{responseAxiosLocal}</Text>
      <Button
        title="get parcours"
        onPress={() => {
          getParcours();
          setChoisingParcours(true);
        }}
      />
      <Text>{'\n'}</Text>

      <Button
        title="get info bpm"
        onPress={() => {
          getParcoursBpm();
          setChoisingParcours(true);
        }}
      />
      <Text>{'\n'}</Text>

      <Button title="axios" onPress={() => postData()} />
      <Text>{responseAxios}</Text>
    </View>
  ) : (
    <>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      <FlatList
        data={listParcours}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};
export default Save;

const ParcoursItem = ({title, onPress, effacerKeys}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Pressable onPress={onPress} style={{alignItems: 'center'}}>
        <Text style={{padding: 10, fontSize: 20}}> {title}</Text>
      </Pressable>
      <Button title="effacer?" onPress={() => effacerKeys(title)} />
    </View>
  );
};
