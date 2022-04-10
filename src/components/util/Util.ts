import {useState} from 'react';
import {FieldInputProps} from 'formik';
import {useLocation} from 'react-router';
import queryString from 'querystring';

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

export function useQuery<T extends {[key: string]: string | undefined}>() {
  return queryString.decode(useLocation().search.substring(1)) as T;
}

export function range(start: number, end: number) {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}


export function doNothing() {
  // do nothing
}


export function limitIf<T>(arr: T[], length: number, condition: boolean) {
  if(arr.length > length && condition)
    return arr.slice(0,4);
  return arr;
}
