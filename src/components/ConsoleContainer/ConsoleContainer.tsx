import * as React from 'react';
import {log} from '../../util';
import {ChangeEvent, Component} from 'react';
import * as styles from './ConsoleContainer.module.scss';
import {acquireTicket, listVms} from '../../Api';
import {connect, getNewConsoleWindowId} from '../../Api/wkms';
import {WMKSObject} from '../../Api/wmks';

class ConsoleContainer extends Component {

  wmks?: WMKSObject;
  consoleWindowId: string = '';
  state = {ticket: '', vms: [], selectedVM: ''};

  constructor(props: {}) {
    super(props);
    this.consoleWindowId = getNewConsoleWindowId();
  }

  connectVM = () => {

    if (this.state.selectedVM === '') {
      alert('You need to select a vm first.');
      return;
    }

    acquireTicket(this.state.selectedVM).then(ticket => {
      this.setState({ticket: ticket});
      this.wmks = connect(this.consoleWindowId, this.state.ticket);
    });
  };

  disconnect = () => {
    if (this.wmks) {
      log(this.wmks);
      this.wmks.disconnect();
    }
  };

  destroy = () => {
    if (this.wmks) {
      log(this.wmks);
      this.wmks.destroy();
    }
  };

  sendCtrlAltDelete = () => {
    if (this.wmks !== undefined) {
      this.wmks.sendCAD();
    }
  };

  async componentDidMount() {
    this.setState({vms: await listVms()});
  }

  selectionChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    log(event.currentTarget.value);
    this.setState({selectedVM: event.currentTarget.value});
  };

  render() {
    return (
      <div>
        <select value={this.state.selectedVM} onChange={this.selectionChanged}>
          <option key='' value=''/>
          {this.state.vms.map(vm => (<option key={vm} value={vm}>{vm}</option>))}
        </select>
        <button onClick={this.connectVM}>Connect</button>
        <button onClick={this.disconnect}>Disconnect</button>
        <button onClick={this.destroy}>Destroy</button>
        <button onClick={this.sendCtrlAltDelete}>Send Ctrl + Alt + Delete</button>
        <div className={styles['wmks-console-window-container']}>
          <div id={this.consoleWindowId} className={styles['wmks-console-window']}/>
        </div>
      </div>
    );
  }
}

export default ConsoleContainer;
