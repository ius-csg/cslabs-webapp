import {useState} from 'react';
import {FieldInputProps} from 'formik';

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
