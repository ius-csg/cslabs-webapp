import {TrackableEntity} from './Entity';

export interface BaseModule  extends TrackableEntity {
  name: string;
  description: string;
  published: boolean;
  specialCode: string;
  type: ModuleType;
  userId: number;
}

export interface Module extends BaseModule {
  // if there is a user module instance, it's id will show here.
  userModuleId?: number;
}

export type ModuleType = 'MultiUser' | 'SingleUser';
export const moduleTypes: ModuleType[] = ['MultiUser', 'SingleUser'];


export const getModuleShareLink = (uuid: string) => `${process.env.REACT_APP_URL!}/module/${uuid}`;
