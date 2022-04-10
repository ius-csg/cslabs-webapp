import {TrackableEntity} from './Entity';
import {ModuleTag} from './ModuleTag';

export interface BaseModule  extends TrackableEntity {
  name: string;
  description: string;
  disabled: boolean;
  published: boolean;
  specialCode: string;
  type: ModuleType;
  ownerId: number;
  moduleTags: ModuleTag[];
}

export interface Module extends BaseModule {
  // if there is a user module instance, it's id will show here.
  userModuleId?: number;
}

export type ModuleType = 'MultiUser' | 'SingleUser';
export const moduleTypes: ModuleType[] = ['MultiUser', 'SingleUser'];


export const getModuleShareLink = (uuid: string) => `${process.env.REACT_APP_URL!}/module/${uuid}`;
