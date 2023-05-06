import * as types from "../actionTypes";
const initialState = {
  checks:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_CHECKDATA_SUCCESS:
      return {
        ...state, 
        checks: action.payload
      };
    default:
      return state;
  }
};