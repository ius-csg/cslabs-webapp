import React from 'react';
import {ErrorMessage, Field, FieldProps} from 'formik';
import styles from '../Input/Input.module.scss';
import {
  DropdownOption, DropDownOptionValue,
  NullableDropDownOptionValue,
  SearchableDropdown
} from '../SearchableDropdown/SearchableDropdown';
import {FormikSetFieldValue} from '../Util';

type OnSelect = ((name: string, selectedValue: NullableDropDownOptionValue) => void) |
  ((name: string, selectedValue: NullableDropDownOptionValue, setFieldValue: FormikSetFieldValue) => void);

export interface DropdownInputProps<Value extends DropDownOptionValue> {
  name: string;
  dropdownData: DropdownOption<Value>[];
  onSelect?: OnSelect;
  isClearable?: boolean;
  disabled?: boolean;
  defaultToFirstOption?: boolean;
  defaultToFirstOptionIfOnlyOneOption?: boolean;
}

const isNotSelected = (value: any) => (value === '' || value === null || value === undefined);
const isNotSelectedAndOptionsAvailable = (value: any, options: any[]) =>
  (!valueInOptions(value, options)) && options && options.length > 0;

const valueInOptions = (value: any, options: DropdownOption[]) => {
  if (!options) {
    return true;
  }
  return options.map(o => o.value).includes(value);
};

export const DropdownInput = <Value extends DropDownOptionValue>(props: DropdownInputProps<Value>) => (
  <React.Fragment>
    <Field name={props.name}>
      {({field, meta, form}: FieldProps) => {
        const {dropdownData, defaultToFirstOption, defaultToFirstOptionIfOnlyOneOption} = props;
        if (isNotSelectedAndOptionsAvailable(meta.value, dropdownData) && (defaultToFirstOption ||
          (defaultToFirstOptionIfOnlyOneOption && dropdownData.length === 1))) {
          form.setFieldValue(props.name, props.dropdownData[0].value);
        }
        const setFieldValue: FormikSetFieldValue = (name: string, value: any, shouldValidate?: boolean) => {
          form.setFieldValue(name, value, shouldValidate);
          setTimeout(() => { form.setFieldTouched(name, true, true); }, 1);
        };
        return (
          <SearchableDropdown
            {...field}
            className={meta.touched && !meta.error ? 'valid-input' : 'invalid-input'}
            isValid={meta.touched && !meta.error}
            isInvalid={meta.touched && Boolean(meta.error)}
            disabled={props.disabled}
            isClearable={props.isClearable || false}
            dropdownData={props.dropdownData}
            onSelect={(selectedValue: Value) => {
              setFieldValue(field.name, !isNotSelected(selectedValue) ? selectedValue : '', true);
              // I had to do a setTimout order to prevent validation from running on the last value
              setTimeout(() => { form.setFieldTouched(field.name); }, 1);
              if (props.onSelect) {
                props.onSelect(field.name, !isNotSelected(selectedValue) ? selectedValue : null, setFieldValue);
              }
            }}
            value={
              /* eslint-disable eqeqeq */
              /* tslint:disable-next-line:triple-equals */
                !isNotSelected(field.value) ? props.dropdownData.find(o => o.value == field.value) || null : null
            }
          />
        );
      }
      }
    </Field>
    <ErrorMessage
      render={msg => <div className={styles['form-errors']}>{msg}</div>}
      name={props.name}
    />
  </React.Fragment>
);
