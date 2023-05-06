import * as types from "../actionTypes";
const initialState = {
  collects: [],
  collect: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_COLLECTS_SUCCESS:
      return {
        ...state, 
        collects: action.payload
      };
    case types.GET_COLLECTSBYID_SUCCESS:
      return {
        ...state, 
        collects: action.payload
      };
    case types.ADD_COLLECT_SUCCESS:
      return {
        ...state, 
        collects: collects.push(action.payload)
      };
   
    default:
      return state;
  }
};