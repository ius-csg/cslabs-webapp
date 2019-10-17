import {makeLogger} from './logger';

export function combineClasses(...arr: any[]|string[]|undefined[]|null[]): string {
  return arr.filter((val) => !!val).join(' ');
}

/**
 * Removes null or undefined properties from the given object.
 * @param obj A new object with null or undefined properties taken out.
 */
export function stripOptionals(obj: object): object {
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

export function classes(...arr: any[]|string[]|undefined[]|null[]): string {
  return arr.filter((val) => !!val).join(' ');
}

export function getClipboardFromEvent(e: any) {
  if (window['clipboardData'] && window['clipboardData'].getData) { // IE
    return window['clipboardData'].getData('Text');
  } else if (e.clipboardData && e.clipboardData.getData) {
    return e.clipboardData.getData('text/plain');
  }
}

const logger = makeLogger();

export function log(message: any, ...optionalParams: any[]) {
  logMessage('info', message, optionalParams);
}

export function info(message: any, ...optionalParams: any[]) {
  logMessage('info', message, optionalParams);
}
export function logError(message?: any, ...optionalParams: any[]) {
  logMessage('error', message, optionalParams);
}

export function warn(message?: any, ...optionalParams: any[]) {
  logMessage('warn', message, ...optionalParams);
}

export function verbose(message?: any, ...optionalParams: any[]) {
  logMessage('verbose', message, ...optionalParams);
}

function logMessage(level: string, message: any, ...optionalParams: any[]) {
  if (typeof message === 'object') {
    logger.log(level, '', ...[message, ...optionalParams]);
  }
  logger.log(level, message, optionalParams);
}
