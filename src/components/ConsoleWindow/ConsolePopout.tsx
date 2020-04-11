import {Component} from 'react';
import ReactDOM from 'react-dom';


interface Props {
  closeWindowPortal: () => void;
}

class ConsolePopout extends Component<Props> {
  private containerEl: HTMLDivElement;
  private externalWindow: Window | null;
  private shouldAsk = true;
  constructor(props: Props) {
    super(props);
    this.containerEl = document.createElement('div');
    this.externalWindow = null;
  }

  componentDidMount() {
    this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');

    this.externalWindow!.document.body.appendChild(this.containerEl);

    this.externalWindow!.document.title = 'VM Popout';

    this.externalWindow!.addEventListener('beforeunload', (ev: BeforeUnloadEvent) => {
      if(!this.shouldAsk) {
        return;
      }
      const prompt = 'Are you sure?';
      if (ev) {
        ev.returnValue = prompt;
      }
      return prompt;
    });
    this.externalWindow!.addEventListener('unload', () => {
      this.shouldAsk = false;
      this.props.closeWindowPortal();
    });
  }

  componentWillUnmount() {
    this.externalWindow!.close();
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.containerEl);
  }
}
export default ConsolePopout;
