import React, {useState} from 'react';
import {ErrorMessage, Field, FieldProps} from 'formik';
import styles from './CheckBoxInput.module.scss';
import {Form} from 'react-bootstrap';
import uuid from 'uuid';
import {FormikSetFieldValue, getFieldCheckValue} from '../Util';

interface InputProps {
  name: string;
  disabled?: boolean;
  type?: 'checkbox' | 'radio';
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
            <Form.Check type='checkbox' custom={true}>
              <Form.Check.Input
                type={props.type || 'checkbox'}
                id={props.id || `${props.name}${id}`}
                name={props.name}
                isInvalid={meta.touched && Boolean(meta.error)}
                className={props.className}
                {...field}
                checked={getFieldCheckValue(field)}
                onChange={(e: any) => {
                  console.log('onChange', props.type, props.onChange);
                  if (props.type !== 'radio') {
                    field.onChange(e);
                  }
                  if (props.onChange) {
                    props.onChange(e.target.checked, form.setFieldValue);
                  }
                }}
                value={props.type === 'radio' ? props.value : undefined}
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
