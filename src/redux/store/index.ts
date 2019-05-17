import {applyMiddleware, combineReducers, compose, createStore, DeepPartial} from 'redux';
import rootReducer from '../reducers';
import {routerMiddleware} from 'connected-react-router';
import {WebState} from '../types/WebState';
import history from '../../router/history';
import {initBrowser} from '../actions/browser';
import thunk from 'redux-thunk';

const configureStore = (initialState?: DeepPartial<WebState>) => {
  const root = combineReducers(rootReducer(history));
  const store = createStore(
    root,
    initialState,
    compose(applyMiddleware(thunk, routerMiddleware(history)))
  );
  // @ts-ignore
  store.dispatch(initBrowser());
  return store;
};

export default configureStore;
