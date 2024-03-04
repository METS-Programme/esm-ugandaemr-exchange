import useSWR from "swr";
import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";
import { EditAction } from "./fhir.component";

export function useGetFhirProfiles() {
  const apiUrl = `${restBaseUrl}/syncfhirprofile`;
  const { data, error, isLoading } = useSWR<{ data: { results: any } }, Error>(
    apiUrl,
    openmrsFetch
  );
  return {
    fhirProfiles: data ? mapDataElements(data?.data["results"]) : [],
    isError: error,
    isLoadingFhirProfiles: isLoading,
  };
}

export function mapDataElements(dataArray: Array<Record<string, string>>) {
  const arrayToReturn: Array<fhirProfile> = [];
  if (dataArray) {
    dataArray.map((profile: Record<string, any>) => {
      if (profile?.profileEnabled) {
        arrayToReturn.push({
          name: profile?.name,
          uuid: profile?.uuid,
          resourceTypes: profile?.resourceTypes,
          profileEnabled: profile?.profileEnabled ? "Yes" : "No",
          patientIdentifierType: profile?.patientIdentifierType,
          numberOfResourcesInBundle: profile?.numberOfResourcesInBundle,
          durationToKeepSyncedResources: profile?.durationToKeepSyncedResources,
          generateBundle: profile?.generateBundle,
          caseBasedProfile: profile?.caseBasedProfile,
          caseBasedPrimaryResourceType: profile?.caseBasedPrimaryResourceType,
          caseBasedPrimaryResourceTypeId:
            profile?.caseBasedPrimaryResourceTypeId,
          resourceSearchParameter: profile?.resourceSearchParameter,
          conceptSource: profile?.conceptSource,
          url: profile?.url,
          syncLimit: profile?.syncLimit,
          urlToken: profile?.urlToken,
          urlUserName: profile?.urlUserName,
          urlPassword: profile?.urlPassword,
          links: profile?.links,
          actions: EditAction(),
        });
      }
    });
  }

  return arrayToReturn;
}
