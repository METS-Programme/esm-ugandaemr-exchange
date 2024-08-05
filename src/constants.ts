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
    id: "encounter",
    label: "Encounter",
  },
  {
    id: "episodeOfCare",
    label: "Episode of Care (Program)",
  },
  {
    id: "programWorkflowState",
    label: "Program Workflow State",
  },
  {
    id: "patientIdentifierType",
    label: "Patient Identifier Type",
  },
  {
    id: "order",
    label: "Order",
  },
  {
    id: "cohortType",
    label: "Cohort Type",
  },
];

export const syncTaskTypeDataTypes = [
  {
    id: "dataType1",
    label: "java.lang.Boolean",
  },
  {
    id: "dataType1",
    label: "java.lang.Character",
  },
  {
    id: "dataType1",
    label: "java.lang.Float",
  },
  {
    id: "dataType1",
    label: "java.lang.Integer",
  },
  {
    id: "dataType1",
    label: "java.lang.String",
  },
  {
    id: "dataType1",
    label: "java.lang.Boolean",
  },
  {
    id: "dataType1",
    label: "org.openmrs.Concept",
  },
  {
    id: "dataType1",
    label: "org.openmrs.Drug",
  },
  {
    id: "dataType1",
    label: "org.openmrs.Encounter",
  },
  {
    id: "dataType1",
    label: "org.openmrs.Order",
  },
  {
    id: "dataType1",
    label: "org.openmrs.TestOrder",
  },
  {
    id: "dataType1",
    label: "org.openmrs.Location",
  },
  {
    id: "dataType1",
    label: "org.openmrs.Patient",
  },
  {
    id: "dataType1",
    label: "org.openmrs.Person",
  },
  {
    id: "dataType1",
    label: "org.openmrs.ProgramWorkflow",
  },
  {
    id: "dataType1",
    label: "org.openmrs.Provider",
  },
  {
    id: "dataType1",
    label: "org.openmrs.User",
  },
  {
    id: "dataType1",
    label: "org.openmrs.util.AttributableDate",
  },
];
