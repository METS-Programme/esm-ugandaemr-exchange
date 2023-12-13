import useSWR from "swr";
import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";

export function useGetFacilityMetrics() {
  const apiURL = `${restBaseUrl}ugandaemrreports/genderMetrics`;

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
