import * as React from 'react';
import {log} from '../../util';
import {ChangeEvent, Component} from 'react';
import * as styles from './Home.module.scss';
import {acquireTicket, listVms} from '../../Api';

let wmks: any = null;

class Home extends Component {

  state = { ticket: '', vms: [], selectedVM: '' };

  onChange = (event: ChangeEvent<HTMLInputElement>) =>
    this.setState({ ticket: event.target.value});

  connectVM = () => {
    if (this.state.selectedVM === '') {
      alert('You need to select a vm first.');
      return;
    }
    if (this.state.ticket.length === 0 ) {
      acquireTicket(this.state.selectedVM).then(ticket => {
        this.setState({ticket: ticket});
        initVM(this.state.ticket);
      });
      return;
    }
    initVM(this.state.ticket);
  };

  sendCtrlAltDelete = () => {
    if (wmks !== null) {
      wmks.sendCAD();
    }
  };

  async componentDidMount() {
    const vms =  await listVms();
    console.log(vms);
    this.setState({vms: vms});
  }

  selectionChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.currentTarget.value);
    this.setState({selectedVM: event.currentTarget.value});
  };

  render() {
    return  (
      <div>
        <select value={this.state.selectedVM} onChange={this.selectionChanged}>
          <option key='' value=''></option>
          {this.state.vms.map(vm => (<option key={vm} value={vm}>{vm}</option>))}
        </select>
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
