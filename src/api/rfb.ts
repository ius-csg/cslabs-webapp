import RFB from 'novnc-core';

/**
 * Please Read NoVNC's documentation: https://github.com/novnc/noVNC/blob/master/docs/API.md
 */

import {log, logError} from '../util';
import {TicketResponse} from './index';

export function connect(element: HTMLDivElement, ticketResponse: TicketResponse, onDisconnect: () => void) {
  try {
    const rfb = new RFB(element as any,
      // @ts-ignore
      ticketResponse.url);
    rfb.scaleViewport = true;
    rfb.resizeSession = true;
    rfb.addEventListener('connect', () => log('connect'));
    rfb.addEventListener('disconnect', () => onDisconnect());
    rfb.addEventListener('credentialsrequired', () => {
      rfb.sendCredentials({
        username: ticketResponse.user,
        password: ticketResponse.ticket
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
