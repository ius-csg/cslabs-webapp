import {makeLogger} from './logger';
import zxcvbn from 'zxcvbn';
import {FieldInputProps, FormikErrors} from 'formik';
import {DateTime} from 'luxon';
import axios, {AxiosError} from 'axios';
import humanizeDuration from 'humanize-duration';
import {useState} from 'react';
import {ModuleDifficulty} from 'types/Module';

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

export function isPassValid(password?: string) {
  if (!password) {
    return false;
  }
  const result = zxcvbn(password);
  return result.score >= 4;
}

export function getFieldValue<T>(field: FieldInputProps<T>) {
  if (field.value === undefined || field.value === null) {
    return '';
  }
  return field.value;
}

export interface MessageState {
  message: string;
  variant: 'danger' | 'success';
  critical?: boolean;
}

export function makeMessageState(): MessageState {
  return {
    message: '',
    variant: 'danger'
  };
}

export function useMessage(message?: MessageState) {
  return useState(message);
}

export function delay(timeout: number) {
  return new Promise(resolve => setTimeout(() => resolve(), timeout));
}

export function getLuxonObjectFromString(dateTime: string) {
  return DateTime.fromISO(dateTime.replace('Z', '') + '+00:00');
}

export function getLocalDateTimeString(dateTime?: string | null)  {
  if(!dateTime) {
    return 'No Date';
  }
  return getLuxonObjectFromString(dateTime).toLocaleString(DateTime.DATE_SHORT);
}

export function getRemainingLabTime(dateTime?: string) {
  if (!dateTime) {
    return 'Invalid Value';
  }
  const milliseconds = getLuxonObjectFromString(dateTime).toLocal().diffNow().as('millisecond');
  if (milliseconds < 0) {
    return 'Times up!';
  }
  return humanizeDuration(milliseconds, { round: true , largest: 3});
}

export interface AxiosErrorMessageParams {
  connectionMsg?: string;
  badRequestMsg?: string;
  four04Msg?: string;
  serverError?: string;
}



/**
 * Converts a dictionary of keys with "." notation into an object structure
 *
 * eg.
 *
 * {
 *   "item.revisionTitle": ["Required"],
 *   "items.0.name": ["Required"]
 * }
 *
 * into
 *
 * {
 *   "item": {
 *     "revisionTitle": ["Required"]
 *   },
 *   "items": [
 *     {
 *       "name": ["Required"]
 *     }
 *   ]
 * }
 * @param errorsDictionary
 */
// Code smell on this
function convertAspNetCoreErrorsToFormikErrors(errorsDictionary: {[key: string]: string[]}): FormikErrors<any> {
  const keys = Object.keys(errorsDictionary);
  const errors: any = {};
  for (const key of keys) {
    const currentError = errorsDictionary[key];
    const keyParts = key.split('.');
    let currentErrors = errors;
    for (let i = 0; i < keyParts.length; i++) {
      const nextKey = (i + 1) < keyParts.length ? keyParts[i + 1] : undefined;
      const currentKey = keyParts[i];
      if (currentErrors[currentKey] === undefined && nextKey !== undefined) {
        if(!isNaN(parseInt(nextKey, 10))) {
          currentErrors[currentKey] = [];
        } else {
          currentErrors[currentKey] = {};
        }
      }
      // hit tail
      if (nextKey === undefined) {
        currentErrors[currentKey] = currentError;
      }
      currentErrors = errors[currentKey];
    }
  }
  return errors;
}

export type SetErrors<T> = (errors: FormikErrors<T>) => void;

const getErrorMessage = (errors: any): string[] => Array.isArray(errors['']) ? errors[''] : errors;

// Code smell on this
export function handleAxiosError(e: AxiosError, params: AxiosErrorMessageParams = {}, setErrors?: SetErrors<any>, errorsPrefix?: string) {
  if (e.response) {
    if (e.response.status === 400) {
      const defaultMessage = typeof e.response.data === 'object' && e.response.data.message ? e.response.data.message : 'Bad Request';
      if (e.response.data.errors && setErrors) {
        const errors = !!errorsPrefix ? e.response.data.errors[errorsPrefix]: e.response.data.errors;
        setErrors(convertAspNetCoreErrorsToFormikErrors(errors));
        if (Array.isArray(errors['']) || Array.isArray(errors)) {
          return getErrorMessage(errors).join('\n');
        }
        return '';
      }

      return params.badRequestMsg || defaultMessage;
    } else if (e.response.status === 404) {
      return params.four04Msg || 'Not Found';
    } else if (e.response.status === 500) {
      // tslint:disable-next-line:no-console
      console.error(e);
      return params.serverError || 'A server error occurred, please try again later.';
    } else {
      // tslint:disable-next-line:no-console
      console.error(e);
      return 'Unknown Error';
    }
  } else if (e.request) {
    if (e.request.status === 0) {
      return params.connectionMsg || 'Could not connect to the server';
    } else {
      // tslint:disable-next-line:no-console
      console.error(e);
      return 'Unknown Error';
    }
  }
  throw e;
}


export function makeAxios(baseUrl: string, token?: string, timeout?: number) {
  token = token ? token : nullable(localStorage.getItem('token'));
  return axios.create({
    baseURL: baseUrl,
    ...(token ? {
      headers: {Authorization: `Bearer ${token}`}
    } : {}),
    timeout: timeout
  });
}

export function nullable<T>(value: T | null): T | undefined {
  if (value) {
    return value;
  }
  return undefined;
}

export function isBadRequest(e: any) {
  return getErrorStatus(e) === 400;
}

export function isServerError(e: any) {
  return getErrorStatus(e) >= 500 && getErrorStatus(e) < 600;
}

export function isUnknownError(e: any) {
  return getErrorStatus(e) === 0;
}

export function getErrorStatus(e: any): number {
  if (e.response) {
    return e.response.status;
  } else if (e.request) {
    return e.request.status;
  } else {
    return -1;
  }
}

export type Stringify<T> = { [K in keyof T]: string | undefined };
export type ErrorResponse<T> = {
  message: string;
} & Stringify<T>;

export function getResponseData<T>(e: any): T {
  return e.response ? e.response.data : undefined;
}

export function getErrorResponseMessage(e: any): string {
  return e.response ? e.response.data ? e.response.data.message : '' : '';
}

export const propertyOf = <T>(name: keyof T) => name;
export type Dictionary<T> = {[key: number]: T};
export function convertArrayToDictionary<T>(arr: T[], key: keyof T): {[key: string]: T} {
  const obj: any = {};
  for (const item of arr) {
    obj[(item as any)[key]] = item;
  }
  return obj;
}

export const moduleDifficultyOptions = [
  {value: 0, label: 'Any'},
  {value: 1, label: 'Easy'},
  {value: 2, label: 'Medium'},
  {value: 3, label: 'Hard'}
];

export function getModuleDifficultyLabel(val: ModuleDifficulty) {
  return moduleDifficultyOptions[val].label;
}


export const cast = <T>(value: T): T => value;
