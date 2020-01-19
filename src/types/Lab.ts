import {LabVm} from './LabVm';

export interface Lab {
  id: number;
  name: string;
  status: string;
  labType: string;
  moduleId: number;
  userId: number;
  labDifficulty: number;
  labVms?: LabVm[];
  estimatedCpusUsed: number;
  estimatedMemoryUsedMb: number;
}
