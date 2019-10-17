import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {info} from '../../util';
import {Reducer} from 'redux';

const persistConfig = {
  key: 'root',
  storage
};

export function persistRootReducer(rootReducer: Reducer) {
  return persistReducer(persistConfig, rootReducer);
}

export function persistGlobalStore(store: any, onReady?: () => void) {
  return persistStore(store, null, () => {
    info('Store Re-hydrated. See state in redux dev-tools');
    if (onReady) {
      onReady();
    }
  });
}
