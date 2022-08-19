import React, { useState, useEffect } from 'react';
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
import moment from 'moment';
import { useSelector } from 'react-redux';

const Save = ({ route, navigation }) => {
    const [listParcours, setListParcours] = useState('');
    const [choisingParcours, setChoisingParcours] = useState(false);
    const [dataDuParcoursChoisi, setDataDuParcoursChoisi] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [responseAxios, setResponse] = useState('pas envoyé');
    const [responseAxiosLocal, setResponseLocal] = useState('pas envoyé');
    const parcoursChoisi = useSelector((state) => state.parcoursChoisi);

    const { listBpm, listPosition, distanceTotale, dPlus } = route.params;
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
    useEffect(() => {
        console.log('dataDuParcoursChoisi');
        if (dataDuParcoursChoisi) setModalVisible(true);
    }, [dataDuParcoursChoisi]);
    const renderItem = ({ item }) => (
        <ParcoursItem
            title={'parcours du ' + item}
            onPress={() => {
                console.log('item');
                console.log(item);
                console.log('listParcours');
                console.log(listParcours);
                console.log(listParcours.filter((e) => e == item)[0]);
                getValeurParcours(listParcours.filter((e) => e == item)[0]);
            }}
            effacerKeys={(keyToErase) => effacerKeys(keyToErase)}
        />
    );

    const effacerKeys = async (keyToErase) => {
        console.log('keys a effacer');
        console.log(keyToErase);
        const keyTemp = keyToErase.slice(-19);
        console.log(keyTemp);
        try {
            //   let keys = await AsyncStorage.getAllKeys();
            //   console.log('keys');
            //   console.log(keys);
            //   await AsyncStorage.multiRemove(keys, (e) => {
            //     console.log('ca a marché !!', e);
            //     navigation.navigate('Home');
            //   });
            await AsyncStorage.removeItem(keyTemp, (e) => {
                console.log('ca a marché !!', e);
                setChoisingParcours(false);
            });
        } catch (e) {
            console.log('error', e);
        }
        // console.log('ca a du marcher effacement ');
    };
    const getParcours = async () => {
        var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');

        console.log('moment date'); // 2015-09-13 03:39:27
        console.log(date); // 2015-09-13 03:39:27

        var stillUtc = moment.utc(date).toDate();
        var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');

        console.log('moment local'); // 2015-09-13 09:39:27
        console.log(local); // 2015-09-13 09:39:27

        let keys = [];
        try {
            keys = await AsyncStorage.getAllKeys();
        } catch (e) {
            console.log('error', e);
        }
        console.log('keys');
        console.log('keys');
        console.log('keys');
        console.log('keys');
        console.log('keys');
        console.log(keys);
        const listeKeyParcours = keys.filter((e) => !e.includes('liste'));
        console.log(listeKeyParcours);

        setListParcours(listeKeyParcours);
    };

    const getValeurParcours = async (key) => {
        console.log('key');
        console.log(key);
        let data;
        try {
            data = await AsyncStorage.getItem(key);
        } catch (e) {
            console.log('error', e);
        }
        if (data.length > 1) {
            data = JSON.parse(data);
            console.log('nbr data');
            console.log(data.length);
            console.log('datas');
            console.log(data);
            setDataDuParcoursChoisi([key, data]);
            //   Toast.show({
            //     type: 'customType',
            //     text1: 'Parcours du ' + key,
            //     text2:
            //       'BRAVO !! 👋 Tu as roulé sur ' +
            //       Math.round(data[2] / 100) / 10 +
            //       ' km',
        }
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
        console.log('parcoursChoisi');
        console.log(parcoursChoisi);
        let parcoursString = '';
        for (let i = 0; i < parcoursChoisi.title.length; i++) {
            parcoursString +=
                parcoursChoisi.title[i].title +
                (i == parcoursChoisi.title.length - 1 ? '' : ' - ');
        }
        // parcoursChoisi.title.foreach((parcours, index) => {
        //   console.log(parcours);
        //   string =
        //     parcours.title +
        //     (index == parcoursChoisi.title.length - 1 ? '' : ' - ');
        // });
        console.log('parcoursString');
        console.log(parcoursString);
        console.log(
            `${listBpm.length} bpm à sauvegarder et ${listPosition.length} positions à sauvegarder `,
        );

        try {
            let dateDuParcours = moment.utc().toDate();
            dateDuParcours = moment(dateDuParcours)
                .local()
                .format('YYYY-MM-DD HH:mm:ss');
            const dataToStore = [
                listBpm,
                listPosition,
                distanceTotale,
                dPlus,
                parcoursString,
            ];
            //   const valueBpm = JSON.stringify(listBpm);
            await AsyncStorage.setItem(dateDuParcours, JSON.stringify(dataToStore));
            //   const valuePosition = JSON.stringify(listPosition);
            //   await AsyncStorage.setItem(`position-${dateDuParcours}`, valuePosition);
            //   await AsyncStorage.setItem(
            //     `distance-${dateDuParcours}`,
            //     distanceTotale.toString(),
            //   );
            //   await AsyncStorage.setItem(`dplus-${dateDuParcours}`, dPlus.toString());
        } catch (e) {
            console.log('error', e);
            setResponseLocal('Erreur ... !' + e);
        }
        console.log('save done !');
        setResponseLocal('Sauvegarde effectué !');
    };

    return !choisingParcours ? (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            {/* <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} /> */}

            <Button
                title="Fin du parcours"
                onPress={() =>
                    finParcours(listBpm, listPosition, distanceTotale, dPlus)
                }
            />
            <Text>{responseAxiosLocal}</Text>
            <Pressable
                style={{ alignItems: 'center', marginVertical: 20, paddingVertical: 10, justifyContent: "center", borderRadius: 50, padding: 5, backgroundColor: "red" }}
                onPress={() => {
                    getParcours();
                    setChoisingParcours(true);
                }}
            >
                <Text>gestion des parcours</Text>

            </Pressable>
            <Pressable
                style={{ alignItems: 'center', justifyContent: "center", marginVertical: 20, paddingVertical: 10, borderRadius: 50, padding: 5, backgroundColor: "red" }}
                onPress={() => {
                    navigation.navigate("Analyse");
                    // setChoisingParcours(true);
                }}
            >
                <Text>Analyse des parcours</Text>

            </Pressable>
            <Text>{'\n'}</Text>

            <Button title="axios" onPress={() => postData()} />
            <Text>{responseAxios}</Text>
        </View>
    ) : (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    //   Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 22,
                    }}>
                    <View style={{ width: '80%' }}>
                        <Text
                            style={{
                                padding: 10,
                                fontSize: 20,
                                color: 'white',
                                backgroundColor: 'black',
                            }}>
                            {dataDuParcoursChoisi ? dataDuParcoursChoisi[0] : ''}
                        </Text>
                        <Text
                            style={{
                                padding: 10,
                                fontSize: 20,
                                color: 'white',
                                backgroundColor: 'black',
                            }}>
                            {dataDuParcoursChoisi
                                ? 'BRAVO !! 👋 Tu as roulé sur ' +
                                Math.round(dataDuParcoursChoisi[1][2] / 100) / 10 +
                                ' km'
                                : ''}
                        </Text>
                        <Text
                            style={{
                                padding: 10,
                                fontSize: 20,
                                color: 'white',
                                backgroundColor: 'black',
                            }}>
                            {dataDuParcoursChoisi ? dataDuParcoursChoisi[1][4] : ''}
                        </Text>
                    </View>
                </View>
            </Modal>
            {/* <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} /> */}
            <FlatList
                data={listParcours}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
            />
        </>
    );
};
export default Save;

const ParcoursItem = ({ title, onPress, effacerKeys }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Pressable onPress={onPress} style={{ alignItems: 'center' }}>
                <Text style={{ padding: 10, fontSize: 20 }}> {title}</Text>
                <Text style={{ padding: 10, fontSize: 20 }}> {title}</Text>
            </Pressable>
            <Pressable style={{ alignItems: 'center', justifyContent: "center", borderRadius: 50, padding: 5, backgroundColor: "red" }} onPress={() => effacerKeys(title)} ><Text>Effacer ?</Text></Pressable>
        </View >
    );
};
