import {BridgeTemplate, LabForm, LabVmForm, ModuleForm} from './types/editorTypes';
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
      type: 'Temporary',
      name: 'steve',
      updatedAt: '',
      moduleId: 0
    }],
    description: '',
    name: '',
    published: false,
    specialCode: uuid(),
    type: 'SingleUser',
    userId: 0
  };
}

export function makeLabForm(moduleId: number): LabForm {
  return {
    ...makeTrackableEntity(),
    bridgeTemplates: [
      makeBridgeTemplate('Core Bridge', true)
    ],
    estimatedCpusUsed: 1,
    estimatedMemoryUsedMb: 1024,
    labDifficulty: 1,
    type: 'Class',
    labVms: [],
    name: '',
    readme: null,
    topology: null,
    moduleId: moduleId
  };
}

export function makeLabVmForm(): LabVmForm {
  return {
    id: 0,
    name: '',
    templateInterfaces: [],
    vmTemplateId: 0
  };
}

export function makeBridgeTemplate(name: string = '', isCoreBridge: boolean = false): BridgeTemplate {
  return{
    isCoreBridge: isCoreBridge,
    name: name,
    id: 0,
    uuid: uuid()
  };
}
