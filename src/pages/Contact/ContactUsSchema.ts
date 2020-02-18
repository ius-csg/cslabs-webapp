import {object, string} from 'yup';

export interface ContactUsForm {
  email: string;
  message: string;
}

export const ContactUsSchema = object<ContactUsForm>({
  email: string().email('Must be an email').required('Required'),
  message: string().required('Required').min(4, 'Required')
});
