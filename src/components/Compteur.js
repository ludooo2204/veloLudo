/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StatusBar, View} from 'react-native';
import {CompteurText} from '../styles/styles';

export const Compteur = ({data, nightMode}) => {
  const speed = data[0];
  const altitude = data[1];
  const time = data[2];
  const distance = data[3];
  const nbrMesure = data[4];
  const distanceTotale = data[5];
  const tempsEcouleSecondes = Math.round(data[6] / 1000);
  const tempsEcoule = new Date(tempsEcouleSecondes * 1000)
    .toISOString()
    .substr(11, 8);
  const vitesseMoyenne = Math.round(data[7] * 10) / 10;
  const BPM = data[8];
  const dPlus = data[9];
  let primaryColor;
  let secondaryColor;
  if (nightMode) {
    primaryColor = 'black';
    secondaryColor = 'white';
  } else {
    primaryColor = 'white';
    secondaryColor = 'black';
  }

  return (
    <View
      style={{
        flex: 9,
        backgroundColor: primaryColor,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row'}}>
        <CompteurText allowFontScaling={false} fontSize={'150px'}>
          {speed}
        </CompteurText>

        <Text
          allowFontScaling={false}
          style={{
            fontSize: 40,
            fontFamily: 'sans-serif-thin',
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: secondaryColor,
            marginBottom: 20,
            paddingLeft: 20,
            alignSelf: 'flex-end',
          }}>
          km/h
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 150,
            fontFamily: 'sans-serif-thin',
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: secondaryColor,
            lineHeight: 150,
            alignSelf: 'center',
            paddingLeft: 0,
          }}>
          {BPM}
        </Text>

        <Text
          allowFontScaling={false}
          style={{
            fontSize: 40,
            fontFamily: 'sans-serif-thin',
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: secondaryColor,
            marginBottom: 20,
            paddingLeft: 20,
            alignSelf: 'flex-end',
          }}>
          bpm
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 30,
            fontFamily: 'sans-serif-thin',
            fontStyle: 'italic',
            fontWeight: 'bold',
            lineHeight: 30,
            color: secondaryColor,
          }}>
          {Math.round(distanceTotale / 100) / 10}
        </Text>

        <Text
          allowFontScaling={false}
          style={{
            fontSize: 20,
            fontFamily: 'sans-serif-thin',
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: secondaryColor,
            // alignSelf: 'center',
            lineHeight: 32,
            paddingLeft: 10,
            paddingRight: 30,
          }}>
          km
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 30,
            fontFamily: 'sans-serif-thin',
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: secondaryColor,
            lineHeight: 30,
          }}>
          {vitesseMoyenne}
        </Text>

        <Text
          allowFontScaling={false}
          style={{
            fontSize: 20,
            fontFamily: 'sans-serif-thin',
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: secondaryColor,
            alignSelf: 'center',
            paddingLeft: 10,
            paddingRight: 30,
            lineHeight: 20,
          }}>
          km/h
        </Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 30,
            fontFamily: 'sans-serif-thin',
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: secondaryColor,
            lineHeight: 30,
            paddingLeft: 10,
            paddingRight: 40,
          }}>
          {new Date(time).toLocaleTimeString('fr-FR').substr(0, 5)}
        </Text>

        <Text
          allowFontScaling={false}
          style={{
            fontSize: 30,
            fontFamily: 'sans-serif-thin',
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: secondaryColor,
            paddingLeft: 10,
            paddingRight: 30,
            lineHeight: 30,
          }}>
          {tempsEcoule}
        </Text>
      </View>

      <Text
        allowFontScaling={false}
        style={{
          fontSize: 20,
          fontFamily: 'sans-serif-thin',
          fontStyle: 'italic',
          fontWeight: 'bold',
          color: secondaryColor,
          paddingLeft: 10,
          paddingRight: 30,
          lineHeight: 20,
        }}>
        d+ {Math.round(dPlus * 10) / 10} m{' '}
      </Text>
      {/* <Text style={{fontSize: 10, color: secondaryColor}}>
        nbr mesure = {nbrMesure}{' '}
      </Text> */}
    </View>
  );
};
