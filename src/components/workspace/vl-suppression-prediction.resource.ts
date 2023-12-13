import useSWR from "swr";
import axios from "axios";
import { openmrsFetch } from "@openmrs/esm-framework";
import { useEffect } from "react";
type SaveParams = {
  last_encounter_date: string;
  art_start_date: string;
  date_birth: string;
  gender: string;
  last_arv_adherence: string;
  current_regimen: string;
  last_indication_for_VL_Testing: string;
};

export interface PredictionData {
  Prediction: {
    Client: string;
  };
}

type ARTStartDateRequest = {
  patientuuid: string;
};

export function useVLSuppressionDetails(params: SaveParams) {
  const apiUrl = "https://ai.mets.or.ug/predict";

  const fetcher = async () => {
    try {
      const response = await axios.post(apiUrl, params, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data as PredictionData;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  };

  const { data, error, isValidating, isLoading } = useSWR<
    PredictionData,
    Error
  >(apiUrl, fetcher);

  return {
    data: data?.Prediction.Client ?? {},
    isErrorInSendingRequest: error,
    isLoadingPrediction: isLoading,
    isValidatingParams: isValidating,
  };
}

export function extractDate(timestamp: string): string {
  const dateObject = new Date(timestamp);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function useGetARTStartDate(
  params: ARTStartDateRequest,
  onArtStartDateDataReceived: (artStartDateData: string) => void,
  conceptuuid: string
) {
  const apiUrl = `/ws/rest/v1/obs?concept=${conceptuuid}&patient=${params.patientuuid}&v=full`;
  const { data, error, isLoading, mutate } = useSWR<
    { data: { results: any } },
    Error
  >(apiUrl, openmrsFetch);
  const artStartDateData = data ? extractDate(data.data.results[0].value) : [];

  useEffect(() => {
    if (artStartDateData !== null) {
      onArtStartDateDataReceived(artStartDateData as string);
    }
  }, [artStartDateData, conceptuuid, onArtStartDateDataReceived]);

  return {
    artStartDateData,
    conceptuuid,
    isError: error,
    isLoading: isLoading,
    mutate,
  };
}

export function useGetLastEncounterDate(
  params: ARTStartDateRequest,
  onLastEncounterReceived: (lastEncounterData: string) => void,
  conceptuuid: string
) {
  const apiUrl = `/ws/rest/v1/encounter?patient=${params.patientuuid}&concept=${conceptuuid}&v=default`;
  const { data, error, isLoading, mutate } = useSWR<
    { data: { results: any } },
    Error
  >(apiUrl, openmrsFetch);

  useEffect(() => {
    if (data && data.data.results.length > 0) {
      const sortedEncounters = data.data.results.sort(
        (a, b) =>
          new Date(b.encounterDatetime).getTime() -
          new Date(a.encounterDatetime).getTime()
      );

      const lastEncounterData = extractDate(
        sortedEncounters[0].encounterDatetime
      );
      onLastEncounterReceived(lastEncounterData);
    }
  }, [data, onLastEncounterReceived]);

  return {
    lastEncounterData: data
      ? extractDate(data.data.results[0].encounterDatetime)
      : [],

    isError: error,
    isLoading: isLoading,
    mutate,
  };
}

export function useGetCurrentRegimen(
  params: ARTStartDateRequest,
  onCurrentARVRegimenReceived: (artStartDateData: string) => void,
  conceptuuid: string
) {
  const apiUrl = `/ws/rest/v1/obs?concept=${conceptuuid}&patient=${params.patientuuid}&v=full`;
  const { data, error, isLoading, mutate } = useSWR<
    { data: { results: any } },
    Error
  >(apiUrl, openmrsFetch);
  const currentARVRegimen = data ? data?.data.results[0].value?.display : null;

  useEffect(() => {
    if (currentARVRegimen !== null) {
      onCurrentARVRegimenReceived(currentARVRegimen as string);
    }
  }, [currentARVRegimen, conceptuuid, onCurrentARVRegimenReceived]);
  return {
    currentARVRegimen,
    conceptuuid,
    isError: error,
    isLoading: isLoading,
    mutate,
  };
}

export function useGetIndicationForVLTesting(
  params: ARTStartDateRequest,
  onIndicationForVLTestingReceived: (artStartDateData: string) => void,
  conceptuuid: string
) {
  const apiUrl = `/ws/rest/v1/obs?concept=${conceptuuid}&patient=${params.patientuuid}&v=full`;
  const { data, error, isLoading, mutate } = useSWR<
    { data: { results: any } },
    Error
  >(apiUrl, openmrsFetch);
  const indicationForVLTesting = data
    ? data?.data.results[0].value?.display
    : null;

  useEffect(() => {
    if (indicationForVLTesting !== null) {
      onIndicationForVLTestingReceived(indicationForVLTesting as string);
    }
  }, [indicationForVLTesting, conceptuuid, onIndicationForVLTestingReceived]);
  return {
    indicationForVLTesting,
    conceptuuid,
    isError: error,
    isLoading: isLoading,
    mutate,
  };
}

export function useGetAherence(
  params: ARTStartDateRequest,
  onAdherenceReceived: (artStartDateData: string) => void,
  conceptuuid: string
) {
  const apiUrl = `/ws/rest/v1/obs?concept=${conceptuuid}&patient=${params.patientuuid}&v=full`;
  const { data, error, isLoading, mutate } = useSWR<
    { data: { results: any } },
    Error
  >(apiUrl, openmrsFetch);
  const adherence = data ? data?.data.results[0].value?.display : null;

  useEffect(() => {
    if (adherence !== null) {
      onAdherenceReceived(adherence as string);
    }
  }, [adherence, conceptuuid, onAdherenceReceived]);
  return {
    adherence,
    conceptuuid,
    isError: error,
    isLoading: isLoading,
    mutate,
  };
}
