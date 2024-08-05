import { Type } from "@openmrs/esm-framework";

export const configSchema = {
  clientRegistryUrl: {
    _type: Type.String,
    _default: "http://localhost:3000/fhir",
    _description: "Concept uuid for the laboratory queue.",
  },
};

export type Config = {
  clientRegistryUrl: string;
};
