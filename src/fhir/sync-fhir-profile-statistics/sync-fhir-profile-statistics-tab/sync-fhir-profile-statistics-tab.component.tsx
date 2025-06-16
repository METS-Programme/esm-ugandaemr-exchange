import React, { useState } from "react";
import { ContentSwitcher, DataTableSkeleton, Switch } from "@carbon/react";
import { useTranslation } from "react-i18next";
import {
  Catalog,
  Collaborate,
  SoftwareResourceCluster,
} from "@carbon/react/icons";
import styles from "./sync-fhir-profile-statistics-tab.scss";
import {
  fhirProfileCaseHeaders,
  fhirProfileLogHeaders,
  fhirProfileResourcesHeaders,
} from "../../../constants";
import {
  useGetSyncFhirCase,
  useGetFhirProfiles,
  useGetSyncFhirProfileLog,
  useGetSyncFhirResource,
} from "../../sync-fhir-profile/sync-fhir-profile.resource";
import SyncFhirProfileDatalist from "./sync-fhir-profile-data-list.component";

const SyncFhirProfileStatTab = ({ selectedFhirProfile }) => {
  const { t } = useTranslation();
  const [tabType, setTabType] = useState("patientExchangeProfile");

  const { fhirProfiles } = useGetFhirProfiles();

  const selectedProfileObj = fhirProfiles.find(
    (profile) => profile.name === selectedFhirProfile
  );
  const selectedProfileUuid = selectedProfileObj?.uuid;

  const { fhirProfileCases, isLoading } =
    useGetSyncFhirCase(selectedProfileUuid);

  const { fhirProfileLogs } = useGetSyncFhirProfileLog(selectedProfileUuid);

  const { fhirProfileResources } = useGetSyncFhirResource(selectedProfileUuid);

  const handleTabTypeChange = ({ name }) => {
    setTabType(name);
  };

  const formattedExchangeProfileData =
    fhirProfileCases?.map((item, index) => ({
      id: index.toString(),
      patient: item.patient?.display ?? "",
      profileIdentifier: item?.caseIdentifier ?? "",
      dateCreated: item?.dateCreated ?? "",
      lastUpdateDate: item?.lastUpdateDate ?? "",
    })) ?? [];

  return (
    <div>
      <ContentSwitcher onChange={handleTabTypeChange}>
        <Switch name="patientExchangeProfile">
          <div className={styles.switch}>
            <Collaborate />
            <span>
              {t("patientExchangeProfile", "Patient in the Exchange Profile")}
            </span>
          </div>
        </Switch>
        <Switch name="resources">
          <div className={styles.switch}>
            <SoftwareResourceCluster />
            <span>{t("resources", "Resources")}</span>
          </div>
        </Switch>
        <Switch name="profileLogs">
          <div className={styles.switch}>
            <Catalog />
            <span>{t("profileLogs", "Profile Logs")}</span>
          </div>
        </Switch>
      </ContentSwitcher>

      {tabType === "patientExchangeProfile" &&
        (isLoading ? (
          <DataTableSkeleton
            headers={fhirProfileCaseHeaders}
            showHeader
            showToolbar
          />
        ) : (
          <SyncFhirProfileDatalist
            selectedProfile={selectedProfileUuid}
            columns={fhirProfileCaseHeaders}
            data={formattedExchangeProfileData}
          />
        ))}

      {tabType === "profileLogs" &&
        (isLoading ? (
          <DataTableSkeleton
            headers={fhirProfileCaseHeaders}
            showHeader
            showToolbar
          />
        ) : (
          <SyncFhirProfileDatalist
            selectedProfile={selectedProfileUuid}
            columns={fhirProfileLogHeaders}
            data={fhirProfileLogs}
          />
        ))}

      {tabType === "resources" &&
        (isLoading ? (
          <DataTableSkeleton
            headers={fhirProfileCaseHeaders}
            showHeader
            showToolbar
          />
        ) : (
          <SyncFhirProfileDatalist
            selectedProfile={selectedProfileUuid}
            columns={fhirProfileResourcesHeaders}
            data={fhirProfileResources}
          />
        ))}
    </div>
  );
};

export default SyncFhirProfileStatTab;
