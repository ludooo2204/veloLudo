import React, {useState, useEffect} from 'react';
import {Button,Modal, Text, View, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import Toast from 'react-native-toast-message';

const Save = ({route, navigation}) => {
  const [listParcours, setListParcours] = useState('');
  const [choisingParcours, setChoisingParcours] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {listBpm, listPosition} = route.params;
  useEffect(()=>{getParcours();console.log("useEffect")  },[])
  const renderItem = ({item}) => (
    <ParcoursItem title={item.title} onPress={() => {console.log(item.id)
    console.log('listParcours');console.log(listParcours.filter(e=>e.id==item.id)[0].key);
    getValeurParcours(listParcours.filter(e=>e.id==item.id)[0].key);

    }} />
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

    let parcoursKeys = [];
    for (const iterator of keys) {
      if (iterator.includes('position')) {
        let dateParcours = new Date (iterator.split("position-")[1]).toLocaleString('fr-FR');
      parcoursKeys.push({
        title:dateParcours ,
        id: keys.indexOf(iterator).toString(),
        key:iterator
      });
    }
    }

    // console.log('parcoursKeys', parcoursKeys);
    setListParcours(parcoursKeys);
  };
  const getValeurParcours = async (key) => {
    let data;
    try {
      data = await AsyncStorage.getItem(key);
    } catch (e) {
      console.log('error', e);
    }
    if (data.length>1) {
    console.log('datas');
    data=(JSON.parse(data));
  //  console.log(toastConfig.success())
    Toast.show({
      type:'customType',
      text1: 'Parcours du '+new Date(data[1][0]).toLocaleString('fr-FR'),
      text2: "BRAVO !! 👋 distance parcouru de "+ data[data.length-1][5]/1000+" km",
      props:{onPress:()=>{console.log("toto l'asticot !")}}
    });
    console.log(data);

    console.log('data.length');
    console.log(data.length);
    console.log("distance de ", data[data.length-1][5]/1000," km");
    }
  };
  const toastConfig = {
    customType: ({ text1,text2, props, ...rest }) => (
      <View style={{  width: '50%', backgroundColor: 'black' }}>
        <Text style={{padding:10,fontSize:20,color:"white"}}>{text1}</Text>
        
        <Text style={{padding:10,fontSize:20,color:"white"}}>{text2}</Text>
        {/* <Text>{props.guid}</Text> */}
      </View>
    )
  };
  const postData = ()=> {
    axios.post('http://lomano.go.yo.fr/testVelo.php', )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
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

    <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      <Button
        title="Fin du parcours"
        onPress={() => finParcours(listBpm, listPosition)}
      />
      <Text>{'\n'}</Text>
      {/* <Button title="clear keys" onPress={() => effacerKeys()} />
      <Text>{'\n'}</Text> */}
      <Button title="get parcours" onPress={() => {getParcours();    setChoisingParcours(true);}} />
      <Text>{'\n'}</Text>
    
      <Button
        title="debug"
        onPress={() =>  { console.log('modalVisible')
        console.log(modalVisible);
        setModalVisible(true)
        console.log('modalVisible')
        console.log(modalVisible)
        }}
    //     onPress={() =>  {Toast.show({      text1: 'Hello',
    //   text2: 'This is some something 👋'
    // })}}
      />
      <Text>{'\n'}</Text>
    
      <Button
        title="axios"
        onPress={() => postData()}
      />
    </View>
  ) : (<>
    <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    <FlatList
      data={listParcours}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    /></>
  );
};
export default Save;

const ParcoursItem = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{alignItems:'center'}}>
      <Text style={{padding:10,fontSize:20}}> {title}</Text>
    </TouchableOpacity>
  );
};

