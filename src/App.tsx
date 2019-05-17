import * as React from 'react';
import styles from './App.module.scss';
import * as Sentry from '@sentry/browser';
import Routes from './router/Routes';

// Configure Sentry
// Sentry.init({
//   dsn: ''
// });

interface AppProps {
}

class App extends React.Component<AppProps> {

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
      <div className={styles.app}>
        <Routes/>
      </div>
    );
  }
}

export default  App;
