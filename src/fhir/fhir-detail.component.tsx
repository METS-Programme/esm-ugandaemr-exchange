import React from "react";
import { ContentSwitcher, Switch } from "@carbon/react";
import { useTranslation } from "react-i18next";

const RowDetails = () => {
  const { t } = useTranslation();
  return (
    <div>
      <ContentSwitcher>
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
    </div>
  );
};

export default RowDetails;
