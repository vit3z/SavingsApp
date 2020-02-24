import * as actionTypes from './actions';

const defaultState = {
  currentUser: {},
  currentData: [
    {
      id: 1,
      receiver: 'Company1',
      amount: 4.35
    },
    {
      id: 2,
      receiver: 'Company2',
      amount: 5.20
    },
    {
      id: 3,
      receiver: 'Company1',
      amount: 0.87
    }
  ],
  currentRoundup: null,
  currentGoals: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case actionTypes.SET_DATA:
      console.log('Reducer SET_DATA');
      console.log('SET_DATA PAYLOAD: ', action.payload);
      return {
        ...state,
        currentData: action.payload
      }
    case actionTypes.SET_ROUNDUP:
      console.log('Reducer SET_ROUNDUP');
      console.log('SET_ROUNDUP PAYLOAD: ', action.payload);
      return {
        ...state,
        currentRoundup: action.payload
      }
    case actionTypes.SET_GOAL:
      return {
        ...state,
        currentGoals: action.payload
      }
    default: return state
  }
}

export default reducer;
