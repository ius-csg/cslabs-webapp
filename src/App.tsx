import * as React from 'react';
import * as Sentry from '@sentry/browser';
import Routes from './router/Routes';
import {CapsLockContextProvider} from './components/CapsLockContext/CapsLockContext';

// Configure Sentry
// Sentry.init({
//   dsn: ''
// });

class App extends React.Component {

  throwError = () => {
    throw new Error('This is an error to test Sentry');
  };

  componentDidCatch(error: any, errorInfo: any) {
    // @see https://docs.sentry.io/platforms/javascript/react/
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  public render() {
    return (
      <CapsLockContextProvider>
        <Routes/>
      </CapsLockContextProvider>
    );
  }
}

export default  App;
