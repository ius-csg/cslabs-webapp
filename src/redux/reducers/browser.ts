import {combineReducers} from 'redux';
import {BrowserTypes} from '../types/actionTypes';
import {WindowState} from '../types/BrowserState';
import Action from '../types/redux';

function windowSize(state: WindowState, action: Action) {
  switch (action.type) {
    case BrowserTypes.SCREEN_RESIZE:
      return {
        ...state, ...action.data.windowSize
      };
    default:
      return {
        ...state
      };
  }
}

export const browser = combineReducers({windowSize});
