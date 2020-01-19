import React, {FormEvent} from 'react';
import {ErrorMessage, Field, FieldProps} from 'formik';
import styles from './Input.module.scss';
import {Form, FormControlProps} from 'react-bootstrap';
import {getFieldValue} from '../../../util';

interface InputProps {
  name: string;
  type?: string;
  disabled?: boolean;
  rows?: number;
  defaultValue?: any;
  placeholder?: string;
}

const Input = (props: InputProps) => (
     <React.Fragment>
        <Field name={props.name}>
          {(fieldProps: FieldProps) => {
            const {field, form, meta } = fieldProps;
            if (!meta.value && props.defaultValue)  {
              form.setFieldValue(field.name, props.defaultValue, true);
            }
            return (
              <Form.Control
                as={props.type === 'textarea' ? 'textarea' : 'input'}
                isValid={meta.touched && !meta.error}
                isInvalid={meta.touched && Boolean(meta.error)}
                className={styles['form-inputs']}
                rows={props.rows}
                placeholder={props.placeholder}
                {...field}
                value={getFieldValue(field)}
                onChange={(e: FormEvent<FormControlProps>) => field.onChange(e)}
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

export default Input;
