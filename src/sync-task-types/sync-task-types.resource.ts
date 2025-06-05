import useSWR from "swr";
import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";
import axios from "axios";

export interface SyncTaskTypeResponse {
  results: syncTaskTypePayload[];
}

export function useGetSyncTaskTypes() {
  const apiUrl = `${restBaseUrl}/synctasktype?v=full`;
  const { data, error, isLoading, mutate } = useSWR<
    { data: SyncTaskTypeResponse },
    Error
  >(apiUrl, openmrsFetch);
  return {
    syncTaskTypes: data ? data?.data?.results : [],
    isError: error,
    isLoading,
    mutate,
  };
}

export function useGetDhis2Id() {
  const apiUrl = `${restBaseUrl}/systemsetting?q=ugandaemr.dhis2.organizationuuid&v=full`;
  const { data, error, isLoading, mutate } = useSWR<{ data: any }, Error>(
    apiUrl,
    openmrsFetch
  );

  const dataReturned = data?.data?.results[0];
  return {
    dhisUuid: data ? dataReturned?.value : [],
    isError: error,
    isLoading,
    mutate,
  };
}

export function useGetSmsMessages() {
  const { syncTaskTypes } = useGetSyncTaskTypes();
  const { dhisUuid } = useGetDhis2Id();

  const smsTaskType = syncTaskTypes.find(
    (task) => task.uuid === "d63cb4b5-97ba-4380-aba9-d3f60634cd7a"
  );

  const apiUrl = `${smsTaskType?.url}${dhisUuid}`;

  const fetcher = async (): Promise<smsMessagePayload[]> => {
    const authHeader = `Basic ${btoa(
      `${smsTaskType.urlUserName}:${smsTaskType.urlPassword}`
    )}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(`Error in fetcher: ${error.message}`);
    }
  };

  const { data, error } = useSWR(apiUrl, fetcher);

  return {
    smsSentMessages: data ?? [],
    isLoading: !data && !error,
    isError: error,
  };
}

export function useGetSyncTaskLogs() {
  const apiUrl = `${restBaseUrl}/synctask?v=full`;
  const { data, error, isLoading } = useSWR<{ data: { results: any } }, Error>(
    apiUrl,
    openmrsFetch
  );

  return {
    syncTaskLogs: data ? data?.data?.results : [],
    isError: error,
    isLoading,
  };
}

export async function saveSyncTaskType(payload: syncTaskTypePayload) {
  const abortController = new AbortController();
  const isUpdating = !!payload.uuid;

  const url = isUpdating
    ? `${restBaseUrl}/synctasktype/${payload.uuid}`
    : `${restBaseUrl}/synctasktype`;

  return await openmrsFetch(url, {
    method: "POST",
    signal: abortController.signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
}
