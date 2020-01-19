import {LoginFormValues} from './LoginFormSchema';
import {bool, object, ObjectSchema, ref, string} from 'yup';

export interface RegisterFormValues extends LoginFormValues {
  firstName: string;
  lastName: string;
  gradYear: string;
  phoneNumber: string;
  confirmPass: string;
  personalEmail: string;
  acceptedTerms: boolean;
}

export const RegisterFormSchema: ObjectSchema<RegisterFormValues> = object({
  schoolEmail: string().test('either-email', 'At least one email address is required', function(value: any) {
    // tslint:disable-next-line:no-invalid-this
    console.log('either-email', 'this', this, 'value', value);
    // tslint:disable-next-line:no-invalid-this
    const { personalEmail } = this.parent;
    if (!personalEmail) {
      return value !== undefined;
    }
    return true;
  }).matches(/@iu[s]\.edu/, 'Must have an @ius.edu or @iu.edu email address'),
  personalEmail: string().test('either-email', 'At least one email address is required', function(value: any) {
    // tslint:disable-next-line:no-invalid-this
    console.log('either-email', 'this', this, 'value', value);
    // tslint:disable-next-line:no-invalid-this
    const { schoolEmail } = this.parent;
    if (!schoolEmail) {
      return value !== undefined;
    }
    return true;
  }),
  firstName: string().required('Required'),
  lastName: string().required('Required'),
  password: string().required('Required'),
  confirmPass: string().oneOf([ref('password'), ''], `The password did not match, please try again.`).required('Required'),
  gradYear: string(),
  phoneNumber: string().matches(/[0-9]{3}-[0-9]{3}-[0-9]{4}/, 'Please type in format of XXX-XXX-XXXX'),
  acceptedTerms: bool().test('accepted-terms', 'You must agree before submitting.', (value: any) => Boolean(value))
});
