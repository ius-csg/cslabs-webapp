import * as React from 'react';
import {ChangeEvent, Component, RefObject} from 'react';
import {getClipboardFromEvent, log} from '../../util';
import * as styles from './ConsoleWindow.module.scss';
// import {acquireTicket} from '../../api';
import {connect, getNewConsoleWindowId} from '../../api/rfb';
import {VirtualMachine} from '../../types/VirtualMachine';
import {VMPowerState} from '../../types/VMPowerState';
import {Button, FormControl, InputGroup} from 'react-bootstrap';
import RFB from 'novnc-core';

interface ConsoleContainerProps {
  vm: VirtualMachine;
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

  constructor(props: ConsoleContainerProps) {
    super(props);
    this.consoleWindowId = getNewConsoleWindowId();
    this.ref = React.createRef();
  }

  get rfb() {
    return this.state.rfb;
  }

  connectVM = async () => {
    if (this.rfb) {
      return;
    }

    try {
      // const ticket = await acquireTicket(this.props.vm.id);
      this.setState({rfb: connect(this.consoleWindowId, 'PVEVNC:5DB52A0E::jdaBvvi+nVw18my9ZfUr5L2AwNACHW5U1D6Gf96O/xZhTvAWDw8JHxwWk9As9BBemSzDtpWnz8//Bet0/Xk1nVNsjYkisvfiUNAGYZ5GGy2cQL7UIoE83kjEtWO2NhyHw0iRNM6aplnDVqQwbAK6SelwyCQyHfpSqD6SEWaWmjpTuzKmZbKPeHFSVjjTFtlSq7OGoLjCPYPiJccxg7HdTb3N2XoePLE0XaXtwrBK6DBxeezwEnLqn0DPdmrcau0t19BOCQBb+Mp4iUbgWuPj7E2a/E9vNEzXkn5pmZtmZqn+0EETk4QRxFDviV0yoFb7IRTW/OgO/GMeS2pYCXh2cA==', 100)});
    } catch (e) {
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
      log(this.rfb);
      this.rfb.disconnect();
    }
  };

  destroy = () => {
    if (this.rfb) {
      log(this.rfb);
      this.rfb.disconnect();
      this.setState({rfb: undefined});
    }
  };

  sendCtrlAltDelete = () => {
    if (this.rfb !== undefined) {
      this.rfb.sendCtrlAltDel();
    }
  };

  componentDidMount(): void {
    const div: HTMLDivElement = this.ref.current as HTMLDivElement;
    this.setSize(div.offsetWidth, async () => {
      if (this.props.vm.powerState === VMPowerState.POWERED_ON) {
        await this.connectVM();
      }
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
      // this.rfb.sendKey(this.state.pastedText);
    }
  };

  onPastedTextChange = (event: any) =>
    this.setState({pastedText: (event as ChangeEvent<HTMLInputElement>).currentTarget.value});

  onClear = () => this.setState({pastedText: ''});

  render() {

    return (
      <div ref={this.ref}>
          {this.rfb ?
            <div className={styles['controls']}>
              <Button size='sm' onClick={this.sendCtrlAltDelete}>Send Ctrl + Alt + Delete</Button>
              <InputGroup className='ml-1' style={{width: 340}}>
                <InputGroup.Prepend><Button onClick={this.onClear} variant='secondary'>Clear</Button></InputGroup.Prepend>
                <FormControl value={this.state.pastedText} style={{textAlign: 'center'}} onChange={this.onPastedTextChange} placeholder='paste text' />
                <InputGroup.Append><Button onClick={this.onPaste} variant='secondary'>Send to vm</Button></InputGroup.Append>
              </InputGroup>
            </div> : null}
        <div className={styles['wmks-console-window-container']} style={{width: this.state.width, height: this.state.height}}>
          <div id={this.consoleWindowId} style={{width: this.state.width, height: this.state.height}}/>
        </div>
      </div>
    );
  }
}

export default ConsoleWindow;
