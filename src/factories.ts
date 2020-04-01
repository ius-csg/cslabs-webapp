import {LabForm, ModuleForm} from './types/editorTypes';
import uuid from 'uuid';
import {TrackableEntity} from './types/Entity';


export function makeTrackableEntity(): TrackableEntity {
  return {
    id: 0,
    createdAt: '',
    updatedAt: ''
  };
}

export function makeModuleForm(): ModuleForm {
  return {
    ...makeTrackableEntity(),
    labs: [],
    description: '',
    name: '',
    published: false,
    specialCode: uuid(),
    type: 'SingleUser',
    userId: 0,
    userModuleId: undefined
  };
}

export function makeLabForm(): LabForm {
  return {
    ...makeTrackableEntity(),
    bridgeTemplates: [],
    estimatedCpusUsed: 1,
    estimatedMemoryUsedMb: 1024,
    labDifficulty: 1,
    labType: 'class',
    labVms: [],
    moduleId: 0,
    name: ''
  };
}
