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
  conceptuuid: string;
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
      throw new Error(`Error in fetcher: ${error.message}`);
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
  onArtStartDateDataReceived: (artStartDateData: string) => void
) {
  const apiUrl = `/ws/rest/v1/obs?concept=${params.conceptuuid}&patient=${params.patientuuid}&v=full`;
  const { data, error, isLoading, mutate } = useSWR<
    { data: { results: any } },
    Error
  >(apiUrl, openmrsFetch);
  const artStartDateData = data ? extractDate(data.data.results[0].value) : [];
  const conceptuuid = data ? data?.data.results[0].concept.uuid : null;

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
  onLastEncounterReceived: (lastEncounterData: string) => void
) {
  const apiUrl = `/ws/rest/v1/encounter?patient=${params.patientuuid}&concept=${params.conceptuuid}&v=default`;
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
