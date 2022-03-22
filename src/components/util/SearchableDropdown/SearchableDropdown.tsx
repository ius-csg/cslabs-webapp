import {Component} from 'react';
import Select, {components, SingleValue} from 'react-select';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {combineClasses} from '../../../util';

// @TODO placeholder until this component styles are fixed.
const styles: {[key: string]: string} = {};

export interface DropdownOption<Value extends NullableDropDownOptionValue = DropDownOptionValue> {
  value: Value;
  label: string;
}
export type DropDownOptionValue = string | number | boolean;
export type NullableDropDownOptionValue = DropDownOptionValue | null;

interface Props<Value extends NullableDropDownOptionValue> {
  dropdownData: DropdownOption<Value>[];
  defaultValue?: DropdownOption<Value>;
  disabled?: boolean;
  isClearable?: boolean;
  isValid?: boolean;
  isInvalid?: boolean;
  onSelect?: (selectedValue: Value) => void;
  value?: DropdownOption<Value> | null;
  className?: string;
}

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon icon={'search'}/>
      </components.DropdownIndicator>
    )
  );
};

export class SearchableDropdown<Value extends NullableDropDownOptionValue> extends Component<Props<Value>> {
  handleValidationClass = () => {
    if (this.props.isValid) {
     return combineClasses(this.props.className as string, '-invalid');
    } else {
      return combineClasses(this.props.className as string, '-valid');
    }
  };

  handleChange = (selectedOption: SingleValue<DropdownOption<Value>>) => {
    if (this.props.onSelect) {
      const option = (selectedOption as DropdownOption<Value>);
      const value = option ? option.value : null as Value;
      this.props.onSelect(value);
    }
  };

  render() {
    return (
      <Select
        className={styles[this.handleValidationClass()]}
        components={{DropdownIndicator}}
        value={this.props.value}
        onChange={this.handleChange}
        options={this.props.dropdownData}
        defaultValue={this.props.defaultValue}
        isDisabled={this.props.disabled}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            text: 'orangered',
            primary25: '#ced4da',
            primary: '#3b5872'
          }
        })}
        maxMenuHeight={150}
        isClearable={this.props.isClearable || false}
      />
    );
  }
}
