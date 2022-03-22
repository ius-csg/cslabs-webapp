import React, {ChangeEvent, KeyboardEvent, useContext} from 'react';
import {ErrorMessage, Field, FieldProps} from 'formik';
import styles from './Input.module.scss';
import {Form} from 'react-bootstrap';
import {getFieldValue} from '../../../util';
import {CapsLockContext} from '../../CapsLockContext/CapsLockContext';

interface InputProps {
  name: string;
  type?: string;
  disabled?: boolean;
  rows?: number;
  defaultValue?: any;
  placeholder?: string;
}

export default function Input(props: InputProps) {
  const capsLockState = useContext(CapsLockContext);
  return (
    <React.Fragment>
      <Field name={props.name}>
        {(fieldProps: FieldProps) => {
          const {field, form, meta} = fieldProps;
          if (!meta.value && props.defaultValue) {
            form.setFieldValue(field.name, props.defaultValue, true);
          }
          return (
            <Form.Control
              as={props.type === 'textarea' ? 'textarea' : 'input'}
              isValid={meta.touched && !meta.error}
              isInvalid={meta.touched && Boolean(meta.error)}
              style={{height: props.rows}}
              placeholder={props.placeholder}
              {...field}
              value={getFieldValue(field)}
              onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
                const capsLock = e.getModifierState('CapsLock');
                if (capsLockState.capsLock !== capsLock) {
                  capsLockState.setCapsLock(capsLock);
                }
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(e)}
              disabled={props.disabled}
              type={props.type || 'text'}
            />
          );
        }}
      </Field>
      <ErrorMessage
        render={msg => <div className={styles['form-errors']}>{msg}</div>}
        name={props.name}
      />
    </React.Fragment>
  );
}
