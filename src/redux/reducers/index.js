import { combineReducers } from 'redux';
import carReducer from './carReducer';
import collectReducer from './collectReducer';
import checkReducer from './checkReducer';
const rootReducer = combineReducers({
  cars:carReducer,
  collect:collectReducer,
  check: checkReducer
  
});

export default rootReducer;