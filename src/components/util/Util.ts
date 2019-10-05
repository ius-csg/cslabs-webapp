import {FormEvent} from 'react';
import {FormControl, FormControlProps} from 'react-bootstrap';
import axios from 'axios';

export type BootstrapFormEvent = FormEvent<FormControl & FormControlProps>;

export function makeAxios(token?: string) {
  token = token ? token : nullable(localStorage.getItem('token'));
  return axios.create({
    baseURL: 'https://localhost:5001/api',
    ...(token ? {
      headers: {Authorization: `Bearer ${token}`}
    } : {}),
    validateStatus: (status: number) => status < 400
  });
}

export function nullable<T>(value: T | null): T | undefined {
  if (value) {
    return value;
  }
  return undefined;
}

export function isBadRequest(e: any) {
  return e.response ? e.response.status === 400 : false;
}

export function isServerError(e: any) {
  return e.response ? e.response.status >= 500 && e.response.status < 600 : false;
}

export function isUnknownError(e: any) {
  return e.response ? e.response.status === 0 : false;
}

export function isAxiosResponse(e: any): boolean {
  return !!e.response;
}

export type Stringify<T> = { [K in keyof T]: string|undefined };

export type ErrorResponse<T> = {
  message: string;
} & Stringify<T>;

export function getResponseData<T>(e: any): T {
  return e.response ? e.response.data : undefined;
}

export function getErrorResponseMessage(e: any): string {
  return e.response ? e.response.data ? e.response.data.message : '' : '';
}
