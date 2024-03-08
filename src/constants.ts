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
