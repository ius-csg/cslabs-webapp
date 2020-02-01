export interface Module {
  id: number;
  name: string;
  shortName: string;
  description: string;
  published: boolean;
  updatedAt: string;
  createdAt: string;
  specialCode?: string;
  type: ModuleType;
  // if there is a user module instance, it's id will show here.
  userModuleId?: number;
}

export type ModuleType = 'MultiUser' | 'SingleUser';
