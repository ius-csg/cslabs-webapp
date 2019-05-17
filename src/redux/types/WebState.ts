import {NavigationState} from './NavigationState';
import {RouterState} from 'connected-react-router';
import {BrowserState} from './BrowserState';

export type WebState = {
  navigator: NavigationState;
  router: RouterState;
  browser: BrowserState;
};
