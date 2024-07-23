import useSWR from "swr";
import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";

export function useGetFacilityMetrics() {
  const apiURL = `${restBaseUrl}/ugandaemrreports/genderMetrics`;

  const { data, error, isLoading } = useSWR<{ data: { results: any } }, Error>(
    apiURL,
    openmrsFetch
  );

  return {
    facilityMetrics: data?.data ? mapFacilityMetrics(data?.data) : {},
    isLoading,
    isError: error,
  };
}

export function mapFacilityMetrics(dataArray) {
  let facilityMetrics;
  if (dataArray) {
    facilityMetrics = {
      gender: [
        {
          group: "Female",
          value: dataArray?.gender?.disaggregation?.find((entry) =>
            // eslint-disable-next-line no-prototype-builtins
            entry.hasOwnProperty("F")
          )?.F,
        },
        {
          group: "Male",
          value: dataArray?.gender?.disaggregation?.find((entry) =>
            // eslint-disable-next-line no-prototype-builtins
            entry.hasOwnProperty("M")
          )?.M,
        },
      ],
      totalPatients: dataArray?.gender?.totalPatients,
      nationality: [
        {
          group: "National",
          value: dataArray?.nationality?.disaggregation.find((entry) =>
            // eslint-disable-next-line no-prototype-builtins
            entry.hasOwnProperty("National")
          )?.National,
        },
        {
          group: "Foreigner",
          value: 6,
        },
        {
          group: "Refugee",
          value: 2,
        },
      ],
    };
  }

  return facilityMetrics;
}

export function useServicePointCount(
  parentLocation: string,
  beforeDate: string,
  afterDate: string
) {
  const apiUrl = `${restBaseUrl}/queuestatistics?parentLocation=${parentLocation}&toDate=${afterDate}&fromDate=${beforeDate}`;
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    { data: { results: any } },
    Error
  >(apiUrl, openmrsFetch);

  return {
    stats: data?.data ? formatPOCData(data?.data?.results) : [],
    isLoadingPOCSats: isLoading,
    isError: error,
    isValidating,
    mutate,
  };
}

export function useParentLocation(currentLocationUuid: string) {
  const apiUrl = `${restBaseUrl}/location/${currentLocationUuid}`;
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    { data: any },
    Error
  >(apiUrl, openmrsFetch);

  return {
    location: data?.data,
    isLoadingLocation: isLoading,
    isError: error,
    isValidating,
    mutate,
  };
}

export async function getPOCDataStatistics(
  parentLocation: string,
  beforeDate: string,
  afterDate: string
) {
  const abortController = new AbortController();
  const apiUrl = `${restBaseUrl}/queuestatistics?parentLocation=${parentLocation}&toDate=${afterDate}&fromDate=${beforeDate}`;

  return openmrsFetch(apiUrl, {
    signal: abortController.signal,
  });
}

export function formatPOCData(dataArray: Array<any>) {
  const formatedArray = [];
  dataArray?.map((item) => {
    formatedArray.push({
      group: "Pending",
      key: item?.locationTag?.name,
      value: item?.pending,
    });
    formatedArray.push({
      group: "Serving",
      key: item?.locationTag?.name,
      value: item?.serving,
    });
    formatedArray.push({
      group: "Completed",
      key: item?.locationTag?.name,
      value: item?.completed,
    });
  });

  return formatedArray;
}
