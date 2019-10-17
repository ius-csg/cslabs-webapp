import {NavigationState} from './NavigationState';
import {RouterState} from 'connected-react-router';
import {BrowserState} from './BrowserState';
import {User} from '../../types/User';

export type WebState = {
  navigator: NavigationState;
  router: RouterState;
  browser: BrowserState;
  entities: {
    currentUser: User;
  };
};
