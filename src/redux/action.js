//ce fichier action permet de simplifier l'appel a la fonction addCount dans la vue

import {
  ADD_COUNT,
  RESET_COUNT,
  ADD_TODO,
  ADD_PARCOURS,
  ADD_LIST_PARCOURS,
  CHOOSE_PARCOURS,
} from './type';

export const addCount = () => {
  return {
    type: ADD_COUNT,
  };
};
export const chooseParcours = (payload) => {
  return {
    type: CHOOSE_PARCOURS,
    payload,
  };
};
export const resetCount = () => {
  return {
    type: RESET_COUNT,
  };
};
export const addTodo = (payload) => {
  return {
    type: ADD_TODO,
    payload,
  };
};
export const addParcours = (payload) => {
  return {
    type: ADD_PARCOURS,
    payload,
  };
};
export const addListeParcours = (payload) => {
  return {
    type: ADD_LIST_PARCOURS,
    payload,
  };
};
