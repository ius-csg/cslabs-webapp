// tslint:disable-next-line
import 'babel-polyfill';
import './types.d';
import * as React from 'react';
import App from './App';
// tslint:disable-next-line
import './index.scss';
import * as serviceWorker from './registerServiceWorker';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './redux/store';

const store: any = configureStore();
render((
  <Provider store={store}>
    <App/>
   </Provider>
 ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
