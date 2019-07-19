import * as React from 'react';
import {Component, RefObject} from 'react';
import {log} from '../../util';
import * as styles from './ConsoleWindow.module.scss';
import {acquireTicket} from '../../api';
import {connect, getNewConsoleWindowId} from '../../api/wkms';
import {WMKSObject} from '../../api/wmks';
import {VirtualMachine} from '../../types/VirtualMachine';
import {VMPowerState} from '../../types/VMPowerState';
import {Button} from 'react-bootstrap';

interface ConsoleContainerProps {
  vm: VirtualMachine;
}
interface ConsoleContainerState {
  wmks: WMKSObject|undefined;
  width: number;
  height: number;
}

class ConsoleWindow extends Component<ConsoleContainerProps, ConsoleContainerState> {

  consoleWindowId: string = '';
  state: ConsoleContainerState = {wmks: undefined, width: 0, height: 0};
  ref: RefObject<HTMLDivElement>;

  constructor(props: ConsoleContainerProps) {
    super(props);
    this.consoleWindowId = getNewConsoleWindowId();
    this.ref = React.createRef();
  }

  get wmks(): WMKSObject|undefined {
    return this.state.wmks;
  }

  connectVM = async () => {
    if (this.wmks) {
      this.destroy();
    }

    try {
      const ticket = await acquireTicket(this.props.vm.name);
      this.setState({wmks: connect(this.consoleWindowId, ticket)});
    } catch (e) {
      log('Could not connect to vm', e);
    }
  };

  componentWillUnmount(): void {
    log('unmount ' + this.consoleWindowId);
    this.destroy();
  }

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

  componentDidMount(): void {
    const div: HTMLDivElement = this.ref.current as HTMLDivElement;
    this.setSize(div.offsetWidth, async () => {
      if (this.props.vm.powerState === VMPowerState.POWERED_ON) {
        await this.connectVM();
      }
    });
    div.addEventListener('resize', () => this.setSize(div.offsetWidth));
  }

  setSize(parentWidth: number, after?: () => void) {
    parentWidth = parentWidth * .75;
    let height = parentWidth * .75;
    if (height > (window.innerHeight * .75)) {
      height = window.innerHeight  * .75;
      parentWidth = height * 1.25;
    }
    this.setState({width: parentWidth, height: height}, after);
  }

  render() {
    return (
      <div ref={this.ref}>
          {this.wmks ?
            <div>
              <Button onClick={this.sendCtrlAltDelete}>Send Ctrl + Alt + Delete</Button>
            </div> : null}
        <div className={styles['wmks-console-window-container']} style={{width: this.state.width, height: this.state.height}}>
          <div id={this.consoleWindowId} style={{width: this.state.width, height: this.state.height}}/>
        </div>
      </div>
    );
  }
}

export default ConsoleWindow;
