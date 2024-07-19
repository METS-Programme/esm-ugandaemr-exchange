import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";

export type Task = {
  no: string;
  name: string;
  description?: string;
};
export const schedulerTableHeaders = [
  {
    id: "1",
    key: "no",
    header: "No",
    accessor: "no",
  },
  {
    id: "2",
    key: "name",
    header: "TASK NAME",
    accessor: "name",
  },
  {
    id: "3",
    key: "description",
    header: "DESCRIPTION",
    accessor: "description",
  },
  {
    id: "4",
    key: "actions",
    header: "EXECUTE",
    accessor: "actions",
  },
];

export const schedulerTasks = [
  {
    no: "1",
    name: "Send Viral Load Request to Central Server Task",
    description: "Sending Viral Load requests to CPHL",
  },
  {
    no: "2",
    name: "Sending VL Program Data",
    description: "Sending VL program data",
  },
  {
    no: "3",
    name: "Request Viral Results",
    description: "Requesting for VL results",
  },
  {
    no: "4",
    name: "Send Analytics data to a central server",
    description: "Sends daily EMR metrics to central server",
  },
  {
    no: "5",
    name: "Reporting Tables Flattening task",
    description: "Creates tables for reporting using mamba",
  },
];

export async function runTask(task: Task) {
  const abortController = new AbortController();
  const apiUrl = `${restBaseUrl}/taskaction`;

  return openmrsFetch(apiUrl, {
    method: "POST",
    signal: abortController.signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      action: "runtask",
      tasks: [`${task.name}`],
    },
  });
}
