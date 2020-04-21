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
    this.containerEl.style.minHeight = '100vh';
    this.containerEl.style.flexFlow = 'column';
    this.containerEl.style.display = 'flex';
    this.externalWindow = null;
  }

  createStyle() {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(`
      .wmksConsoleWindow > div {
        flex-grow: 1;
      }
      .wmksConsoleWindow > div > canvas {
         width: auto !important;
         height: 97vh !important;
      }
    `));
    return style;
  }

  componentDidMount() {
    this.externalWindow = window.open('', '', 'width=800,height=600,left=200,top=200');
    this.externalWindow!.document.body.style.margin = '0';
    this.externalWindow!.document.body.appendChild(this.createStyle());
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
