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
    labs: [{
      createdAt : '',
      labDifficulty : 1,
      id: 1,
      labType: 'temporary',
      moduleId: 5,
      name: 'steve',
      updatedAt: ''
    }],
    description: '',
    name: '',
    published: false,
    specialCode: uuid(),
    type: 'SingleUser',
    userId: 0,
    readme: null,
    topology: null
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
