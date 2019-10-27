import RFB from 'novnc-core';

/**
 * Please Read NoVNC's documentation: https://github.com/novnc/noVNC/blob/master/docs/API.md
 */

import {log, logError} from '../util';
import {TicketResponse} from './index';

export function connect(htmlId: string, ticketResponse: TicketResponse, vmid: number) {
  try {
    const rfb = new RFB(document.getElementById(htmlId) as any,
      // @ts-ignore
      `wss://192.168.1.2:8006/api2/json/nodes/a1/qemu/${vmid}/vncwebsocket?port=${ticketResponse.port}&vncticket=${encodeURIComponent(ticketResponse.ticket)}`);
    rfb.scaleViewport = true;
    rfb.addEventListener('connect', () => log('connect'));
    rfb.addEventListener('disconnect', () => log('disconnect'));
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
