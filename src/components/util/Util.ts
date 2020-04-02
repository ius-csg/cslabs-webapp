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
