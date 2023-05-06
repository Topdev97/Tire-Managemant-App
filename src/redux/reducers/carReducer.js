import * as types from "../actionTypes";
const initialState = {
  cars: [],
  car: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_CARINFO_SUCCESS:
      return {
        ...state, 
        car: action.payload
      };
    case types.GET_CARSINFO_SUCCESS:
      return {
        ...state, 
        cars: action.payload
      };
    default:
      return state;
  }
};