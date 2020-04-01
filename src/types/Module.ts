import {TrackableEntity} from './Entity';

export interface Module extends TrackableEntity {
  name: string;
  description: string;
  published: boolean;
  specialCode: string;
  type: ModuleType;
  userId: number;
  // if there is a user module instance, it's id will show here.
  userModuleId?: number;
}

export type ModuleType = 'MultiUser' | 'SingleUser';
export const moduleTypes: ModuleType[] = ['MultiUser', 'SingleUser'];
