import {log} from '../util';
import {WMKSObject} from './wmks';

export const WMKS = window['WMKS'];

/**
 *
 * @param htmlId
 * @param ticket
 * @throws Error
 */
export function connect(htmlId: string, ticket: string): WMKSObject {
  const wmks: WMKSObject = WMKS.createWMKS(htmlId, {})
    .register(WMKS.CONST.Events.CONNECTION_STATE_CHANGE,
      (event: any, data: any) => {
        if (data.state === WMKS.CONST.ConnectionState.CONNECTED) {
          log('connection	state	change	:	connected');
        }
      })
    .register(WMKS.CONST.Events.ERROR, (event: any, data: any) => log('ConsoleError: ', data, event));
  wmks.connect('wss://esxi.home.local/ticket/' + ticket);
  return wmks;
}

let incrementer = 0;

export function getNewConsoleWindowId() {
  incrementer++;
  return 'wmksConsoleWindow_' + incrementer;
}
