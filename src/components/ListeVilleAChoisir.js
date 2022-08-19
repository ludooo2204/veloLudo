import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addParcours } from '../redux/action';
import { useNavigation } from '@react-navigation/native';
//  REVOIR LE FORMAT DES PARCOURS {id:1,title:[{id:1,title:"Sossay"},{id:2,title:"Lyon"}...]}

const ListeVilleAChoisir = ({ setListeVilleVisible }) => {
	const [villesChoisies, setVillesChoisies] = useState([]);
	const listeDesVilles = useSelector((state) => state.villes);
	const listeDesParcours = useSelector((state) => state.parcours);
	const dispatch = useDispatch();

	const navigation = useNavigation();
	const storeDataParcours = async (dataToStore) => {
		try {
			await AsyncStorage.setItem(
				'listeParcours',
				JSON.stringify(dataToStore),
			);
			setListeVilleVisible(false);
		} catch (error) {
			// Error saving data
			console.log('error');

			console.log(error);
		}
	};

	const validerNouveauParcours = (e) => {
		console.log('listeDesParcours');
		console.log(listeDesParcours);
		console.log(listeDesParcours.length);
		let newId =
			listeDesParcours.length == 0
				? 1
				: Math.max(...listeDesParcours.map((e) => e.id)) + 1;
		console.log('newId');
		console.log(newId);
		let newParcoursObject = { id: newId.toString(), title: villesChoisies };
		console.log('newParcoursObject');

		console.log(newParcoursObject);
		console.log('listeDesParcours');
		listeDesParcours.push(newParcoursObject);
		console.log(listeDesParcours);
		storeDataParcours(listeDesParcours);

		// dispatch(addParcours(newParcoursObject));
	};
	const renderItemVille = ({ item }) => (
		<Pressable
			key={item.id}
			style={styles.pressableVille}
			onPress={() => {
				setVillesChoisies((villesChoisies) => [
					...villesChoisies,
					item,
				]);
			}}>
			<Text style={styles.textVille}>
				{item.title}
				{villesChoisies.includes(item) &&
					villesChoisies.indexOf(item) + 1}
			</Text>
		</Pressable>
	);
	return (
		<View style={styles.container}>
			<FlatList
				style={styles.flatlistParcours}
				numColumns={3}
				data={listeDesVilles[0]}
				renderItem={renderItemVille}
			// keyExtractor={(item) => item.id}
			/>
			<Pressable onPress={validerNouveauParcours}>
				<Text style={styles.textVille}>Validation</Text>
			</Pressable>
		</View>
	);
};

export default ListeVilleAChoisir;

const styles = StyleSheet.create({
	textVille: {
		color: 'white',
		// textAlign: 'center',
		marginVertical: 10,
		paddingVertical: 20,
		textAlign: 'center',
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

	flatlistParcours: {
		// backgroundColor: 'blue',
		height: 300,
		flex: 5,
	},
	container: {
		backgroundColor: 'blue',
		// height: 300,
		flex: 3,
	},
});
