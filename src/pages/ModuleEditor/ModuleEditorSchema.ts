import {array, boolean, number, object, ObjectSchema, string, StringSchema} from 'yup';
import {ModuleForm} from '../../types/editorTypes';
import {ModuleType, moduleTypes} from '../../types/Module';


export const ModuleEditorSchema = object<ModuleForm>({
  name: string().min(3, 'Must at least be 3 characters').required('Required'),
  specialCode : string().required('Required'),
  description: string().required('Required').min(4, 'Required'),
  updatedAt: string(),
  createdAt: string(),
  id: number(),
  userId: number(),
  type: string().oneOf(moduleTypes) as StringSchema<ModuleType>,
  published: boolean(),
  labs: array(),
  topology: object().nullable() as ObjectSchema<File>,
  readme: object().nullable() as ObjectSchema<File>
});
