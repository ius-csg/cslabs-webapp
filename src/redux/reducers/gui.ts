import {GUITypes} from '../types/actionTypes';
import {GUIState} from '../types/GUIState';
import Action from '../types/redux';

export default function selectID(state: GUIState = {selectedID: ''}, action: Action) {
  switch (action.type) {
    case GUITypes.CHANGE_SELECTED:
      return action.data;
    default:
      return state;
  }
}

