import {BridgeTemplate, LabForm, LabVmForm, ModuleForm, VmInterfaceTemplate} from './types/editorTypes';
import {v4 as uuid} from 'uuid';
import {TrackableEntity} from './types/Entity';
import {Module} from 'types/Module';
import {UserModule} from 'types/UserModule';
import { UserLab } from 'types/UserLab';


export function makeTrackableEntity(): TrackableEntity {
  return {
    id: 0
  };
}

export function makeModule(): Module {
  return {
    id: 0,
    createdAt: '',
    description: '',
    name: 'Loading',
    published: false,
    userId: 0,
    specialCode: '',
    type: 'SingleUser',
    updatedAt: ''
  };
}

export function makeUserModule(): UserModule {
  return {
    id: 0,
    createdAt: '',
    updatedAt: '',
    module: {
      id: 0,
      name: '',
      description: '',
      userId: 0,
      published: false,
      updatedAt: '',
      createdAt: '',
      specialCode: '',
      type: 'SingleUser',
      userModuleId: 0
    },
    userLabs: []
  };
}

export function makeUserLab(): UserLab {
  return {
    id: 0,
    lab: {id: 0, name: '', type: 'Class', labDifficulty: 1, moduleId: 0},
    userLabVms: [],
    hasTopology: false,
    hasReadme: false,
    status: 'NotStarted'
  };
}

export function makeModuleForm(): ModuleForm {
  return {
    ...makeTrackableEntity(),
    labs: [],
    moduleTags: [],
    description: '',
    name: '',
    published: false,
    specialCode: uuid(),
    type: 'SingleUser',
    userId: 0
  };
}

export function makeLabForm(moduleId: number, containsCoreRouter: boolean = false): LabForm {
  return {
    ...makeTrackableEntity(),
    bridgeTemplates: [
      ...(containsCoreRouter ? [makeBridgeTemplate('Core Bridge', true)] : [])
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

export function makeLabVmForm(name: string = '', isCoreRouter: boolean = false, vmTemplateId: number = 0): LabVmForm {
  return {
    id: 0,
    name: name,
    templateInterfaces: [],
    vmTemplateId: vmTemplateId,
    isCoreRouter: isCoreRouter
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

export function makeVmInterfaceTemplate(interfaceNumber: number = 0, bridgeTemplateUuid: string = ''): VmInterfaceTemplate {
  return{
    interfaceNumber: interfaceNumber,
    id: 0,
    bridgeTemplateUuid: bridgeTemplateUuid
  };
}
