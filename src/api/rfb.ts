import RFB from 'novnc-core';

/**
 * Please Read NoVNC's documentation: https://github.com/novnc/noVNC/blob/master/docs/API.md
 */

import {log} from '../util';

export function connect(htmlId: string, ticket: string, vmid: number) {
  try {
    const rfb = new RFB(document.getElementById(htmlId) as any);
    rfb.connect('https://192.168.1.2:8006', 444, undefined, `/api2/json/nodes/a1/qemu/${vmid}/vncwebsocket?port=5900&vncticket=${ticket}`);
    rfb.set_onDisconnected(() => log('connection	state	change:	Disconnected'));
    rfb.set_onNotification((self: RFB, msg: string, level: 'normal' | 'warn' | 'error', options?: { [key: string]: any }) =>
      log(`RFB Notification: [${level}] ${msg}`, options));
    return rfb;
  } catch (exc) {
    log('Unable to create RFB client -- ' + exc, 'error');
    return;
  }
}

let incrementer = 0;

export function getNewConsoleWindowId() {
  incrementer++;
  return 'wmksConsoleWindow_' + incrementer;
}
