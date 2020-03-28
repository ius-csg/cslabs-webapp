import {object, string} from 'yup';

export interface ModuleEditorForm {
  moduleName: string;
  shareLink: string;
  description: string;
}

export const ModuleEditorSchema = object<ModuleEditorForm>({
  moduleName: string().email('Must be an email').required('Required'),
  shareLink: string().required('Required').min(4, 'Required'),
  description: string().required('Required').min(4, 'Required')
});
