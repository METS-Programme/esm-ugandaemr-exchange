import React, { useState } from "react";
import { Button, ContentSwitcher, Switch } from "@carbon/react";
import { useTranslation } from "react-i18next";
import CaseBasedSettings from "./fhir-detail-content.component.tsx/fhir-detail-content-case-based-settings.component";
import ResourceFilters from "./fhir-detail-content.component.tsx/fhir-detial-content-resource-filters.component";
import ResourceDefinition from "./fhir-detail-content.component.tsx/fhir-detail-content-resource-definition.component";
import {
  AssemblyCluster,
  Edit,
  Filter,
  Save,
  Settings,
} from "@carbon/react/icons";
import styles from "../fhir/fhir-detail.scss";
const RowDetails = ({ selectedProfileData }) => {
  const { t } = useTranslation();
  const [tabType, setTabType] = useState("Resource Definition");

  const resourceSearchParameterObject = JSON.parse(
    selectedProfileData.resourceSearchParameter
  );

  const handleTabTypeChange = ({ name }) => {
    setTabType(name);
  };
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSubmit = () => {
    setIsEditMode(false);
  };

  const handleCancel = () => {
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
          isCaseBasedProfile={selectedProfileData.isCaseBasedProfile}
          generateBundle={selectedProfileData.generateBundle}
          resourceTypes={selectedProfileData.resourceTypes}
          profileEnabled={selectedProfileData.profileEnabled}
          syncDataEverSince={selectedProfileData.syncDataEverSince}
          caseBasedPrimaryResourceType={
            selectedProfileData.caseBasedPrimaryResourceType
          }
          caseBasedPrimaryResourceTypeId={
            selectedProfileData.caseBasedPrimaryResourceTypeId
          }
          dataToSyncStartDate={selectedProfileData.dataToSyncStartDate}
          isEditMode={isEditMode}
        />
      )}
      {tabType === "Resource Filters" && (
        <ResourceFilters
          patientIdentifierType={selectedProfileData.patientIdentifierType}
          observationFilterCodes={resourceSearchParameterObject.observationFilter.code.join(
            ","
          )}
          encounterTypeUUIDS={resourceSearchParameterObject.encounterFilter.type.join(
            ","
          )}
          isEditMode={isEditMode}
        />
      )}
      {tabType === "Sync Settings" && (
        <CaseBasedSettings
          url={selectedProfileData.url}
          syncLimit={selectedProfileData.syncLimit}
          urlToken={selectedProfileData.urlToken}
          urlUserName={selectedProfileData.urlUserName}
          urlPassword={selectedProfileData.urlPassword}
          searchable={selectedProfileData.searchable}
          searchURL={selectedProfileData.searchURL}
          isEditMode={isEditMode}
        />
      )}
      <div className={styles.editButtonsContainer}>
        {!isEditMode && (
          <Button
            kind="primary"
            size="md"
            className={styles.actionButton}
            onClick={handleEdit}
          >
            <Edit />
            <span>{t("edit", "Edit")}</span>
          </Button>
        )}
        {isEditMode && (
          <>
            <Button kind="secondary" onClick={handleCancel}>
              <span>{t("cancel", "Cancel")}</span>
            </Button>
            <Button
              kind="primary"
              size="md"
              className={styles.actionButton}
              onClick={handleSubmit}
            >
              <Save />
              <span>{t("save", "Save")}</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RowDetails;
