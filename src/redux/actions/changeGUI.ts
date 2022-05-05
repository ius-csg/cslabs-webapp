import Action from '../types/redux';
import {GUITypes} from '../types/actionTypes';
import {GUIState} from '../types/GUIState';

export const changeSelectedNode = (selectedNode: GUIState|null): Action => ({
  type: GUITypes.CHANGE_SELECTED,
  data: selectedNode
});

export default changeSelectedNode;
