import {Module} from './Module';
import {UserLab} from './UserLab';
import {TrackableEntity} from './Entity';

export interface UserModule extends TrackableEntity {
  module: Module;
  userLabs: UserLab[];
}
