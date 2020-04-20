import {TrackableEntity} from './Entity';

export interface Lab extends TrackableEntity {
  name: string;
  type: LabType;
  labDifficulty: LabDifficulty;
  moduleId: number;
}


export type LabType = 'Temporary' | 'Class' | 'Permanent';
export const labTypes: LabType[] = ['Temporary', 'Class', 'Permanent'];
export type LabDifficulty = 1 | 2 | 3;
