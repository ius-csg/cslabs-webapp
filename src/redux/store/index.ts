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
// @ts-ignore
  const composeEnhancers: typeof compose = (typeof window !== 'undefined' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) || compose;
  const storeInstance = createStore(
    root,
    initialState,
    // Code smell on this
    composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<WebState, AnyAction>, routerMiddleware(history)))
  );
  const persistorInstance = persistGlobalStore(storeInstance, onReady);
  storeInstance.dispatch(initBrowser());
  return { store: storeInstance, persistor: persistorInstance, appDispatch: storeInstance.dispatch};
};

export const {store, persistor, appDispatch } = configureStore();
