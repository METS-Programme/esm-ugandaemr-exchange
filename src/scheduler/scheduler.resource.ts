import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";
import useSWR from "swr";
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

export function useGetTasks() {
  const apiUrl = `${restBaseUrl}/taskdefinition?v=custom:(uuid,name,description,taskClass)`;
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    { data: any },
    Error
  >(apiUrl, openmrsFetch);

  return {
    tasks: data ? mapTaskData(data?.data["results"]) : [],
    isLoadingTasks: isLoading,
    isError: error,
    isValidating,
    mutate,
  };
}

export async function runTask(task: taskItem) {
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
export function mapTaskData(dataArray: Array<Record<string, string>>) {
  const arrayToReturn: Array<taskItem> = [];
  if (dataArray) {
    dataArray.map((task: Record<string, string>, index) => {
      arrayToReturn.push({
        no: (index += 1),
        uuid: task?.uuid,
        name: task?.name,
        description: task?.description,
        taskClass: task?.taskClass,
      });
    });
  }

  return arrayToReturn;
}
