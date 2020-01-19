import {Module} from './Module';
import {UserLab} from './UserLab';

export interface UserModule {
  id: number;
  module: Module;
  userLabs: UserLab[];
}
