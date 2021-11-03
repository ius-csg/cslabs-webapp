import {DateTime} from 'luxon';

export interface Maintenance {
  startTime?: DateTime;
  endTime?: DateTime;
}
