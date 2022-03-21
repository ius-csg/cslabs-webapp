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
    // @ts-ignore
    rfb.scaleViewport = true;
    // @ts-ignore
    rfb.resizeSession = true;
    // @ts-ignore
    rfb.addEventListener('connect', () => log('connect')); 
    // @ts-ignore
    rfb.addEventListener('disconnect', () => onDisconnect());
    // @ts-ignore
    rfb.addEventListener('credentialsrequired', () => {
      // @ts-ignore
      rfb.sendCredentials({
        username: ticket.user,
        password: ticket.ticket
      });
      log('credentialsrequired');
    });
    // @ts-ignore
    rfb.addEventListener('securityfailure', (e: any) => log({messsage: 'securityfailure', ...e}));
    // @ts-ignore
    rfb.addEventListener('clipboard', () => log('clipboard'));
    // @ts-ignore
    rfb.addEventListener('bell', () => log('bell'));
    // @ts-ignore
    rfb.addEventListener('desktopname', () => log('desktopname'));
    // @ts-ignore
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
