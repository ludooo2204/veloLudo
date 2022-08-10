import {
  ADD_COUNT,
  RESET_COUNT,
  ADD_TODO,
  ADD_PARCOURS,
  ADD_LIST_PARCOURS,
  CHOOSE_PARCOURS,
} from './type';

//format initial du state global
const initialState = {
  todos: [],
  parcours: [],
  parcoursChoisi: null,
  villes: [
    [
      {id: '1', title: 'Sossay'},
      {id: '2', title: 'Orches'},
      {id: '3', title: 'Sérigny'},
      {id: '4', title: 'Saint Christophe'},
      {id: '5', title: 'Lencloitre'},
      {id: '6', title: 'Jaulnay'},
      {id: '7', title: 'Scorbé-clairvaux'},
      {id: '8', title: 'Naintré'},
      {id: '9', title: 'Leigné sur usseau'},
      {id: '10', title: 'Chatellerault'},
    ],
  ],
  count: 0,
};

// le reducer permet de manipuler les actions de la vue (composant React)
// on ne manipule jamais le state directement mais une copie (comme usestate)
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_COUNT:
      return {
        ...state,
        count: 0,
      };
    case ADD_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload], //new todos array
        // todos: state.todos.push(action.payload),
      };

    case ADD_PARCOURS:
      return {
        ...state,
        parcours: [...state.parcours, action.payload], //new todos array
      };
    case ADD_LIST_PARCOURS:
      return {
        ...state,
        parcours: action.payload, //new todos array
      };
    case CHOOSE_PARCOURS:
      return {
        ...state,
        parcoursChoisi: action.payload, //new todos array
      };

    default:
      return state;
  }
};
export default reducer;
