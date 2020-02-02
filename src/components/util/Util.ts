import {useState} from 'react';
import axios from 'axios';
import {FieldInputProps} from 'formik';

export function makeAxios(token?: string) {
  token = token ? token : nullable(localStorage.getItem('token'));
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    ...(token ? {
      headers: {Authorization: `Bearer ${token}`}
    } : {})
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
  return e.response ? e.response.status : (e.request ? e.request.status : -1);
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

export function useForceUpdate() {
  const [, setValue] = useState(0);
  return () => setValue(value => ++value); // update the state to force render
}

export function getFieldCheckValue<T>(field: FieldInputProps<T>) {
  if (field.value === undefined || field.value === null) {
    return false;
  }
  return field.value;
}

export type FormikSetFieldValue = (field: string, value: any, shouldValidate?: boolean) => void;
