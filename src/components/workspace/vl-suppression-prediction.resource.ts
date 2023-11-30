import useSWR from "swr";
import axios from "axios";

interface SaveParams {
  encounter_date: string;
  art_start_date: string;
  date_birth: string;
  gender: string;
  arv_adherence: string;
  current_regimen: string;
  Indication_for_VL_Testing: string;
}

interface PredictionData {
  Prediction: {
    Client: string;
  };
}

export function useVLSuppressionDetails(params: SaveParams) {
  const apiUrl = "http://161.97.98.248:8080/predict";

  const fetcher = async () => {
    try {
      const response = await axios.post(apiUrl, params, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
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
    data: data ?? {},
    isErrorInSendingRequest: error,
    isLoadingPrediction: isLoading,
    isValidatingParams: isValidating,
  };
}
