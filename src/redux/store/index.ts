import {AnyAction, applyMiddleware, combineReducers, compose, createStore, DeepPartial} from 'redux';
import rootReducer from '../reducers';
import {routerMiddleware} from 'connected-react-router';
import {WebState} from '../types/WebState';
import history from '../../router/history';
import {initBrowser} from '../actions/browser';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import {persistGlobalStore, persistRootReducer} from './persistance';

const configureStore = (initialState?: DeepPartial<WebState>, onReady?: () => void) => {
  const root = persistRootReducer(combineReducers(rootReducer(history)));

  const store = createStore(
    root,
    initialState,
    compose(applyMiddleware(thunk as ThunkMiddleware<WebState, AnyAction>, routerMiddleware(history)))
  );
  const persistor = persistGlobalStore(store, onReady);
  store.dispatch(initBrowser());
  return { store, persistor};
};

export default configureStore;
