import {array, number, NumberSchema, object, ObjectSchema, string, StringSchema} from 'yup';
import {LabForm} from '../../types/editorTypes';
import {LabDifficulty, LabType} from '../../types/Lab';

export const LabEditorSchema = object<LabForm>({
  name: string().min(3, 'Must at least be 3 characters').required('Required'),
  updatedAt: string().notRequired(),
  createdAt: string().notRequired(),
  id: number(),
  type: string() as StringSchema<LabType>,
  topology: object() as ObjectSchema<File>,
  readme: object() as ObjectSchema<File>,
  moduleId: number(),
  labVms: array(),
  labDifficulty: number() as NumberSchema<LabDifficulty>,
  bridgeTemplates: array(),
  estimatedCpusUsed: number(),
  estimatedMemoryUsedMb: number()
});
