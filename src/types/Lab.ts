import {TrackableEntity} from './Entity';

export interface Lab extends TrackableEntity {
  name: string;
  labType: LabType;
  moduleId: number;
  labDifficulty: LabDifficulty;
}


export type LabType = 'temporary' | 'class' | 'permanent';
export type LabDifficulty = 1 | 2 | 3;
