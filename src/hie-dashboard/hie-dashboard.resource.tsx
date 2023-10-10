import { openmrsFetch } from "@openmrs/esm-framework";
import dayjs from "dayjs";
import useSWR from "swr";
import { SyncFHIRProfile, SyncTaskType } from "./hie.types";
import {
  ART_ACCESS_OUTGOING_SYNC_FHIR_PROFILE_UUID,
  CBS_OUTGOING_SYNC_FHIR_PROFILE_UUID,
  ALIS_OUTGOING_SYNC_FHIR_PROFILE_UUID,
  ECBS_OUTGOING_SYNC_FHIR_PROFILE_UUID,
  CLIENT_REGISTRY_OUTGOING_SYNC_FHIR_PROFILE_UUID,
  FACILITY_SHR_OUTGOING_SYNC_FHIR_PROFILE_UUID,
  VL_INCOMING_SYNC_TASK_TYPE_UUID,
  VL_OUTGOING_SYNC_TASK_TYPE_UUID,
  ART_ACCESS_INCOMING_SYNC_TASK_TYPE_UUID,
  PIRS_REPORTING_OUTGOING_SYNC_TASK_TYPE_UUID,
  EHMIS_REPORTING_OUTGOING_SYNC_TASK_TYPE_UUID,
  SMS_APPOINTMENT_REMINDERS_OUTGOING_SYNC_TASK_TYPE_UUID,
} from "./constants/hie-constants";

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
  uuid: number,
  startDate,
  endDate,
  type = "syncFHIR" || "syncTask"
) {
  const abortController = new AbortController();
  const syncTaskStatsURL = "/ws/rest/v1/synctaskstats?type";
  const syncFHIRProfileStatsURL = "/ws/rest/v1/syncfhirresourcestats?profile";
  const start = dayjs(startDate).format("YYYY-MM-DD");
  const end = dayjs(endDate).format("YYYY-MM-DD");

  if (type === "syncFHIR") {
    const response = await openmrsFetch(
      `${syncFHIRProfileStatsURL}=${uuid}&startDate=${start}&endDate=${end}`,
      {
        signal: abortController.signal,
      }
    );
    return response.json();
  }

  if (type === "syncTask") {
    const response = await openmrsFetch(
      `${syncTaskStatsURL}=${uuid}&startDate=${start}&endDate=${end}`,
      {
        signal: abortController.signal,
      }
    );
    return response.json();
  }
}

export function findProfileKey(uuid) {
  let resp = { key: null, countType: null };

  switch (uuid) {
    case ART_ACCESS_OUTGOING_SYNC_FHIR_PROFILE_UUID:
      resp = {
        key: "artAccess",
        countType: "outgoingCount",
      };
      break;
    case CBS_OUTGOING_SYNC_FHIR_PROFILE_UUID:
      resp = {
        key: "cbs",
        countType: "outgoingCount",
      };
      break;
    case ALIS_OUTGOING_SYNC_FHIR_PROFILE_UUID:
      resp = {
        key: "alis",
        countType: "outgoingCount",
      };
      break;
    case ECBS_OUTGOING_SYNC_FHIR_PROFILE_UUID:
      resp = {
        key: "ecbs",
        countType: "outgoingCount",
      };
      break;
    case CLIENT_REGISTRY_OUTGOING_SYNC_FHIR_PROFILE_UUID:
      resp = {
        key: "clientRegistry",
        countType: "outgoingCount",
      };
      break;
    case FACILITY_SHR_OUTGOING_SYNC_FHIR_PROFILE_UUID:
      resp = {
        key: "facilitySHR",
        countType: "outgoingCount",
      };
      break;
  }
  return resp;
}

export function findTaskKey(uuid) {
  let resp = { key: null, countType: null };

  switch (uuid) {
    case VL_INCOMING_SYNC_TASK_TYPE_UUID:
      resp = {
        key: "viralLoad",
        countType: "incomingCount",
      };
      break;
    case VL_OUTGOING_SYNC_TASK_TYPE_UUID:
      resp = {
        key: "viralLoad",
        countType: "outgoingCount",
      };
      break;
    case ART_ACCESS_INCOMING_SYNC_TASK_TYPE_UUID:
      resp = {
        key: "artAccess",
        countType: "incomingCount",
      };
      break;
    case PIRS_REPORTING_OUTGOING_SYNC_TASK_TYPE_UUID:
      resp = {
        key: "pirs",
        countType: "outgoingCount",
      };
      break;
    case EHMIS_REPORTING_OUTGOING_SYNC_TASK_TYPE_UUID:
      resp = {
        key: "ehmis",
        countType: "outgoingCount",
      };
      break;
    case SMS_APPOINTMENT_REMINDERS_OUTGOING_SYNC_TASK_TYPE_UUID:
      resp = {
        key: "smsReminders",
        countType: "outgoingCount",
      };
      break;
  }
  return resp;
}
