import {combineReducers} from 'redux';
import {NavigationTypes} from '../types/actionTypes';
import {NavigationState} from '../types/NavigationState';
import Action from '../types/redux';

function currentPage(state: string = '', action: Action): string {
  switch (action.type) {
    case NavigationTypes.NAVIGATE_TO_PAGE:
      return action.data;
    default:
      return state;
  }
}

export const navigator = combineReducers<NavigationState>({
  currentPage: currentPage
});
