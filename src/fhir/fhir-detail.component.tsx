import React, { useState } from "react";
import { ContentSwitcher, Switch } from "@carbon/react";
import { useTranslation } from "react-i18next";
import CaseBasedSettings from "./fhir-detail-content.component.tsx/fhir-detail-content-case-based-settings.component";

const RowDetails = ({ selectedProfileData }) => {
  const { t } = useTranslation();
  const [tabType, setTabType] = useState();

  const handleTabTypeChange = ({ name }) => {
    setTabType(name);
  };
  const findCell = (key) => {
    const cell = selectedProfileData.cells.find((cell) =>
      cell.id.endsWith(`:${key}`)
    );
    return cell ? cell.value : "";
  };

  const [url, setUrl] = useState(findCell("url"));
  const [syncLimit, setSyncLimit] = useState(findCell("syncLimit"));
  const [urlUserName, setUrlUserName] = useState(findCell("urlUserName"));
  const [urlPassword, setUrlPassword] = useState(findCell("urlPassword"));
  const [authToken, setAuthToken] = useState(findCell("urlToken"));

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
      {tabType === "Sync Settings" && selectedProfileData && (
        <CaseBasedSettings
          url={url}
          syncLimit={syncLimit}
          urlToken={authToken}
          urlUserName={urlUserName}
          urlPassword={urlPassword}
        />
      )}
    </div>
  );
};

export default RowDetails;
