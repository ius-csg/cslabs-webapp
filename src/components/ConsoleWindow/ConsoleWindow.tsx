import * as React from 'react';
import {ChangeEvent, Component, CSSProperties, RefObject} from 'react';
import {getClipboardFromEvent, log} from '../../util';
import {connect, getNewConsoleWindowId} from '../../api/rfb';
import {UserLabVm} from '../../types/UserLabVm';
import RFB from 'novnc-core';
import {acquireTicket} from '../../api';

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

const fullHeightStyles: CSSProperties = {
  display: 'flex',
  flex: '1 1 auto',
  flexFlow: 'column'
};

const consoleWindowStyles: CSSProperties = {
  position: 'relative',
  background: 'black',
  border: 'groove',
  ...fullHeightStyles
};

const wmksConsoleWindowStyles: CSSProperties = {
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column'
};

class ConsoleWindow extends Component<ConsoleContainerProps, ConsoleContainerState> {

  consoleWindowId: string = '';
  state: ConsoleContainerState = {width: 0, height: 0, pastedText: ''};
  ref: RefObject<HTMLDivElement>;
  consoleWindowRef: RefObject<HTMLDivElement>;
  private resizeEventHandler?: () => void;
  private pasteEventHandler?: (e: any) => boolean;
  private unmounted: boolean = false;

  constructor(props: ConsoleContainerProps) {
    super(props);
    this.consoleWindowId = getNewConsoleWindowId();
    this.ref = React.createRef();
    this.consoleWindowRef = React.createRef();
    window.addEventListener('beforeunload', this.beforeUnload);
  }

  get rfb() {
    return this.state.rfb;
  }

  beforeUnload = (ev: BeforeUnloadEvent) => {
    const prompt = 'Are you sure?';
    if (ev) {
      ev.returnValue = prompt;
    }
    return prompt;
  };

  connectVM = async () => {
    if (this.rfb) {
      return;
    }

    try {

      const ticketResponse = await acquireTicket(this.props.vm.id);
      this.setState({rfb: await connect(this.consoleWindowRef.current!, ticketResponse, () => {
        log('Disconnected');
        this.setState({rfb: undefined});
        setTimeout(() => this.connectVM(), 3000);
      })});
    } catch (e) {
      if(!this.unmounted) {
        setTimeout(() => this.connectVM(), 3000);
        log('Could not connect to vm', e);
      }
    }
  };


  componentWillUnmount(): void {
    log('unmount ' + this.consoleWindowId);
    this.destroy();
    window.removeEventListener('beforeunload', this.beforeUnload);
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
    this.unmounted = true;
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
      <div ref={this.ref} style={fullHeightStyles}>
        <div style={consoleWindowStyles}>
          <div ref={this.consoleWindowRef} id={this.consoleWindowId} className='wmksConsoleWindow' style={wmksConsoleWindowStyles}/>
        </div>
      </div>
    );
  }
}

export default ConsoleWindow;
