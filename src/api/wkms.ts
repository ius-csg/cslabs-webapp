import {log} from '../util';
import {WMKSObjectFactory, WMKSObject} from './wmks';

export const WMKSFactory: WMKSObjectFactory = window['WMKS'];
export const WMKS = window['WMKS'];

/**
 *
 * @param htmlId
 * @param ticket
 * @throws Error
 */
export function connect(htmlId: string, ticket: string): WMKSObject {
  const wmks: WMKSObject = WMKSFactory.createWMKS(htmlId)
    .register(WMKS.CONST.Events.CONNECTION_STATE_CHANGE,
      (event: any, data: any) => {
        if (data.state === WMKS.CONST.ConnectionState.CONNECTED) {
          log('connection	state	change	:	connected');
        }
      })
    .register(WMKS.CONST.Events.ERROR, (event: any, data: any) => log('ConsoleError: ', data, event));
  wmks.connect('wss://websocket.home.local/ticket/' + ticket);
  return wmks;
}

let incrementer = 0;

export function getNewConsoleWindowId() {
  incrementer++;
  return 'wmksConsoleWindow_' + incrementer;
}
