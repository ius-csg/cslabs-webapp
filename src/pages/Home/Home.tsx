import * as React from 'react';
import {Component} from 'react';
import ConsoleContainer from '../../components/ConsoleContainer/ConsoleContainer';
import * as styles from './Home.module.scss';

class Home extends Component {

  render() {
    return  (
      <div className={styles.container}>
        <ConsoleContainer/>
        <ConsoleContainer/>
      </div>
    );
  }
}

export default Home;
