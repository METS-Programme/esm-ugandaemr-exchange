import React, { useState } from "react";
import { ContentSwitcher, Switch } from "@carbon/react";
import { useTranslation } from "react-i18next";
import CaseBasedSettings from "./fhir-detail-content.component.tsx/fhir-detail-content-case-based-settings.component";

const RowDetails = ({ fhirProfiles }) => {
  const { t } = useTranslation();
  const [tabType, setTabType] = useState();

  const handleTabTypeChange = ({ name }) => {
    setTabType(name);
  };

  return (
    <div>
      <ContentSwitcher onChange={handleTabTypeChange}>
        <Switch name="Resource Definition">
          <div>
            <span>{t("resourceDefinition", "Resource Definition")}</span>
          </div>
        </Switch>
        <Switch name="Resource Type">
          <div>
            <span>{t("resourceType", "Resource Type")}</span>
          </div>
        </Switch>
        <Switch name="Case Based Settings">
          <div>
            <span>{t("caseBasedSettings", "Case Based Settings")}</span>
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
      {tabType === "Sync Settings" && (
        <CaseBasedSettings fhirProfiles={fhirProfiles} />
      )}
    </div>
  );
};

export default RowDetails;
