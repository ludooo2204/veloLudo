/**
 *
 *
 * @format
 * @flow strict-local
 */

/**TODO
 * 
 * - revoir listPosition avec la vitesse en plus. il faut creer un state position et y ajouter la vitesse
 - BUG kan montre + deplacement !!
-gerer la deconnexion bluetooth lors de l'arret de l'app (sinon redemarrage du tel)
 -ecran de veille a desactiver npm keepScreenawake
 -revoir la connexion a ma montre
 -lolo
*/

import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	Button,
} from 'react-native';
import Orientation from 'react-native-orientation';
import KeepAwake from 'react-native-keep-awake';
import Location from './components/location';
import Bpm from './components/heartrate';
import LineChartScreen from './components/LineChartScreen';
import Save from './components/save';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './components/styles';


const App = () => {
	const [listBpm, setListBpm] = useState([]);
	const [listPosition, setListPosition] = useState([]);
	const [positionTemporaire, setPositionTemporaire] = useState(null);
	const [lastPositionLatLong, setLastPositionLatLong] = useState([]);
	const [distance, setDistance] = useState(0);
	useEffect(() => { KeepAwake.activate(); console.log("ne fait pas dodo!"); Orientation.lockToLandscape(); }, [])
	// let listPosition=[]
	useEffect(() => {
		console.log(
			'#########################useEffect#####################################',
		);
		let positionTemporaire2 = JSON.parse(JSON.stringify(positionTemporaire));

		if (listPosition.length > 2) {
			console.log('listPosition');
			console.log(listPosition);
			console.log(listPosition.length);
			const actualLat = listPosition[listPosition.length - 1][3];
			const actualLong = listPosition[listPosition.length - 1][2];
			const lastLat = listPosition[listPosition.length - 2][3];
			const lastLong = listPosition[listPosition.length - 2][2];

			const distanceFromlastPosition = getDistanceFromLatLonInMeter(lastLat, lastLong, actualLat, actualLong,);

			setDistance(distance + Math.round(distanceFromlastPosition));
			console.log('distance depuis la derniere fois en m =', distanceFromlastPosition);
			console.log("positionTemporaire2 avant distance");
			console.log(positionTemporaire2);
			positionTemporaire2.push(distance);
			console.log("positionTemporaire2 apres distance");
			console.log(positionTemporaire2);
			// setPositionTemporaire(positionTemporaire2);
		}

		setListPosition((listPosition) => [...listPosition, positionTemporaire2]);

	}, [positionTemporaire]);
	useEffect(() => { console.log('distance from effect dist ance en m =', distance); }, [distance])
	useEffect(() => { console.log('listPosition from effect', listPosition); }, [listPosition])

	const handleBpm = (lastBpm) => {
		const timestamp = new Date();
		let bpm = [];
		bpm[0] = timestamp;
		bpm[1] = lastBpm;
		console.log(bpm);
		setListBpm((listBpm) => [...listBpm, bpm]);
	};

	const handlePosition = (lastPosition) => {
		console.log('lastPosition from app');
		console.log('coords', lastPosition.coords);
		let { altitude, speed } = lastPosition.coords;
		const { longitude, latitude } = lastPosition.coords;
		const timestamp = new Date(lastPosition.timestamp);
		altitude = Math.round(altitude * 100) / 100;
		speed = Math.round(speed * 36) / 10;

		let position = [];
		position[0] = timestamp;
		position[1] = altitude;
		position[2] = longitude;
		position[3] = latitude;
		position[4] = speed;

		setPositionTemporaire(position);

	};

	return (
		<View style={{ flex: 1, flexDirection: "row", backgroundColor: 'black', color: 'white' }}>
			<StatusBar barStyle="dark-content" hidden />
			<View style={{ flex: 2, flexDirection: "column" }} >
				<Text style={{ color: 'white', fontSize: 20 }}>
					nbr de position = {listPosition.length}
				</Text>
				<Text style={{ color: 'white',textAlign: 'center', fontSize: 60 }}>
					{listPosition.length > 3 ? console.log(JSON.stringify(listPosition[listPosition.length - 1][4])) : null} km/h
    		    </Text>
				<Text style={{ color: 'white',textAlign: 'center', fontSize: 30 }}>
					{distance} en metre
			    </Text>
				<Save listBpm={listBpm} listPosition={listPosition} />
				<Location remonterData={(e) => handlePosition(e)} />
			</View>
			

		

			<View style={{ flex: 3 }}>
				<LineChartScreen data={listBpm} />
			</View>
			<View style={{ flex: 1, flexDirection: "column" }} >
				<Bpm
					style={{ backgroundColor: 'black' }}
					remonterData={(e) => handleBpm(e)}
				/>
			</View>
		</View>

	);
};

export default App;

//helpers
function getDistanceFromLatLonInMeter(lat1, lon1, lat2, lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1); // deg2rad below
	var dLon = deg2rad(lon2 - lon1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
		Math.cos(deg2rad(lat2)) *
		Math.sin(dLon / 2) *
		Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c * 1000; // Distance in m
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}
