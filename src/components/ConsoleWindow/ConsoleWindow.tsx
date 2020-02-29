import * as React from 'react';
import {ChangeEvent, Component, RefObject} from 'react';
import {combineClasses, getClipboardFromEvent, log} from '../../util';
import * as styles from './ConsoleWindow.module.scss';
// import {acquireTicket} from '../../api';
import {connect, getNewConsoleWindowId} from '../../api/rfb';
import {UserLabVm} from '../../types/UserLabVm';
// import {VMPowerState} from '../../types/VMPowerState';
import RFB from 'novnc-core';
import {acquireTicket} from '../../api';
import ConsolePopout from '../ConsoleWindow/ConsolePopout';

interface ConsoleContainerProps {
  vm: UserLabVm;
  status: string;
}
interface ConsoleContainerState {
  rfb?: RFB;
  width: number;
  height: number;
  pastedText: string;
}

class ConsoleWindow extends Component<ConsoleContainerProps, ConsoleContainerState> {

  consoleWindowId: string = '';
  state: ConsoleContainerState = {width: 0, height: 0, pastedText: ''};
  ref: RefObject<HTMLDivElement>;
  private resizeEventHandler?: () => void;
  private pasteEventHandler?: (e: any) => boolean;
  private showWindowPortal: boolean;

  constructor(props: ConsoleContainerProps) {
    super(props);
    this.consoleWindowId = getNewConsoleWindowId();
    this.ref = React.createRef();
    this.state = {
      showWindowPortal: false
    };

    this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
    this.closeWindowPortal = this.closeWindowPortal.bind(this);
  }

  get rfb() {
    return this.state.rfb;
  }

  connectVM = async () => {
    if (this.rfb) {
      return;
    }

    try {
      const ticketResponse = await acquireTicket(this.props.vm.id);
      this.setState({rfb: connect(this.consoleWindowId, ticketResponse, () => {
        log('Disconnected');
        this.setState({
          rfb: undefined
        });
        setTimeout(() => this.connectVM(), 3000);
      })});
    } catch (e) {
      setTimeout(() => this.connectVM(), 3000);
      log('Could not connect to vm', e);
    }
  };


  componentWillUnmount(): void {
    log('unmount ' + this.consoleWindowId);
    this.destroy();
    const div: HTMLDivElement = this.ref.current as HTMLDivElement;
    if (this.resizeEventHandler) {
      div.removeEventListener('resize', this.resizeEventHandler);
    }
    if (this.pasteEventHandler) {
      div.removeEventListener('paste', this.pasteEventHandler);
    }

  }

  disconnect = () => {
    if (this.rfb) {
      this.rfb.disconnect();
    }
  };

  destroy = () => {
    this.disconnect();
  };

  sendCtrlAltDelete = () => {
    if (this.rfb !== undefined) {
      this.rfb.sendCtrlAltDel();
    }
  };

  componentDidMount(): void {
    const div: HTMLDivElement = this.ref.current as HTMLDivElement;
    this.setSize(div.offsetWidth, async () => {
      // if (this.props.vm.powerState === VMPowerState.POWERED_ON) {
      //
      // }
      await this.connectVM();
    });

    this.resizeEventHandler = () => this.setSize(div.offsetWidth);
    div.addEventListener('resize', this.resizeEventHandler);

    this.pasteEventHandler = (e: any) => {
      if (this.rfb !== undefined) {

        this.rfb.clipboardPasteFrom(getClipboardFromEvent(e));
      }
      return false; // Prevent the default handler from running.
    };

    div.addEventListener('paste', this.pasteEventHandler);
  }

  toggleWindowPortal() {
    this.setState(state => ({
      ...state,
      showWindowPortal: !state.showWindowPortal,
    }));
  }

  closeWindowPortal() {
    this.setState({ showWindowPortal: false });
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

  onPaste = () => {
    if (this.rfb) {
      log('pasting');
      this.rfb.clipboardPasteFrom(this.state.pastedText);
    }
  };

  onPastedTextChange = (event: any) =>
    this.setState({pastedText: (event as ChangeEvent<HTMLInputElement>).currentTarget.value});

  onClear = () => this.setState({pastedText: ''});

  render() {

    return (
      <div ref={this.ref} className='full-height-container'>
        <div
          className={combineClasses(styles['wmks-console-window-container'], 'full-height-container')}
        >
          <div id={this.consoleWindowId} className='fill-height'/>
        </div>
        <button onClick={this.toggleWindowPortal}>
          {this.state.showWindowPortal ? 'Close the' : 'Open a'} Portal
        </button>
        {this.state.showWindowPortal && (
          <ConsolePopout>
            <div
              className={combineClasses(styles['wmks-console-window-container'], 'full-height-container')}
            >
              <div id={this.consoleWindowId} className='fill-height'/>
            </div>

            <button onClick={() => this.closeWindowPortal()} >
              Close me!
            </button>
          </ConsolePopout>
        )}
      </div>
    );
  }
}

export default ConsoleWindow;
