export interface Patient {
  uuid: string;
  display: string;
  identifiers: Identifier[];
  person: Person;
  voided: boolean;
  links: Link[];
  resourceVersion: string;
}

export interface Identifier {
  uuid: string;
  display: string;
  links: Link[];
}

export interface Link {
  rel: string;
  uri: string;
  resourceAlias: string;
}

export interface Person {
  uuid: string;
  display: string;
  gender: string;
  age: number;
  birthdate: string;
  birthdateEstimated: boolean;
  dead: boolean;
  deathDate: any;
  causeOfDeath: any;
  preferredName: PreferredName;
  preferredAddress: PreferredAddress;
  attributes: Attribute[];
  voided: boolean;
  birthtime: any;
  deathdateEstimated: boolean;
  links: Link[];
  resourceVersion: string;
}

export interface PreferredName {
  uuid: string;
  display: string;
  links: Link[];
}

export interface PreferredAddress {
  uuid: string;
  display: any;
  links: Link[];
}

export interface Attribute {
  uuid: string;
  display: string;
  links: Link[];
}

export interface FhirProfileCase {
  uuid: string;
  caseIdentifier: string;
  patient: Patient;
  profile: ProfileInterface;
  dateCreated: Date;
  lastUpdateDate: Date;
}

export interface Patient {
  uuid: string;
  display: string;
}

export interface profile {
  uuid: string;
  name: string;
}

export interface FhirProfileLog {
  uuid: string;
  resourceType: string;
  lastGenerationDate: string;
  numberOfResources: string;
}
