//helpers
export function getDistanceFromLatLonInMeter(lat1, lon1, lat2, lon2) {
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

export function convertHMS(value) {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
  let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  // if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
}

export function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
export const moyennePourDplus = (dataArray, nbrMesureALisser) => {
  return moyenne(
    dataArray.slice(dataArray.length - nbrMesureALisser, dataArray.length),
  );
};
export const mesureDenivelléPositif = (altitude) => {
  let dPlus = 0;
  for (let i = 1; i < altitude.length; i++) {
    let ecart = altitude[i] - altitude[i - 1];
    if (ecart > 0.5) dPlus += ecart;
  }
  return Math.round(dPlus);
};
export const moyenne = (array) => {
  let somme = 0;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    somme += element;
  }
  return somme / array.length;
};

//Pour le site
// const lissageData = (dataArray, nbrMesureALisser) => {
//   let datasLissées = [];
//   for (let i = 0; i < dataArray.length; i++) {
//     if (i > dataArray.length - nbrMesureALisser - 1) {
//       datasLissées.push(dataArray[i]);
//     } else {
//       datasLissées.push(moyenne(dataArray.slice(i, nbrMesureALisser + i)));
//     }
//   }
//   return datasLissées;
// };
