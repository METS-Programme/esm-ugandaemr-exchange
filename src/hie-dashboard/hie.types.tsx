export interface SyncTaskType {
  uuid: string;
  name: string;
}

export interface SyncFHIRProfile {
  uuid: string;
  name: string;
}

export interface TransactionCount {
  count: number;
}

export interface HIEProfilesInterface {
  alis: ProfileInterface;
  artAccess: ProfileInterface;
  cbs: ProfileInterface;
  clientRegistry: ProfileInterface;
  ecbs: ProfileInterface;
  ehmis: ProfileInterface;
  facilitySHR: ProfileInterface;
  pirs: ProfileInterface;
  smsReminders: ProfileInterface;
  viralLoad: ProfileInterface;
}

export interface ProfileInterface {
  name: string;
  incomingCount?: number;
  outgoingCount?: number;
  incoming?: [];
  outgoing?: [];
}
