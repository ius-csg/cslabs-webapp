import {array, boolean, number, NumberSchema, object, string, StringSchema} from 'yup';
import {ModuleForm} from '../../types/editorTypes';
import {ModuleDifficulty, ModuleType} from '../../types/Module';


export const ModuleEditorSchema = object<ModuleForm>({
  name: string().min(3, 'Must at least be 3 characters').required('Required'),
  specialCode : string().required('Required'),
  description: string().required('Required').min(4, 'Required'),
  updatedAt: string().notRequired(),
  createdAt: string().notRequired(),
  id: number(),
  userId: number(),
  type: string() as StringSchema<ModuleType>,
  published: boolean(),
  labs: array(),
  moduleTags: array(),
  difficulty: number() as NumberSchema<ModuleDifficulty>
});
