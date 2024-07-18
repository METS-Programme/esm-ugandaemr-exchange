import useSWR from "swr";
import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";

export interface SyncTaskTypeResponse {
  results: Result[];
}

export interface Result {
  uuid: string;
  name: string;
  dataType: string;
  url: string;
}

export function useGetSyncTaskTypes() {
  const apiUrl = `${restBaseUrl}/synctasktype?v=full`;
  const { data, error, isLoading } = useSWR<
    { data: SyncTaskTypeResponse },
    Error
  >(apiUrl, openmrsFetch);
  return {
    syncTaskTypes: data ? data?.data?.results : [],
    isError: error,
    isLoading,
  };
}
