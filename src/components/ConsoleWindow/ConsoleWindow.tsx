import * as React from 'react';
import {ChangeEvent, Component} from 'react';
import {log} from '../../util';
import * as styles from './ConsoleWindow.module.scss';
import {acquireTicket} from '../../api';
import {connect, getNewConsoleWindowId} from '../../api/wkms';
import {WMKSObject} from '../../api/wmks';
import {VirtualMachine} from '../../types/VirtualMachine';
import {VMPowerState} from '../../types/VMPowerState';

interface ConsoleContainerProps {
  vms: VirtualMachine[];
}
interface ConsoleContainerState {
  selectedVM?: VirtualMachine;
  wmks: WMKSObject|undefined;
}

class ConsoleWindow extends Component<ConsoleContainerProps, ConsoleContainerState> {

  consoleWindowId: string = '';
  state: ConsoleContainerState = {selectedVM: undefined, wmks: undefined};

  constructor(props: ConsoleContainerProps) {
    super(props);
    this.consoleWindowId = getNewConsoleWindowId();
  }

  get wmks(): WMKSObject|undefined {
    return this.state.wmks;
  }

  connectVM = async () => {

    if (!this.state.selectedVM) {
      alert('You need to select a vm first.');
      return;
    }
    if (this.wmks) {
      this.destroy();
    }

    try {
      const ticket = await acquireTicket(this.state.selectedVM.name);
      this.setState({wmks: connect(this.consoleWindowId, ticket)});
    } catch (e) {
      log('Could not connect to vm', e);
    }
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
      this.setState({wmks: undefined});
    }
  };

  sendCtrlAltDelete = () => {
    if (this.wmks !== undefined) {
      this.wmks.sendCAD();
    }
  };

  selectionChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    const virtualMachine = this.props.vms.find(vm => vm.name === event.currentTarget.value);
    this.setState({selectedVM: virtualMachine});
  };

  getSelectedVmName = () => this.state.selectedVM ? this.state.selectedVM.name : '';

  render() {
    return (
      <div>
        {this.state.selectedVM ? <span className={styles['power-state']}>{this.state.selectedVM.powerState}</span> : null}
        {this.props.vms ?
        <select value={this.getSelectedVmName()} onChange={this.selectionChanged}>
          <option key='' value=''/>
          {this.props.vms.map(vm => (<option key={vm.name} value={vm.name}>{vm.name}</option>))}
        </select>
        : null}
        {this.state.selectedVM && this.state.selectedVM.powerState === VMPowerState.POWERED_ON ?
          <button onClick={this.connectVM}>Connect</button> : null}
        {this.wmks ?
          <div style={{display: 'inline-block'}}>
            <button onClick={this.disconnect}>Disconnect</button>
            <button onClick={this.destroy}>Destroy</button>
            <button onClick={this.sendCtrlAltDelete}>Send Ctrl + Alt + Delete</button>
          </div> : null}
        <div className={styles['wmks-console-window-container']}>
          <div id={this.consoleWindowId} className={styles['wmks-console-window']}/>
        </div>
      </div>
    );
  }
}

export default ConsoleWindow;
