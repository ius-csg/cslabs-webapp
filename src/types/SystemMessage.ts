export type SystemMessageType = 'Info' | 'Warning' | 'Notice';

export interface SystemMessage {
  id: number;
  type: SystemMessageType;
  description: string;
}
