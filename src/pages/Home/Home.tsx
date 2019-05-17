import * as React from 'react';
import {log} from '../../util';
import {Component} from 'react';

class Home extends Component {

  componentDidMount(): void {
    initVM();
  }

  render() {
    return  (
      <div id='wmksContainer'>
        Hello
      </div>
    );
  }
}

function initVM() {
  const WMKS = window['WMKS'];
  log(WMKS);
  const	wmks = window['WMKS'].createWMKS('wmksContainer', {})
    .register(WMKS.CONST.Events.CONNECTION_STATE_CHANGE,
      (event: any, data: any) => {
        if (data.state === WMKS.CONST.ConnectionState.CONNECTED) {
          log('connection	state	change	:	connected');
        }
      });
  // wmks.connect('ws://127.0.0.1:8080');
}

export default Home;
