import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Analyse = () => {
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let keys = [];
        try {
            keys = await AsyncStorage.getAllKeys();
        } catch (e) {
            console.log('error', e);
        }
        console.log('keys');

        console.log(keys);
        const listeKeyParcours = keys.filter((e) => !e.includes('liste'));
        console.log("listeKeyParcours");
        console.log(listeKeyParcours);
        let datas = [];
        let data
        for (const iterator of listeKeyParcours) {
            try {
                data = await AsyncStorage.getItem(iterator);
            } catch (e) {
                console.log('error', e);
            }
            if (data.length > 1) {
                let dataTemp = JSON.parse(data)
                let vitesseMoyenne
                let moyenne = 0
                for (const iterator of dataTemp[1]) {
                    moyenne += iterator[4] * 3.6
                }
                moyenne = moyenne / dataTemp[1].length
                const tempFin = (dataTemp[1][dataTemp[1].length - 1])[0]
                const tempDebut = dataTemp[1][0][0]
                let bpmMoyen = 0
                let bpm = dataTemp[0].map(e => e[1])
                console.log(bpm)
                const bpmMax = Math.max(...bpm)
                for (const iterator of bpm) {
                    bpmMoyen += iterator
                }
                bpmMoyen = bpmMoyen / bpm.length
                console.log("BPM max " + bpmMax)
                console.log("BPM moyen " + bpmMoyen)
                //A TESTER
                // console.log("moyenne2 " + (dataTemp[2] / 1000) / dureeEnSecondes * 3600)

                const dureeParcours = (new Date(tempFin - tempDebut).toUTCString().slice(-12, -4))
                // console.log(dureeParcours / dataTemp[2])
                dataTemp = { bpm: dataTemp[0], position: dataTemp[1], distance: Math.round(dataTemp[2] / 100) / 10, dPlus: dataTemp[3], nomParcours: dataTemp[4], dureeParcours, vitesseMoyenne: moyenne, bpmMoyen, bpmMax }
                datas.push(dataTemp)
            }
        }
        console.log("datas")
        console.log(datas)

    };
    return (
        <View>
            <Text>Analyse</Text>
        </View>
    )
}

export default Analyse