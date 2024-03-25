import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";
import useSWR, { useSWRConfig } from "swr";

type encounterRequest = {
  fromDate: string;
  toDate: string;
  encUserColumn: string;
  groupBy: string;
};

export type dataProvider = {
  group: string;
  key: string;
  value: number;
  personUuid: string;
};

export function useGetDataEntryStatistics(params: encounterRequest) {
  const apiUrl = `${restBaseUrl}/dataentrystatistics?fromDate=${params.fromDate}&toDate=${params.toDate}&encUserColumn=${params.encUserColumn}&groupBy=${params.groupBy}`;
  const abortController = new AbortController();

  const { mutate } = useSWRConfig();
  const clearCache = () => mutate(() => true, undefined, { revalidate: false });

  const fetcher = () =>
    openmrsFetch(apiUrl.toString(), {
      signal: abortController.signal,
    });

  const { data, error, isLoading, isValidating } = useSWR<
    { data: { any } },
    Error
  >(apiUrl, fetcher);

  const dataResults: Array<{ group: string; key: string; value: number }> = formatReults(data?.data);

  return {
    encounterData: dataResults ? dataResults : [],
    isLoadingStats: isLoading,
    isError: error,
    isValidating,
    mutate,
    clearCache,
  };
}

export async function getDataEntryStatistics(params: encounterRequest) {
  const apiUrl = `${restBaseUrl}/dataentrystatistics?fromDate=${params.fromDate}&toDate=${params.toDate}&encUserColumn=${params.encUserColumn}&groupBy=${params.groupBy}`;
  const abortController = new AbortController();

  return openmrsFetch(apiUrl, {
    signal: abortController.signal,
  });
}

export function formatReults(dataResults) {
  const dataEntryData: Array<dataProvider> = [];

  dataResults?.forEach((entry) => {
    dataEntryData.push({
      group: entry.entryType,
      key: entry.fullName,
      value: entry.numberOfEntries,
      personUuid: entry.personUuid,
    });
  });

  return dataEntryData;
}
