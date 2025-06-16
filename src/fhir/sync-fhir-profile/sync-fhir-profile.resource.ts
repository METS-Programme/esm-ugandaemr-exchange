import useSWR from "swr";
import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";
import { FhirProfileCase, FhirProfileLog } from "../../types";

export function useGetFhirProfiles() {
  const apiUrl = `${restBaseUrl}/syncfhirprofile`;
  const { data, error, isLoading } = useSWR<{ data: { results: any } }, Error>(
    apiUrl,
    openmrsFetch
  );
  return {
    fhirProfiles: data ? data?.data?.results : [],
    isError: error,
    isLoadingFhirProfiles: isLoading,
  };
}
export function useGetPatientIdentifierType() {
  const apiUrl = `${restBaseUrl}/patientidentifiertype`;
  const { data, error, isLoading } = useSWR<{ data: { results: any } }, Error>(
    apiUrl,
    openmrsFetch
  );
  return {
    patientIdentifierTypes: data ? data?.data?.results : [],
    isError: error,
    isLoadingPatientIdentifierTypes: isLoading,
  };
}

export function mapDataElements(dataArray: Array<Record<string, any>>) {
  const arrayToReturn: Array<fhirProfile> = [];
  if (dataArray) {
    dataArray.forEach((profile: Record<string, any>) => {
      arrayToReturn.push({
        name: profile?.name,
        uuid: profile?.uuid,
        resourceTypes: profile?.resourceTypes,
        profileEnabled: profile?.profileEnabled,
        patientIdentifierType: profile?.patientIdentifierType,
        numberOfResourcesInBundle: profile?.numberOfResourcesInBundle,
        durationToKeepSyncedResources: profile?.durationToKeepSyncedResources,
        generateBundle: profile?.generateBundle,
        caseBasedProfile: profile?.caseBasedProfile,
        caseBasedPrimaryResourceType: profile?.caseBasedPrimaryResourceType,
        caseBasedPrimaryResourceTypeId: profile?.caseBasedPrimaryResourceTypeId,
        resourceSearchParameter: profile?.resourceSearchParameter,
        conceptSource: profile?.conceptSource,
        url: profile?.url,
        syncLimit: profile?.syncLimit,
        urlToken: profile?.urlToken,
        urlUserName: profile?.urlUserName,
        urlPassword: profile?.urlPassword,
        links: profile?.links,
      });
    });
  }

  return arrayToReturn;
}

export async function saveSyncFhirProfile(payload: syncFhirProfilePayload) {
  const abortController = new AbortController();
  const isUpdating = !!payload.uuid;

  const url = isUpdating
    ? `${restBaseUrl}/syncfhirprofile/${payload.uuid}`
    : `${restBaseUrl}/syncfhirprofile`;

  return await openmrsFetch(url, {
    method: "POST",
    signal: abortController.signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
}

export function useGetSyncFhirCase(uuid: string) {
  const apiUrl = `${restBaseUrl}/syncfhircase?profile=${uuid}&v=full`;
  const { data, isLoading, error, mutate } = useSWR<
    { data: { results: Array<FhirProfileCase> } },
    Error
  >(apiUrl, openmrsFetch);

  return {
    fhirProfileCases: data ? data?.data?.results : [],
    isLoading,
    error,
    mutate,
  };
}

export function useGetSyncFhirProfileLog(uuid: string) {
  const apiUrl = `${restBaseUrl}/syncfhirprofilelog?profile=${uuid}&v=full`;
  const { data, isLoading, error, mutate } = useSWR<
    { data: { results: Array<FhirProfileLog> } },
    Error
  >(apiUrl, openmrsFetch);

  return {
    fhirProfileLogs: data ? data?.data?.results : [],
    isLoading,
    error,
    mutate,
  };
}
