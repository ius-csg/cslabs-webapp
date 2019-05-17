
import {navigator} from './navigator';
import { connectRouter } from 'connected-react-router';
import {History} from 'history';
import {browser} from './browser';

/**
 * Purposefully only returning a plain object, combineReducers will be called later.
 * @param history
 */
const rootReducer = (history: History) => ({
  router: connectRouter(history),
  navigator: navigator,
  browser: browser
});
export default rootReducer;
