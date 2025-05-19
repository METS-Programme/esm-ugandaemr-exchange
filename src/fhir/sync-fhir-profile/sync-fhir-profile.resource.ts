import useSWR from "swr";
import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";

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
