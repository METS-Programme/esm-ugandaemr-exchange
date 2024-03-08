import React, { useState } from "react";
import { ContentSwitcher, Switch } from "@carbon/react";
import { useTranslation } from "react-i18next";
import CaseBasedSettings from "./fhir-detail-content.component.tsx/fhir-detail-content-case-based-settings.component";
import ResourceFilters from "./fhir-detail-content.component.tsx/fhir-detial-content-resource-filters.component";
import ResourceDefinition from "./fhir-detail-content.component.tsx/fhir-detail-content-resource-definition.component";
import { AssemblyCluster, Filter, Settings } from "@carbon/react/icons";
import styles from "../fhir/fhir-detail.scss";
import { Button } from "@carbon/react";

const RowDetails = ({ selectedProfileData }) => {
  const { t } = useTranslation();
  const [tabType, setTabType] = useState("Resource Definition");

  const handleTabTypeChange = ({ name }) => {
    setTabType(name);
  };
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSubmit = () => {
    // Submit logic for all tabs
    setIsEditMode(false);
  };

  const handleCancel = () => {
    // Cancel logic for all tabs
    setIsEditMode(false);
  };

  return (
    <div>
      <ContentSwitcher onChange={handleTabTypeChange}>
        <Switch name="Resource Definition">
          <div className={styles.switch}>
            <AssemblyCluster />
            <span>{t("resourceDefinition", "Resource Definition")}</span>
          </div>
        </Switch>
        <Switch name="Resource Filters">
          <div className={styles.switch}>
            <Filter />
            <span>{t("resourceFilters", "Resource Filters")}</span>
          </div>
        </Switch>
        <Switch name="Sync Settings">
          <div className={styles.switch}>
            <Settings />
            <span>{t("syncSettings", "Sync Settings")}</span>
          </div>
        </Switch>
      </ContentSwitcher>

      {tabType === "Resource Definition" && (
        <ResourceDefinition
          syncFhirName={selectedProfileData.name}
          resourcesInBundle={selectedProfileData.numberOfResourcesInBundle}
          durationSyncedResources={
            selectedProfileData.durationToKeepSyncedResources
          }
        />
      )}
      {tabType === "Resource Filters" && <ResourceFilters />}
      {tabType === "Sync Settings" && (
        <CaseBasedSettings
          url={selectedProfileData.url}
          syncLimit={selectedProfileData.syncLimit}
          urlToken={selectedProfileData.urlToken}
          urlUserName={selectedProfileData.urlUserName}
          urlPassword={selectedProfileData.urlPassword}
        />
      )}
      <div className={styles.editButtonsContainer}>
        {!isEditMode && (
          <Button kind="primary" onClick={handleEdit}>
            Edit
          </Button>
        )}
        {isEditMode && (
          <>
            <Button kind="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button kind="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RowDetails;
