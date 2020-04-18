import {BaseModule} from './Module';
import {Lab} from './Lab';
import {LabVm} from './LabVm';
import {Entity, EntityWithUuid} from './Entity';


export interface ModuleForm extends BaseModule {
  labs: Lab[];
}

export interface LabForm extends Lab {
  readme: File | null;
  topology: File | null;
  labVms: LabVmForm[];
  bridgeTemplates: BridgeTemplate[];
  estimatedCpusUsed: number;
  estimatedMemoryUsedMb: number;
}


export interface LabVmForm extends LabVm {
  templateInterfaces: VmInterfaceTemplate[];
  // links to the template id created after uploading a vm with an ova file
  vmTemplateId: number;
}

export interface BridgeTemplate extends EntityWithUuid {
  name: string;
  isCoreBridge: boolean;
}

export interface VmInterfaceTemplate extends Entity {
  interfaceNumber: number;
  bridgeTemplateUuid: string; // links to the uuid of the bridge.
}

export interface VmTemplate extends Entity {
  isCoreRouter: boolean;
  name: string;
}
