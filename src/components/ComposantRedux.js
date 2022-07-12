import React, {useState, useEffect} from 'react';
import {Pressable, Text, View} from 'react-native';

//Voir pour utilisation CONNECT de react-
import {useSelector, useDispatch} from 'react-redux';

import {addCount, resetCount, addTodo} from '../redux/action';
const ComposantRedux = () => {
  const count = useSelector((state) => state.count);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <View style={{backgroundColor: 'white'}}>
      <Text>Count = {count}</Text>

      <Pressable onPress={() => dispatch(addCount())}>
        <Text>add Count</Text>
      </Pressable>
    </View>
  );
};

export default ComposantRedux;
