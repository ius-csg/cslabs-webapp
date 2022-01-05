import {AxiosResponse} from 'axios';
import {Module} from '../types/Module';
import {User, UserWithToken} from '../types/User';
import {Dispatch} from 'redux';
import {setCurrentUser} from '../redux/actions/entities/currentUser';
import {appDispatch} from '../redux/store';
import axiosRetry from 'axios-retry';
import {RegisterFormValues} from '../pages/LoginRegisterPage/RegisterFormSchema';
import {UserModule} from '../types/UserModule';
import {InitializationStatus, UserLab} from '../types/UserLab';
import {makeAxios} from '../util';
import {LabForm, ModuleForm, VmTemplate} from '../types/editorTypes';
import {UploadByUrlForm, UploadForm, uploadFormToFormData} from '../components/VmTemplateModal/VmTemplateUploadSchema';
import {Maintenance} from '../types/Maintenance';
import {Tag} from '../types/Tag';
import {SystemMessage} from '../types/SystemMessage';

let api = makeAxios(process.env.REACT_APP_API_URL);

function setToken(token?: string) {
  if (token) {
    localStorage.setItem('token', token);
  }
  api = makeAxios(process.env.REACT_APP_API_URL, token);
}

export interface TicketResponse {
  port: number;
  ticket: string;
  cert: string;
  upid: string;
  user: string;
  url: string;
  fastBaseUrl: string;
  reliableBaseUrl: string;
  healthCheckUrl: string;
  useHttpsForHealthCheckRequest: string;
}

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('token');
  dispatch(setCurrentUser(null));
};

export async function acquireTicket(id: number): Promise<TicketResponse> {
  return (await api.get<TicketResponse>(`/virtual-machine/${id}/get-ticket`)).data;
}

export async function startUpVm(id: number): Promise<string> {
  const retry = makeAxios(process.env.REACT_APP_API_URL);
  axiosRetry(retry, { retryDelay: (num) => 1000 * num, retries: 10});
  return (await retry.post<string>(`/virtual-machine/${id}/start`)).data;
}

export async function turnOnUserLab(id: number): Promise<string> {
  const retry = makeAxios(process.env.REACT_APP_API_URL);
  axiosRetry(retry, { retryDelay: (num) => 1000 * num, retries: 10});
  return (await retry.post<string>(`/user-lab/${id}/turn-on`)).data;
}

export async function shutdownVm(id: number): Promise<string> {
  return (await api.post<string>(`/virtual-machine/${id}/shutdown`)).data;
}

export async function stopVm(id: number): Promise<string> {
  return (await api.post<string>(`/virtual-machine/${id}/stop`)).data;
}

export async function scrubVm(id: number): Promise<string> {
  return (await api.post<string>(`/virtual-machine/${id}/scrub`)).data;
}

export async function resetVm(id: number): Promise<string> {
  return (await api.post<string>(`/virtual-machine/${id}/reset`)).data;
}

export async function getModule(id: number) {
  return ( await api.get<Module>(`/modules/${id}`)).data;
}

export async function getUserList() {
  return ( await api.get<User[]>(`/user/`) ).data;
}

export async function getMaintenances() {
  return ( await api.get<Maintenance[]>('/maintenance/') ).data;
}

export async function getSystemMessages() {
  return (await api.get<SystemMessage[]>(`/system-message`)).data;
}

export async function login(email: string, password: string): Promise<AxiosResponse<UserWithToken>> {
  const resp = await api.post<UserWithToken>('/user/authenticate', {email: email, password: password });
  setToken(resp.data.token);
  return resp;
}
export async function forgotPassword(email: string) {
  return api.post<string>(`/user/forgot-password/${encodeURIComponent(email)}`);
}

export function confirmForgotPassword(code: string, password: string) {
  return api.post<string>(`/user/confirm-forgot-password`, {passwordRecoveryCode: code, newPassword: password});
}

export async function register(form: RegisterFormValues): Promise<AxiosResponse<UserWithToken>> {
  const resp = await api.post<UserWithToken>('/user/register', form);
  setToken(resp.data.token);
  return resp;
}

export interface ChangeUserRoleRequest {
  newRole: string;
  userId: number;
}

export function changeUserRole(form: ChangeUserRoleRequest[]): Promise<AxiosResponse> {
  return api.put('/user/change-role', form);
}

export async function getCurrentUserFromServer() {
  return ( await api.get<User>('/user/current')).data;
}

export async function getPublicModules() {
  return handleResponse( await api.get<Module[]>(`/module`)).data;
}
export async function getModuleByPrivateCode(code: string): Promise<Module> {
  return handleResponse( await api.get<Module>(`/module/code/${code}`)).data;
}

export async function getPublicModule(id: number) {
  return handleResponse( await api.get<Module>(`/module/${id}`)).data;
}

export async function getUserModules() {
  return handleResponse( await api.get<UserModule[]>(`/user-module/`)).data;
}
export async function getUserModule(id: number) {
  return handleResponse( await api.get<UserModule>(`/user-module/${id}`)).data;
}
export async function getEditorsModules() {
  return handleResponse(await api.get<UserModule[]>(`module/modules-editor`)).data;
}

export async function getUserLab(id: number) {
  return handleResponse( await api.get<UserLab>(`/user-lab/${id}`)).data;
}

export async function getTags(name: string) {
  return handleResponse( await api.get<Tag[]>(`/tag/search/${name}`)).data;
}

export async function updateEndDateTime(id: number) {
  return handleResponse( await api.post<UserLab>(`/user-lab/${id}/update-end-date-time`)).data;
}

export async function startUserLab(id: number) {
  return handleResponse( await api.post<UserLab>(`/user-lab/${id}/start`)).data;
}

export function getUserLabTopologyUrl(id: number) {
  return  `${process.env.REACT_APP_API_URL}/lab/${id}/topology`;
}

export function getUserLabReadmeUrl(id: number) {
  return  `${process.env.REACT_APP_API_URL}/lab/${id}/readme`;
}

export async function getUserLabInitializationStatus(id: number) {
  return handleResponse( await api.get<InitializationStatus>(`/user-lab/${id}/initialization-status`)).data;
}

export async function getUserLabVmStatuses(id: number) {
  return handleResponse( await api.get<{[key: number]: string}>(`/user-lab/${id}/status`)).data;
}
export async function startUserModule(id: string) {
  return handleResponse(await api.post<UserModule>(`/user-module/${id}`)).data;
}


export async function verifyEmail(code: string) {
  return handleResponse(await api.post<string>(`/user/verify-email`, {code: code}));
}

export async function verifyUser() {
  return handleResponse(await api.get<boolean>(`/user/verify-user`)).data;
}

export async function resendEmail() {
  return handleResponse(await api.get<boolean>(`/user/resend-email`)).data;
}

export async function getModuleForEditor(moduleId: number) {
  return handleResponse(await api.get<ModuleForm>(`/module/module-editor/${moduleId}`)).data;
}

export async function getLabForEditor(id: number) {
  return handleResponse(await api.get<LabForm>(`/lab/lab-editor/${id}`)).data;
}

export async function saveModule(module: ModuleForm): Promise<ModuleForm> {
  return handleResponse(await api.post<ModuleForm>(`/module`, module)).data;
}

export async function deleteLab(id: number) {
  return handleResponse(await api.delete(`/lab/${id}`)).data;
}

export async function saveLab(form: LabForm): Promise<LabForm> {
  const {topology, readme, ...json} = form;
  const data = new FormData();
  data.append('topology', topology!);
  data.append('readme', readme!);
  data.append('json', JSON.stringify(json));
  return handleResponse(await api.post<LabForm>(`/lab`, data)).data;
}


function handleResponse<T>(response: AxiosResponse<T>) {
  if (response.status < 400) {
    return response;
  }
  if (response.status === 401) {
    appDispatch(logout());
  }
  throw response;
}

export async function submitContactRequest(form: FormData) {
  return handleResponse(await api.post<string>(`/contact-us`, form));
}
interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
export async function submitChangePasswordRequest(form: ChangePasswordRequest) {
  return handleResponse(await api.post<string>(`/user/change-password`, form));
}

export async function uploadVmTemplate(form: UploadForm, onUploadProgress: (progress: number) => void) {
  return handleResponse(await api.post<string>(`/vm-template`, uploadFormToFormData(form), {
    onUploadProgress: (e: ProgressEvent) => onUploadProgress(e.loaded / e.total * 100)
  }));
}

export async function uploadVmTemplateByUrl(form: UploadByUrlForm) {
  return handleResponse(await api.post<string>(`/vm-template/from-url`, form)).data;
}

export interface UploadProgress {
  progress: number;
  status: UploadStatus;
}

export type UploadStatus = 'Downloading' | 'Complete' | 'Error' | 'NotFound';

export async function getUploadProgress(requestId: string): Promise<UploadProgress> {
  return handleResponse(await api.get<UploadProgress>(`/vm-template/upload-status/${requestId}`)).data;
}
export async function getVmTemplates() {
  return handleResponse(await api.get<VmTemplate[]>(`/vm-template`)).data;
}


export interface ProgressEvent {
  loaded: number;
  total: number;
}



export async function isFastConnectionAvailable(ticket: TicketResponse) {
  if(!ticket.fastBaseUrl) {
    return false;
  }
  const scheme = ticket.useHttpsForHealthCheckRequest ? 'https://' : 'http://';
  const fastConnectionTester = makeAxios(scheme + ticket.fastBaseUrl, undefined, 1000);
  try {
    await fastConnectionTester.get(ticket.healthCheckUrl);
    return true;
  } catch(e) {
    return false;
  }
}
