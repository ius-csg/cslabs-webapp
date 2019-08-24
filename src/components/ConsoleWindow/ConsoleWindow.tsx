import * as React from 'react';
import {ChangeEvent, Component, RefObject} from 'react';
import {getClipboardFromEvent, log} from '../../util';
import * as styles from './ConsoleWindow.module.scss';
import {acquireTicket} from '../../api';
import {connect, getNewConsoleWindowId} from '../../api/wkms';
import {WMKSObject} from '../../api/wmks';
import {VirtualMachine} from '../../types/VirtualMachine';
import {VMPowerState} from '../../types/VMPowerState';
import {Button, FormControl, InputGroup} from 'react-bootstrap';

interface ConsoleContainerProps {
  vm: VirtualMachine;
}
interface ConsoleContainerState {
  wmks: WMKSObject|undefined;
  width: number;
  height: number;
  pastedText: string;
}

class ConsoleWindow extends Component<ConsoleContainerProps, ConsoleContainerState> {

  consoleWindowId: string = '';
  state: ConsoleContainerState = {wmks: undefined, width: 0, height: 0, pastedText: ''};
  ref: RefObject<HTMLDivElement>;
  private resizeEventHandler?: () => void;
  private pasteEventHandler?: (e: any) => boolean;

  constructor(props: ConsoleContainerProps) {
    super(props);
    this.consoleWindowId = getNewConsoleWindowId();
    this.ref = React.createRef();
  }

  get wmks(): WMKSObject {
    return this.state.wmks as WMKSObject;
  }

  connectVM = async () => {
    if (this.wmks) {
      return;
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
    const div: HTMLDivElement = this.ref.current as HTMLDivElement;
    if (this.resizeEventHandler) {
      div.removeEventListener('resize', this.resizeEventHandler);
    }
    if (this.pasteEventHandler) {
      div.removeEventListener('paste', this.pasteEventHandler);
    }

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

    this.resizeEventHandler = () => this.setSize(div.offsetWidth);
    div.addEventListener('resize', this.resizeEventHandler);

    this.pasteEventHandler = (e: any) => {
      this.wmks.sendInputString(getClipboardFromEvent(e));
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

  onPaste = () => this.wmks.sendInputString(this.state.pastedText);

  onPastedTextChange = (event: any) =>
    this.setState({pastedText: (event as ChangeEvent<HTMLInputElement>).currentTarget.value});

  onClear = () => this.setState({pastedText: ''});

  render() {

    return (
      <div ref={this.ref}>
          {this.wmks ?
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
