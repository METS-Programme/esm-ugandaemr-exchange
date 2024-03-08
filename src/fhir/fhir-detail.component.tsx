import React, { useState } from "react";
import { ContentSwitcher, Switch } from "@carbon/react";
import { useTranslation } from "react-i18next";
import CaseBasedSettings from "./fhir-detail-content.component.tsx/fhir-detail-content-case-based-settings.component";
import ResourceFilters from "./fhir-detail-content.component.tsx/fhir-detial-content-resource-filters.component";
import ResourceDefinition from "./fhir-detail-content.component.tsx/fhir-detail-content-resource-definition.component";

const RowDetails = ({ selectedProfileData }) => {
  const { t } = useTranslation();
  const [tabType, setTabType] = useState();

  const handleTabTypeChange = ({ name }) => {
    setTabType(name);
  };

  // console.info(selectedProfileData);

  return (
    <div>
      <ContentSwitcher onChange={handleTabTypeChange}>
        <Switch name="Resource Definition">
          <div>
            <span>{t("resourceDefinition", "Resource Definition")}</span>
          </div>
        </Switch>
        <Switch name="Resource Filters">
          <div>
            <span>{t("resourceFilters", "Resource Filters")}</span>
          </div>
        </Switch>
        <Switch name="Sync Settings">
          <div>
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
    </div>
  );
};

export default RowDetails;
