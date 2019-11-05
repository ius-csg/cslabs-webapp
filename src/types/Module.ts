import {UserLabVm} from './UserLabVm';

export interface Module {
  id: number;
  name: string;
  shortName: string;
  description: string;
  published: boolean;
  updatedAt: string;
  createdAt: string;
  specialCode: string;
}

export interface Lab {
  id: number;
  name: string;
}

export interface LabVm {
  id: number;
  name: string;
}

export interface UserModule {
  id: number;
  module: Module;
  userLabs: UserLab[];
}

export interface UserLab {
  id: number;
  lab: Lab;
  userLabVms: UserLabVm[];
}

