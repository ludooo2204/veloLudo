import React, { useEffect, useState } from 'react';
import {View} from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';
export const Chart = ({dataBpm})=>{
//    const [datas,setDatas] = useState()
    // console.log('dataBpmFromParent');
    // console.log(dataBpm);
    if (dataBpm){
    let valuesFromParent = dataBpm.map((e)=>{return {y:e}})
    console.log('valuesFromParent');
    console.log(valuesFromParent);
    //  setDatas({data:{datasets:[{values:valuesFromParent}]}})
}
    return (
        <View style={{flex:1}}>
            <LineChart style={{flex:1}}
            data={data}
            />
        </View>

        )
}
// value = > [{y:1},{y:2},{y:4}]