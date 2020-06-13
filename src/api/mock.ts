import {UploadProgress} from './index';
import {UploadByUrlForm, UploadForm} from '../components/VmTemplateModal/VmTemplateUploadSchema';
import {delay} from '../util';

// Fake api calls to help test ui changes to the VM Library without actually uploading a file

export async function uploadVmTemplate(form: UploadForm, onUploadProgress: (progress: number) => void) {
  onUploadProgress(33.3333);
  await delay(5000);
  return 'ok';
}

export async function uploadVmTemplateByUrl(form: UploadByUrlForm) {
  return 'tst';
}

let checks = 0;
export async function getUploadProgress(requestId: string): Promise<UploadProgress> {
  checks++;
  const complete = checks === 2;
  return {
    status: complete ? 'Complete' : 'Downloading',
    progress: complete ? 100 : 33.3333
  };
}
