
export interface Entity {
  id: number;
}

export interface EntityWithUuid extends Entity {
  uuid: string;
}

export interface TrackableEntity extends Entity {
  createdAt: string;
  updatedAt: string;
}

export type TrackableEntityWithUuid = TrackableEntity  &  EntityWithUuid;
