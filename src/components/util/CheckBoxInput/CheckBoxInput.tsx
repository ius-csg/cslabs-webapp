import React, {useState} from 'react';
import {ErrorMessage, Field, FieldProps} from 'formik';
import styles from './CheckBoxInput.module.scss';
import {Form} from 'react-bootstrap';
import {v4 as uuid} from 'uuid';
import {FormikSetFieldValue} from '../Util';

interface InputProps {
  name: string;
  disabled?: boolean;
  label: string|any;
  id?: string;
  className?: string;
  onChange?: ((value: boolean) => void) | ((value: boolean, setFieldValue: FormikSetFieldValue) => void);
  value?: any;
}

const CheckBoxInput = (props: InputProps) => {
  // get a unique id for this specific instance.
  const [id] = useState(uuid());
  return (
    <React.Fragment>
      <Field name={props.name}>
        {(fieldProps: FieldProps) => {
          const {field, form, meta} = fieldProps;
          return (
            <Form.Check type='checkbox'>
              <Form.Check.Input
                id={props.id || `${props.name}${id}`}
                name={props.name}
                isInvalid={meta.touched && Boolean(meta.error)}
                className={props.className}
                checked={field.value}
                onChange={(e: any) => {
                  form.setFieldValue(field.name, e.target.checked, true);
                  if (props.onChange) {
                    props.onChange(e.target.checked, form.setFieldValue);
                  }
                }}
                disabled={props.disabled}
              />
              <Form.Check.Label>{props.label}</Form.Check.Label>
            </Form.Check>
          );
        }}
      </Field>
      <ErrorMessage
        render={msg => <div className={styles['form-errors']}>{msg}</div>}
        name={props.name}
      />
    </React.Fragment>
  );
};

export default CheckBoxInput;
