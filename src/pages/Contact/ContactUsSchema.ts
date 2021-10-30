import {object, ObjectSchema, string} from 'yup';

export interface ContactUsForm {
  email: string;
  message: string;
  screenshots: FileList | null;
}

export const ContactUsSchema = object<ContactUsForm>({
  email: string().email('Must be an email').required('Required'),
  message: string().required('Required').min(4, 'Required'),
  screenshots: object() as ObjectSchema<FileList>
});
