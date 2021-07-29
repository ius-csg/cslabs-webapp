export interface Maintenance {
  isMaintenanceMode: boolean;
  isRestorationTimeKnown: boolean;
  restorationTime?: number;
}
