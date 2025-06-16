export const fhirTableHeaders = [
  {
    id: "1",
    key: "name",
    header: "NAME",
    accessor: "name",
  },
  {
    id: "2",
    key: "url",
    header: "URL",
    accessor: "url",
  },
  {
    id: "3",
    key: "uuid",
    header: "UUID",
    accessor: "uuid",
  },
];

export const syncTaskTypeTableHeaders = [
  {
    id: "1",
    key: "name",
    header: "NAME",
    accessor: "name",
  },
  {
    id: "2",
    key: "url",
    header: "URL",
    accessor: "url",
  },
  {
    id: "3",
    key: "dataType",
    header: "DATA TYPE ID",
    accessor: "dataType",
  },
  {
    id: "4",
    key: "uuid",
    header: "UUID",
    accessor: "uuid",
  },
];

export const syncTaskLogsHeaders = [
  {
    id: 1,
    key: "syncTask",
    header: "Sync Task",
    accessor: "syncTask",
  },
  {
    id: 2,
    key: "name",
    header: "Sync Task Type Name",
    accessor: "name",
  },
  {
    id: 3,
    key: "status",
    header: "Status",
    accessor: "status",
  },
  {
    id: 4,
    key: "statusCode",
    header: "Status Code",
    accessor: "statusCode",
  },
  {
    id: 5,
    key: "requireAction",
    header: "Require Action",
    accessor: "requireAction",
  },
  {
    id: 6,
    key: "actionCompleted",
    header: "Action Completed",
    accessor: "actionCompleted",
  },
  {
    id: 7,
    key: "dateSent",
    header: "Date Sent",
    accessor: "dateSent",
  },
];

export const profileTransactionsHeaders = [
  {
    id: "1",
    key: "identifier",
    header: "IDENTIFIER",
    accessor: "identifier",
  },
  {
    id: "2",
    key: "name",
    header: "CLIENT NAME",
    accessor: "name",
  },
  {
    id: "3",
    key: "status",
    header: "TRANSACTION STATUS",
    accessor: "status",
  },
  {
    id: "4",
    key: "dateCreated",
    header: "DATE",
    accessor: "dateCreated",
  },
];

export const sentSmsHeaders = [
  {
    id: "1",
    key: "mobile_no",
    header: "Mobile Number",
    accessor: "mobile_no",
  },
  {
    id: "2",
    key: "message",
    header: "Message",
    accessor: "message",
  },
  {
    id: "3",
    key: "date_created",
    header: "Date Sent",
    accessor: "date_created",
  },
];

export const incomingTransactionsHeaders = [
  {
    id: "1",
    key: "identifier",
    header: "IDENTIFIER",
    accessor: "identifier",
  },
  {
    id: "2",
    key: "name",
    header: "CLIENT NAME",
    accessor: "name",
  },
  {
    id: "3",
    key: "dateCreated",
    header: "DATE",
    accessor: "dateCreated",
  },
  {
    id: "4",
    key: "comment",
    header: "STATUS",
    accessor: "comment",
  },
  {
    id: "5",
    key: "actions",
    header: "ACTIONS",
    accessor: "actions",
  },
];

export const caseBasedPrimaryResourceTypes: Array<Item> = [
  {
    id: "Encounter",
    label: "Encounter",
  },
  {
    id: "EpisodeOfCare",
    label: "Episode of Care (Program)",
  },
  {
    id: "programWorkflowState",
    label: "Program Workflow State",
  },
  {
    id: "PatientIdentifierType",
    label: "Patient Identifier Type",
  },
  {
    id: "Order",
    label: "Order",
  },
  {
    id: "CohortType",
    label: "Cohort Type",
  },
];

export const syncTaskTypeDataTypes = [
  {
    id: "dataType1",
    label: "java.lang.Boolean",
  },
  {
    id: "dataType2",
    label: "java.lang.Character",
  },
  {
    id: "dataType3",
    label: "java.lang.Float",
  },
  {
    id: "dataType4",
    label: "java.lang.Integer",
  },
  {
    id: "dataType5",
    label: "java.lang.String",
  },
  {
    id: "dataType6",
    label: "java.lang.Boolean",
  },
  {
    id: "dataType7",
    label: "org.openmrs.Concept",
  },
  {
    id: "dataType8",
    label: "org.openmrs.Drug",
  },
  {
    id: "dataType9",
    label: "org.openmrs.Encounter",
  },
  {
    id: "dataType10",
    label: "org.openmrs.Order",
  },
  {
    id: "dataType11",
    label: "org.openmrs.TestOrder",
  },
  {
    id: "dataType11",
    label: "org.openmrs.Location",
  },
  {
    id: "dataType12",
    label: "org.openmrs.Patient",
  },
  {
    id: "dataType13",
    label: "org.openmrs.Person",
  },
  {
    id: "dataType14",
    label: "org.openmrs.ProgramWorkflow",
  },
  {
    id: "dataType15",
    label: "org.openmrs.Provider",
  },
  {
    id: "dataType16",
    label: "org.openmrs.User",
  },
  {
    id: "dataType17",
    label: "org.openmrs.util.AttributableDate",
  },
];

export const resourceTypeGroups = [
  [
    { id: "Patient", labelKey: "patient", fallback: "Patient" },
    { id: "Person", labelKey: "person", fallback: "Person" },
    {
      id: "EpisodeOfCare",
      labelKey: "episodeOfCare",
      fallback: "Episode of Care (Program)",
    },
    { id: "Encounter", labelKey: "encounter", fallback: "Encounter" },
  ],
  [
    { id: "Observation", labelKey: "observation", fallback: "Observation" },
    {
      id: "ServiceRequest",
      labelKey: "serviceRequest",
      fallback: "Service Request (Lab Orders)",
    },
    {
      id: "MedicationRequest",
      labelKey: "medicationRequest",
      fallback: "Medication Request (Medication Orders)",
    },
    {
      id: "Practitioner",
      labelKey: "practitioner",
      fallback: "Practitioner (Provider)",
    },
  ],
];

export const fhirProfileCaseHeaders = [
  {
    id: "1",
    key: "patient",
    header: "Patient",
    accessor: "patient",
  },
  {
    id: "2",
    key: "profileIdentifier",
    header: "Profile Identifier",
    accessor: "profileIdentifier",
  },
  {
    id: "3",
    key: "dateCreated",
    header: "Date Created",
    accessor: "dateCreated",
  },
  {
    id: "4",
    key: "lastUpdateDate",
    header: "Last Updated",
    accessor: "lastUpdateDate",
  },
];

export const fhirProfileLogHeaders = [
  {
    id: "1",
    key: "resourceType",
    header: "Resource",
    accessor: "resourceType",
  },
  {
    id: "2",
    key: "lastGenerationDate",
    header: "Last Sync Date",
    accessor: "lastGenerationDate",
  },
  {
    id: "3",
    key: "numberOfResources",
    header: "Number of Resources",
    accessor: "numberOfResources",
  },
];

export const fhirProfileResourcesHeaders = [
  {
    id: "1",
    key: "uuid",
    header: "Resource ID",
    accessor: "uuid",
  },
  {
    id: "2",
    key: "dateCreated",
    header: "Date Created",
    accessor: "dateCreated",
  },
  {
    id: "3",
    key: "synced",
    header: "Synced to Server",
    accessor: "synced",
  },
  {
    id: "4",
    key: "dateSynced",
    header: "Date Synced",
    accessor: "dateSynced",
  },
];
