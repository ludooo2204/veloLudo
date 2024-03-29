/**
 * Sample BLE React Native App
 *
 * @format
 * @flow strict-local
 */

 import React, {useState, useEffect} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   StatusBar,
   NativeModules,
   NativeEventEmitter,
   Button,
   Platform,
   PermissionsAndroid,
   FlatList,
   TouchableHighlight,
 } from 'react-native';
 
 import {Colors} from 'react-native/Libraries/NewAppScreen';
 
 import BleManager from 'react-native-ble-manager';
 
 import Geolocation from 'react-native-geolocation-service';
 
 const BleManagerModule = NativeModules.BleManager;
 const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
 
 const App = () => {
   const [isScanning, setIsScanning] = useState(false);
   const peripherals = new Map();
   const [list, setList] = useState([]);
   const [bpm, setBpm] = useState(0);
   const [listBpm, setListBpm] = useState([]);
   const [isConnected, setConnected] = useState(false);
   const [position, setPosition] = useState(null);
   const [listPosition, setListPosition] = useState(null);
   const [positionsLength, setPositionLength] = useState(0);
   const [listAltitude, setListAltitude] = useState(null);
 
   const startScan = () => {
     if (!isScanning) {
       BleManager.scan([], 5, true)
         .then((results) => {
           console.log('Scanning...');
           setIsScanning(true);
         })
         .catch((err) => {
           console.error(err);
         });
     }
   };
 
   const handleStopScan = () => {
     console.log('Scan is stopped');
     setIsScanning(false);
   };
   const testTimeout = (texte) => {
     console.log(texte);
   };
   const handleDisconnectedPeripheral = (data) => {
     console.log('HANDLE DISCONNECT');
     console.log('data');
     console.log(data);
     console.log(data.status);
     let peripheral = peripherals.get(data.peripheral);
     if (peripheral) {
       console.log('peripheral deconnecté?');
       console.log(peripheral);
       // console.log('peripherals');
       // console.log(peripherals);
       peripheral.connected = false;
       peripherals.set(peripheral.id, peripheral);
       setList(Array.from(peripherals.values()));
 
       data.status == '19'
         ? testPeripheral(peripheral)
         : console.log('premiere deco');
     }
     console.log('Disconnected from ' + data.peripheral);
     //  setTimeout(()=>testTimeout("toto"),2000)
   };
 
   const handleUpdateValueForCharacteristic = (data) => {
     console.log(data.value[1] + ' bpm');
     setBpm(data.value[1]);
     setListBpm((listBpm) => [...listBpm, data.value[1]]);
     // if (listBpm.length>5) console.log("5 valeurs !!")
     // console.log(listBpm);
   };
 
   const retrieveConnected = () => {
     BleManager.getConnectedPeripherals([]).then((results) => {
       if (results.length == 0) {
         console.log('No connected peripherals');
       }
       console.log('results retrieve');
 
       for (var i = 0; i < results.length; i++) {
         var peripheral = results[i];
         peripheral.connected = true;
         peripherals.set(peripheral.id, peripheral);
         setList(Array.from(peripherals.values()));
         console.log('peripheral');
         console.log(peripheral);
       }
     });
   };
 
   const handleDiscoverPeripheral = (peripheral) => {
     // console.log('Got ble peripheral', peripheral);
     if (peripheral.name && peripheral.name.includes('Amazfit')) {
       peripherals.set(peripheral.id, peripheral);
       setList(Array.from(peripherals.values()));
     } else console.log('pas amaz');
     if (!peripheral.name) {
       peripheral.name = 'NO NAME';
     }
   };
 
   const testPeripheral = (peripheral) => {
     // console.log('peripheral');
     // console.log(peripheral);
     if (peripheral) {
       if (peripheral.connected) {
         BleManager.disconnect(peripheral.id);
       } else {
         BleManager.connect(peripheral.id)
           .then(() => {
             let p = peripherals.get(peripheral.id);
             console.log(p);
             if (p) {
               p.connected = true;
               setConnected(true);
               peripherals.set(peripheral.id, p);
               setList(Array.from(peripherals.values()));
             }
             console.log('Connected to ' + peripheral.id);
 
             setTimeout(() => {
               console.log('LOLOLOL');
               /* Test read current RSSI value */
               BleManager.retrieveServices(peripheral.id).then(
                 (peripheralData) => {
                   BleManager.startNotification(
                     'C0:0C:0B:13:05:5E',
                     '180d',
                     '2a37',
                   )
                     .then(() => {
                       // Success code
                       console.log('Notification started');
                       // console.log(a);
                     })
                     .catch((error) => {
                       // Failure code
                       console.log('error');
                       console.log(error);
                     });
                 },
               );
             }, 900);
           })
           .catch((error) => {
             console.log('Connection error', error);
           });
       }
     }
   };
 
   useEffect(() => {
     let positions = [];
     let altitudes = [];
     Geolocation.watchPosition(
       (positionI) => {
         console.log('position');
         console.log(positionI);
 
         positions.push(positionI);
         setPosition(JSON.stringify(positionI));
         setPositionLength(positions.length);
         console.log('position from const');
         console.log(position);
         console.log('positions');
         console.log(positions);
         console.log(altitudes.push(positionI.coords.altitude + '-'));
         setListAltitude(altitudes);
       },
       (error) => {
         // See error code charts below.
         console.log(error.code, error.message);
       },
       {
         enableHighAccuracy: true,
         distanceFilter: 2,
         interval: 1000,
         fastestInterval: 100,
       }, // timeout: 15000, maximumAge: 10000 }
     );
 
     BleManager.start({showAlert: false});
     console.log('useEffect addlistener');
     bleManagerEmitter.addListener(
       'BleManagerDiscoverPeripheral',
       handleDiscoverPeripheral,
     );
     bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
     bleManagerEmitter.addListener(
       'BleManagerDisconnectPeripheral',
       handleDisconnectedPeripheral,
     );
     bleManagerEmitter.addListener(
       'BleManagerDidUpdateValueForCharacteristic',
       handleUpdateValueForCharacteristic,
     );
 
     if (Platform.OS === 'android' && Platform.Version >= 23) {
       PermissionsAndroid.check(
         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
       ).then((result) => {
         if (result) {
           console.log('Permission is OK');
         } else {
           PermissionsAndroid.request(
             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
           ).then((result) => {
             if (result) {
               console.log('User accept');
             } else {
               console.log('User refuse');
             }
           });
         }
       });
     }
 
     return () => {
       console.log('unmount');
       bleManagerEmitter.removeListener(
         'BleManagerDiscoverPeripheral',
         handleDiscoverPeripheral,
       );
       bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan);
       bleManagerEmitter.removeListener(
         'BleManagerDisconnectPeripheral',
         handleDisconnectedPeripheral,
       );
       bleManagerEmitter.removeListener(
         'BleManagerDidUpdateValueForCharacteristic',
         handleUpdateValueForCharacteristic,
       );
     };
   }, []);
 
   const renderItem = (item) => {
     const color = item.connected ? 'green' : '#fff';
     return (
       <View>
         <TouchableHighlight onPress={() => testPeripheral(item)}>
           <View style={[styles.row, {backgroundColor: color}]}>
             <Text
               style={{
                 fontSize: 12,
                 textAlign: 'center',
                 color: '#333333',
                 padding: 10,
               }}>
               {item.name}
             </Text>
             <Text
               style={{
                 fontSize: 10,
                 textAlign: 'center',
                 color: '#333333',
                 padding: 2,
               }}>
               RSSI: {item.rssi}
             </Text>
             <Text
               style={{
                 fontSize: 8,
                 textAlign: 'center',
                 color: '#333333',
                 padding: 2,
                 paddingBottom: 20,
               }}>
               {item.id}
             </Text>
           </View>
         </TouchableHighlight>
         <TouchableHighlight onPress={() => BleManager.disconnect(item.id)}>
           <View style={[styles.row, {backgroundColor: color}]}>
             <Text
               style={{
                 fontSize: 12,
                 textAlign: 'center',
                 color: '#333333',
                 padding: 10,
               }}>
               Deconnexion ???
             </Text>
           </View>
         </TouchableHighlight>
       </View>
     );
   };
 
   return (
     <>
       <StatusBar barStyle="dark-content" />
       <SafeAreaView>
         <ScrollView
           contentInsetAdjustmentBehavior="automatic"
           style={styles.scrollView}>
           {global.HermesInternal == null ? null : (
             <View style={styles.engine}>
               <Text style={styles.footer}>Engine: Hermes</Text>
             </View>
           )}
           <View style={styles.body}>
             <View style={{margin: 10}}>
               <Text style={{fontSize: 40}}>{bpm}</Text>
               <Text style={{fontSize: 20}}>listBpm)</Text>
               <Text style={{fontSize: 20}}>{JSON.stringify(listBpm)}</Text>
               <Text style={{fontSize: 20}}>altitude</Text>
               <Text style={{fontSize: 20}}>{position}</Text>
               <Text style={{fontSize: 20}}>liste altitude</Text>
               <Text style={{fontSize: 20}}>{listAltitude}</Text>
               <Text style={{fontSize: 20}}>{listPosition}</Text>
               <Text style={{fontSize: 20}}>nbr de position GPS</Text>
               <Text style={{fontSize: 20}}>{positionsLength}</Text>
 
               <Button
                 title={'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}
                 onPress={() => startScan()}
               />
             </View>
 
             <View style={{margin: 10}}>
               <Button
                 title="Retrieve connected peripherals"
                 onPress={() => retrieveConnected()}
               />
             </View>
             <View style={{margin: 10}}>
               <Button title="GPS ??" onPress={() => lancerGPS()} />
             </View>
 
             {list.length == 0 && (
               <View style={{flex: 1, margin: 20}}>
                 <Text style={{textAlign: 'center'}}>No peripherals</Text>
               </View>
             )}
           </View>
         </ScrollView>
         {isConnected ? null : (
           <FlatList
             data={list}
             renderItem={({item}) => renderItem(item)}
             keyExtractor={(item) => item.id}
           />
         )}
       </SafeAreaView>
     </>
   );
 };
 
 const styles = StyleSheet.create({
   scrollView: {
     backgroundColor: Colors.lighter,
   },
   engine: {
     position: 'absolute',
     right: 0,
   },
   body: {
     backgroundColor: Colors.white,
   },
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
     color: Colors.black,
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
     color: Colors.dark,
   },
   highlight: {
     fontWeight: '700',
   },
   footer: {
     color: Colors.dark,
     fontSize: 12,
     fontWeight: '600',
     padding: 4,
     paddingRight: 12,
     textAlign: 'right',
   },
 });
 
 export default App;
 