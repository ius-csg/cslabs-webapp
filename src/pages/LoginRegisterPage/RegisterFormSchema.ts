import {LoginFormValues} from './LoginFormSchema';
import {bool, object, ObjectSchema, ref, string} from 'yup';
import {isPassValid} from '../../util';

export interface RegisterFormValues extends LoginFormValues {
  firstName: string;
  lastName: string;
  gradYear: string;
  phoneNumber: string;
  confirmPass: string;
  email: string;
  acceptedTerms: boolean;
}

export const emailValidationMessage = 'Must be a valid email address';

export const passwordValidator = string()
  .test('strong-password', 'The password must be strong', (value?: string) => isPassValid(value)).required('Required');

export const makeConfirmPasswordValidator = (keyToMatch: string) =>
  string().oneOf([ref(keyToMatch), ''], `The password did not match, please try again.`).required('Required');

export const RegisterFormSchema: ObjectSchema<RegisterFormValues> = object({
  email: string()
    .email(emailValidationMessage)
    .required('Required'),
  firstName: string().required('Required'),
  lastName: string().required('Required'),
  password: passwordValidator,
  confirmPass: makeConfirmPasswordValidator('password'),
  gradYear: string(),
  phoneNumber: string().matches(/[0-9]{3}-[0-9]{3}-[0-9]{4}/, 'Please type in format of XXX-XXX-XXXX'),
  acceptedTerms: bool().test('accepted-terms', 'You must agree before submitting.', (value?: boolean) => Boolean(value))
});
