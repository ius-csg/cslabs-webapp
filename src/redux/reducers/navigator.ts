import {combineReducers} from 'redux';
import {NavigationTypes} from '../types/actionTypes';
import {NavigationState} from '../types/NavigationState';
import Action from '../types/redux';


function currentPage(state: string = '', action: Action): string {
  if (action.type === NavigationTypes.NAVIGATE_TO_PAGE) {
    return action.data;
  } else {
    return state;
  }
}

export const navigator = combineReducers<NavigationState>({
  currentPage: currentPage
});
