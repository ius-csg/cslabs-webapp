import {object, ObjectSchema, string} from 'yup';

export interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginFormSchema: ObjectSchema<LoginFormValues> = object({
  email: string().required('Required'),
  password: string().required('Required')
});
