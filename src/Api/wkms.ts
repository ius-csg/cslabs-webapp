import {log} from '../util';
import {WMKSObject} from './wmks';

export const WMKS = window['WMKS'];

export function connect(htmlId: string, ticket: string): WMKSObject {
  const wmks = WMKS.createWMKS(htmlId, {})
    .register(WMKS.CONST.Events.CONNECTION_STATE_CHANGE,
      (event: any, data: any) => {
        if (data.state === WMKS.CONST.ConnectionState.CONNECTED) {
          log('connection	state	change	:	connected');
        }
      }) as WMKSObject;
  wmks.connect('wss://esxi.home.local/ticket/' + ticket);
  return wmks;
}

let incrementer = 0;

export function getNewConsoleWindowId() {
  incrementer++;
  return 'wmksConsoleWindow_' + incrementer;
}
