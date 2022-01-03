import {BridgeTemplate, LabForm, LabVmForm, ModuleForm, VmInterfaceTemplate} from './types/editorTypes';
import uuid from 'uuid';
import {TrackableEntity} from './types/Entity';
import {Tag} from 'react-tag-autocomplete';
import {ModuleDifficulty} from 'types/Module';


export function makeTrackableEntity(): TrackableEntity {
  return {
    id: 0
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
    userId: 0,
    difficulty: 0
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

export function makeSearchInputs(title: string = '', description: string = '', difficulty: ModuleDifficulty = 0, tags: Tag[] = [] as Tag[]) {
  return {
    id: 0,
    title: title,
    description: description,
    difficulty: difficulty,
    tags: tags
  };
}