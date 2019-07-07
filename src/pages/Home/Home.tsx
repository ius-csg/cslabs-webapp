import * as React from 'react';
import {log} from '../../util';
import {ChangeEvent, Component} from 'react';
import * as styles from './Home.module.scss';

let wmks: any = null;

class Home extends Component {

  state = { ticket: '' };

  onChange = (event: ChangeEvent<HTMLInputElement>) =>
    this.setState({ ticket: event.target.value});

  connectVM = () => {
    if (this.state.ticket.length === 0 ) {
      alert('Ticket must be entered');
      return;
    }
    initVM(this.state.ticket);
  };

  sendCtrlAltDelete = () => {
    if (wmks !== null) {
      wmks.sendCAD();
    }
  };

  render() {
    return  (
      <div>
        <input type='text' value={this.state.ticket} onChange={this.onChange} />
        <button onClick={this.connectVM}>Connect</button>
        <button onClick={this.sendCtrlAltDelete}>Send Ctrl + Alt + Delete</button>
        <div className={styles['wmks-console-window-container']}>
          <div id='wmksConsoleWindow'  className={styles['wmks-console-window']}/>
        </div>
      </div>
    );
  }
}

function initVM(ticket: string) {
  const WMKS = window['WMKS'];
  log(WMKS);
  wmks = WMKS.createWMKS('wmksConsoleWindow', {})
    .register(WMKS.CONST.Events.CONNECTION_STATE_CHANGE,
      (event: any, data: any) => {
        if (data.state === WMKS.CONST.ConnectionState.CONNECTED) {
          log('connection	state	change	:	connected');
        }
      });
  wmks.connect('wss://esxi.home.local/ticket/' + ticket);
}

export default Home;
