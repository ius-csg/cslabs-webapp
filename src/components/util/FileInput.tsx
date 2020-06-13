import {Form} from 'react-bootstrap';
import * as React from 'react';
import {ErrorMessage, Field, FieldProps} from 'formik';
import {FormEvent} from 'react';
import styles from './Input/Input.module.scss';

interface Props {
  name: string;
  accept: string;
  multiple?: boolean;
  disabled?: boolean;
}

export function FileInput({name, accept, multiple, disabled}: Props) {
  return (
    <Field name={name}>
      {(fieldProps: FieldProps) => {
        const {form} = fieldProps;
        const onFileChange = (event: FormEvent<HTMLInputElement>) => {
          if(multiple) {
            form.setFieldValue(name, event.currentTarget!.files);
          } else {
            form.setFieldValue(name, event.currentTarget!.files!.item(0));
          }
        };
        return (
          <>
            <Form.Control
              type='file'
              accept={accept}
              name={name}
              onChange={onFileChange}
              multiple={multiple ?? false}
              disabled={disabled}
            />
            <ErrorMessage
              render={msg => <div className={styles['form-errors']}>{msg}</div>}
              name={name}
            />
          </>
          );
      }}
    </Field>
  );
}
