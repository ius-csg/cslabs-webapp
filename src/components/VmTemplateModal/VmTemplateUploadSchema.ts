import {object, ObjectSchema, ObjectSchemaDefinition, string} from 'yup';
import {cast} from '../../util';

export interface NamedUpload {
  name: string;
}

export interface UploadForm extends NamedUpload {
  file: File | null;
}

export interface UploadByUrlForm extends NamedUpload {
  url: string;
}

const NameSchema: ObjectSchemaDefinition<NamedUpload> = {name: string().required('Required').min(3, 'Must have at least 3 characters')};
const UploadFormSchema = object<UploadForm>({
  ...NameSchema,
  file: object() as ObjectSchema<File>
});

export const isUploadForm = (val: NamedUpload): val is UploadForm => val['file'] !== undefined;
export const isUploadByUrlForm = (val: NamedUpload): val is UploadByUrlForm => val['url'] !== undefined;
export function uploadFormToFormData(form: UploadForm) {
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('file', form.file!);
  return formData;
}
const UploadByUrlFormSchema = object<UploadByUrlForm>({
  ...NameSchema,
  url: string().required('Required').url('Must be a url pointing to an ova file')
});

export const getUploadSchema = (byUrl: boolean) => byUrl ? UploadByUrlFormSchema : UploadFormSchema;

export const getInitialUploadValues = (byUrl: boolean): NamedUpload => byUrl ?
  cast<UploadByUrlForm>({name: '', url: ''}) :
  cast<UploadForm>({name: '', file: null});
