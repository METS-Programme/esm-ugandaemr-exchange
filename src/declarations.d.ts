declare module "@carbon/react";
declare module "*.css";
declare module "*.scss";
declare module "*.png";
declare module "*.svg";

declare type SideNavProps = object;

declare type link = {
  rel?: string;
  uri?: string;
  resourceAlias?: string;
};

declare type fhirProfile = {
  uuid: string;
  name: string;
  resourceTypes?: string;
  profileEnabled?: string;
  patientIdentifierType?: {
    uuid?: string;
    display?: string;
    links?: Array<link>;
  };
  numberOfResourcesInBundle?: number;
  durationToKeepSyncedResources?: number;
  generateBundle?: boolean;
  caseBasedProfile?: boolean;
  caseBasedPrimaryResourceType?: string;
  caseBasedPrimaryResourceTypeId?: string;
  resourceSearchParameter?: string;
  conceptSource?: string;
  url?: string;
  syncLimit?: string;
  urlToken?: string;
  urlUserName?: string;
  urlPassword?: string;
  links?: Array<link>;
};

declare type exchangeProfile = {
  uuid: string;
  name: string;
  type: "fhirProfile" | "syncTask";
  icon: JSX.Element;
  incoming?: {
    url?: string;
    total?: number;
    success?: number;
    failure?: number;
    type?: string;
  };
  outgoing?: {
    url?: string;
    total?: number;
    success?: number;
    failure?: number;
    type?: string;
  };
};

declare type SyncTaskType = {
  uuid: string;
  name: string;
};

declare type SyncFHIRProfile = {
  uuid: string;
  name: string;
};

declare type TransactionCount = {
  count: number;
};

declare type ProfileTransactions = {
  name: string;
  identifier: string;
  status: string;
  statusCode?: string;
  dateCreated?: string;
  comment?: string;
  actions?: any;
  patientUuid?: string;
};

declare type HIEProfilesInterface = {
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
};

declare type ProfileInterface = {
  name: string;
  incomingCount?: number;
  outgoingCount?: number;
  incoming?: [];
  outgoing?: [];
};

declare type DonutData = Array<{
  group: string;
  value: number;
}>;

declare type Report = {
  id: string;
  label: string;
};

declare type ReportProps = {
  categoryName: string;
  reports: Array<Report>;
};

declare type Indicator = {
  id: string;
  label: string;
  type?: string;
  attributes?: Array<IndicatorItem>;
};

declare type IndicatorItem = {
  id: string;
  label: string;
  type?: string;
};

declare type ReportParamItem = {
  label: string;
  type?: string;
  expression: string;
};

type savedReport = {
  id: string;
  label: string;
  description: string;
  type: string;
  columns: string;
  rows: string;
  aggregator: string;
  report_request_object: string;
};

type savedDashboard = {
  uuid: string;
  name: string;
  description: string;
  items: any;
};

declare type Item = {
  id: string;
  label: string;
};
