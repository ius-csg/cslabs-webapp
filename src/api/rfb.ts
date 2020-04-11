import RFB from 'novnc-core';

/**
 * Please Read NoVNC's documentation: https://github.com/novnc/noVNC/blob/master/docs/API.md
 */

import {log, logError} from '../util';
import {isFastConnectionAvailable, TicketResponse} from './index';

export async function connect(element: HTMLDivElement, ticket: TicketResponse, onDisconnect: () => void) {
  try {
    const fastConnectionAvailable = await isFastConnectionAvailable(ticket);
    const url = `wss://${fastConnectionAvailable ? ticket.fastBaseUrl : ticket.reliableBaseUrl}${ticket.url}`;
    const rfb = new RFB(element as any,
      // @ts-ignore
      url);
    rfb.scaleViewport = true;
    rfb.addEventListener('connect', () => log('connect'));
    rfb.addEventListener('disconnect', () => onDisconnect());
    rfb.addEventListener('credentialsrequired', () => {
      rfb.sendCredentials({
        username: ticket.user,
        password: ticket.ticket
      });
      log('credentialsrequired');
    });
    rfb.addEventListener('securityfailure', (e: any) => log({messsage: 'securityfailure', ...e}));
    rfb.addEventListener('clipboard', () => log('clipboard'));
    rfb.addEventListener('bell', () => log('bell'));
    rfb.addEventListener('desktopname', () => log('desktopname'));
    rfb.addEventListener('capabilities', () => log('capabilities'));
    return rfb;
  } catch (exc) {
    logError('Unable to create RFB client -- ' + exc, 'error');
    return;
  }
}

let incrementer = 0;

export function getNewConsoleWindowId() {
  incrementer++;
  return 'wmksConsoleWindow_' + incrementer;
}
