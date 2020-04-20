import {array, number, NumberSchema, object, ObjectSchema, string, StringSchema} from 'yup';
import {LabForm} from '../../types/editorTypes';
import {LabDifficulty, LabType, labTypes} from '../../types/Lab';

export const LabEditorSchema = object<LabForm>({
  name: string().min(3, 'Must at least be 3 characters').required('Required'),
  updatedAt: string(),
  createdAt: string(),
  id: number(),
  type: string().oneOf(labTypes) as StringSchema<LabType>,
  topology: object().nullable() as ObjectSchema<File>,
  readme: object().nullable() as ObjectSchema<File>,
  moduleId: number(),
  labVms: array(),
  labDifficulty: number() as NumberSchema<LabDifficulty>,
  bridgeTemplates: array(),
  estimatedCpusUsed: number(),
  estimatedMemoryUsedMb: number()
});
