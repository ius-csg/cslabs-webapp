import {object, ObjectSchema, string} from 'yup';

export interface LoginFormValues {
  schoolEmail: string;
  password: string;
}

export const LoginFormSchema: ObjectSchema<LoginFormValues> = object({
  schoolEmail: string().required('Required'),
  password: string().required('Required')
});
