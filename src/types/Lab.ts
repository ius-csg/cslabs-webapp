import { LabVm } from './Module';

export interface Lab {
    id: number;
    name: string;
    labType: string;
    moduleId: number;
    userId: number;
    labDifficulty: number;
    labVm: LabVm[];
    estimatedCpusUsed: number;
    estimatedMemoryUsedMb: number;
}
