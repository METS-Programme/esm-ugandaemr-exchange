import React, { useState } from "react";
import { ContentSwitcher, DataTableSkeleton, Switch } from "@carbon/react";
import { useTranslation } from "react-i18next";
import {
  Catalog,
  Collaborate,
  SoftwareResourceCluster,
} from "@carbon/react/icons";
import styles from "./sync-fhir-profile-statistics-tab.scss";
import SyncFhirProfileStatExchangeProfile from "./sync-fhir-profile-stat-exchange.component";
import { fhirProfileCaseHeaders } from "../../../constants";
import {
  useGetSyncFhirCase,
  useGetFhirProfiles,
} from "../../sync-fhir-profile/sync-fhir-profile.resource";

const SyncFhirProfileStatTab = ({ selectedFhirProfile }) => {
  const { t } = useTranslation();
  const [tabType, setTabType] = useState("patientExchangeProfile");

  const { fhirProfiles } = useGetFhirProfiles();

  // Find UUID from selected name
  const selectedProfileObj = fhirProfiles.find(
    (profile) => profile.name === selectedFhirProfile
  );
  const selectedProfileUuid = selectedProfileObj?.uuid;

  const { fhirProfileCases, isLoading } =
    useGetSyncFhirCase(selectedProfileUuid);

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
          <SyncFhirProfileStatExchangeProfile
            selectedProfile={selectedProfileUuid}
            columns={fhirProfileCaseHeaders}
            data={formattedExchangeProfileData}
          />
        ))}
    </div>
  );
};

export default SyncFhirProfileStatTab;
