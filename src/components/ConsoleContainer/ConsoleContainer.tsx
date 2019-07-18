import * as React from 'react';
import {log} from '../../util';
import {ChangeEvent, Component} from 'react';
import * as styles from './ConsoleContainer.module.scss';
import {acquireTicket} from '../../api';
import {connect, getNewConsoleWindowId} from '../../api/wkms';
import {WMKSObject} from '../../api/wmks';

interface ConsoleContainerProps {
  vms: string[];
}

class ConsoleContainer extends Component<ConsoleContainerProps> {

  wmks?: WMKSObject;
  consoleWindowId: string = '';
  state = {ticket: '', selectedVM: ''};

  constructor(props: ConsoleContainerProps) {
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

  selectionChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    log(event.currentTarget.value);
    this.setState({selectedVM: event.currentTarget.value});
  };

  render() {
    return (
      <div>
        {this.props.vms ?
        <select value={this.state.selectedVM} onChange={this.selectionChanged}>
          <option key='' value=''/>
          {this.props.vms.map(vm => (<option key={vm} value={vm}>{vm}</option>))}
        </select>
        : null}
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
