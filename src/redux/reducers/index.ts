
import {navigator} from './navigator';
import { connectRouter } from 'connected-react-router';
import {History} from 'history';
import {browser} from './browser';
import entities from './entities';
import gui from './gui';

/**
 * Purposefully only returning a plain object, combineReducers will be called later.
 * @param history
 */
const rootReducer = (history: History) => ({
  router: connectRouter(history),
  navigator: navigator,
  browser: browser,
  entities: entities,
  gui: gui
});
export default rootReducer;
