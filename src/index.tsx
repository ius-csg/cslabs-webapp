// tslint:disable-next-line
// import 'babel-polyfill';
// tslint:disable-next-line
import 'react-app-polyfill/ie11';
import './types.d';
import * as React from 'react';
import App from './App';
// tslint:disable-next-line
import './index.scss';
import * as serviceWorker from './registerServiceWorker';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { store, persistor } from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {configureFontAwesome} from './font-awesome-config';

configureFontAwesome();

render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
   </Provider>
 ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
