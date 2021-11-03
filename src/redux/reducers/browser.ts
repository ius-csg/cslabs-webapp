import {combineReducers} from 'redux';
import {BrowserTypes} from '../types/actionTypes';
import {WindowState} from '../types/BrowserState';
import Action from '../types/redux';

// Code smell on this function signature
function windowSize(state: WindowState = {height: NaN, width: NaN}, action: Action) {
  if (action.type === BrowserTypes.SCREEN_RESIZE) {
    return {
      ...state, ...action.data.windowSize
    };
  } else {
    return state;
  }
}

export const browser = combineReducers({windowSize});
