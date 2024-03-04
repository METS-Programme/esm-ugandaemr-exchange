import React from "react";
import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";
import {
  BuildingInsights_2,
  Chat,
  Collaborate,
  DataCenter,
  Datastore,
  Db2Database,
  GroupAccess,
  IbmMq,
  LoadBalancerPool,
  LogicalPartition,
  Microscope,
  Product,
  Rss,
} from "@carbon/react/icons";
import useSWR from "swr";
import dayjs from "dayjs";
import { TableAction } from "./hie-metrics/hie-dashboard.component";

export function useFetchSyncFhirProfiles() {
  const apiURL = "ws/rest/v1/syncfhirprofile?v=custom:(uuid,name)";

  const { data, error, isLoading } = useSWR<
    { data: { results: Array<SyncFHIRProfile> } },
    Error
  >(apiURL, openmrsFetch);

  return {
    syncFhirProfiles: data?.data["results"],
    isLoading,
    isError: error,
  };
}

export function useFetchSyncTaskTypes() {
  const apiURL = "ws/rest/v1/synctasktype?v=custom:(uuid,name)";

  const { data, error, isLoading } = useSWR<
    { data: { results: Array<SyncTaskType> } },
    Error
  >(apiURL, openmrsFetch);

  return {
    syncTaskTypes: data?.data["results"],
    isLoading,
    isError: error,
  };
}

export async function fetchTransactionCount(
  uuid: string,
  startDate,
  endDate,
  type = "fhirProfile" || "syncTask"
) {
  const abortController = new AbortController();
  const apiURL =
    type === "fhirProfile"
      ? `${restBaseUrl}/syncfhirresourcestats?profile`
      : `${restBaseUrl}/synctaskstats?type`;

  const response = await openmrsFetch(
    `${apiURL}=${uuid}&startDate=${startDate}&endDate=${endDate}`,
    {
      signal: abortController.signal,
    }
  );
  return response.json();
}

export async function fetchTransactions(
  uuid: string,
  startDate,
  endDate,
  type = "fhirProfile" || "syncTask"
) {
  const abortController = new AbortController();
  const apiURL =
    type === "fhirProfile"
      ? `${restBaseUrl}/syncfhirresourcedetails?profile`
      : `${restBaseUrl}/synctaskdetails?synctasktype`;

  return await openmrsFetch(
    `${apiURL}=${uuid}&startDate=${startDate}&endDate=${endDate}`,
    {
      signal: abortController.signal,
    }
  );
}

export function getProfiles() {
  const profiles: Array<exchangeProfile> = [
    {
      uuid: "7c65ca72-343e-4e7b-9fd7-aa1d4d72bb0a", // Generated to uniquely identify the profile
      name: "ART ACCESS",
      type: "fhirProfile",
      icon: <GroupAccess size={25} />,
      incoming: {
        url: "4c4e9551-d9d6-4882-93bd-e61a42e2f755",
        total: 0,
        success: 0,
        failure: 0,
        type: "syncTask",
      },
      outgoing: {
        url: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "d03f0fa9-5b32-454d-9eb8-d6563b68cc4a", // Generated to uniquely identify the profile
      name: "ALIS",
      type: "fhirProfile",
      icon: <Microscope size={25} />,
      incoming: {
        url: "d4a3ebbb-e793-4e56-867c-0cf998e51f56",
        total: 0,
        success: 0,
        failure: 0,
        type: "syncTask",
      },
      outgoing: {
        url: "2f0ef683-c988-448b-b928-e3e2cf6657af",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "6aab2c93-0517-4aa0-82e8-dec9065f3f26", // Generated to uniquely identify the profile
      name: "VL",
      type: "fhirProfile",
      icon: <LoadBalancerPool size={25} />,
      incoming: {
        url: "3396dcf0-2106-4e73-9b90-c63978c3a8b4",
        total: 0,
        success: 0,
        failure: 0,
        type: "syncTask",
      },
      outgoing: {
        url: "3551ca84-06c0-432b-9064-fcfeefd6f4ec",
        total: 0,
        success: 0,
        failure: 0,
        type: "syncTask",
      },
    },
    {
      uuid: "dab00e39-9ac4-483e-b57e-421033293ebd", // Generated to uniquely identify the profile
      name: "eCBSS",
      type: "fhirProfile",
      icon: <IbmMq size={25} />,
      incoming: {
        url: "9e358825-ae42-4837-9d8f-0fc77c3e6598", // Random generated url
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
      outgoing: {
        url: "99c4d715-4fcf-4d95-a946-257c6de05cf7",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "cdec473b-90e0-4155-8b9d-677016f39dac", // Generated to uniquely identify the profile
      name: "PIRS",
      type: "fhirProfile",
      icon: <LogicalPartition size={25} />,
      incoming: {
        url: "e5e41e4c-fb2d-4b9a-8e70-5f6ee85ae304", // Random generated url
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
      outgoing: {
        url: "6ebd85c8-127b-4c88-8a40-27defef367a9",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "47bb67f3-9acc-4e86-8400-b2a7b681f5f3", // Generated to uniquely identify the profile
      name: "eHMIS",
      type: "fhirProfile",
      icon: <DataCenter size={25} />,
      incoming: {
        url: "8098d7ee-47a5-4f49-9540-c3d2c81a0bfe", // Random generated url
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
      outgoing: {
        url: "c5f00f18-c0f6-4917-b973-2b7c1d2d4a81",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "2aff3fa9-c5f9-40c7-ad7c-a499d0295725", // Generated to uniquely identify the profile
      name: "SHR",
      type: "fhirProfile",
      icon: <Datastore size={25} />,
      incoming: {
        url: "f28f83b1-0fbc-4a91-b064-7fbc9da76480", // Random generated url
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
      outgoing: {
        url: "0b7eb397-4488-4a88-9967-a054b3c26d6f",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "3fddf9f6-7887-428a-91d8-9d650b316f63", // Generated to uniquely identify the profile
      name: "CR",
      type: "fhirProfile",
      icon: <Collaborate size={25} />,
      incoming: {
        url: "da300dff-1cd8-4b8c-a4be-60aa884fe10b", // Random generated url
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
      outgoing: {
        url: "84242661-aadf-42e4-9431-bf8afefb4433",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "3eec4bbc-702e-4669-9edb-412194021c44", // Generated to uniquely identify the profile
      name: "CBS",
      type: "fhirProfile",
      icon: <Rss size={25} />,
      incoming: {
        url: "a3b6a8e2-6369-4bdc-b67f-fa7855f062b2", // Random generated url
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
      outgoing: {
        url: "6511be5a-72f2-4638-a60b-78e31c3e2b28",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "3e2de79f-1145-44db-ac4b-bcfb630f429a", // Generated to uniquely identify the profile
      name: "PR",
      type: "fhirProfile",
      icon: <Product size={25} />,
      incoming: {
        url: "5426f5e3-4232-43e8-b10f-07b7093927b8-PR", // Random generated url
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
      outgoing: {
        url: "0c672b6e-2eec-4a4e-91e2-e2b93624f8a5", // Random generated url
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "8da0ef9b-70fa-4af4-86eb-072d6645daaf", // Generated to uniquely identify the profile
      name: "HF",
      type: "fhirProfile",
      icon: <BuildingInsights_2 size={25} />,
      incoming: {
        url: "2058f919-d0e3-415a-bbf3-60497e41123d", // Random generated url
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
      outgoing: {
        url: "832363da-73e8-4e18-af70-d9d0a4e2df55", // Random generated url
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "fb1d3761-fe0b-440a-9a9e-694bcbf91dea", // Generated to uniquely identify the profile
      name: "DWH",
      type: "fhirProfile",
      icon: <Db2Database size={25} />,
      incoming: {
        url: "7d541a27-2311-4a0d-85c9-d9d5059de157", // Random generated url
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
      outgoing: {
        url: "41ce81e5-8c4f-41bf-8804-98c2f010cc93", // Random generated url
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "acfe0df4-8c9c-44af-8b3b-f80b960eb7c8", // Generated to uniquely identify the profile
      name: "SMS",
      type: "syncTask",
      icon: <Chat size={25} />,
      incoming: {
        url: "eaee46e4-5cd1-49ce-85c2-a950781dc050", // Random generated url
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
      outgoing: {
        url: "08c5be38-1b79-4e27-b9ca-5da709aef5fe",
        total: 0,
        success: 0,
        failure: 0,
        type: "syncTask",
      },
    },
  ];

  let maxIndex: number;
  if (profiles.length > 0) {
    const index: number = profiles.length / 8;
    const mod = profiles.length % 8;
    if (mod >= 1 && mod <= 7) {
      maxIndex = index;
    } else {
      maxIndex = index - 1;
    }
  }

  return {
    exchangeProfiles: profiles,
    maxPosition: maxIndex,
  };
}

export function mapDataElements(dataArray: Array<Record<string, string>>) {
  const arrayToReturn: Array<ProfileTransactions> = [];
  if (dataArray) {
    dataArray.map((profile: Record<string, any>) => {
      return arrayToReturn.push({
        name: profile.name,
        identifier: profile.identifier,
        status: profile.status,
        statusCode: profile.statusCode,
        comment: "Received",
        dateCreated: dayjs(profile.dateCreated).format("DD MMM YYYY"),
        actions: TableAction(profile?.patientUuid),
      });
    });
  }

  return arrayToReturn;
}
