import React from "react";
import { useTranslation } from "react-i18next";
import ClientRegistryTile from "./client-registry-tile/client-registry-tile.component";

const TotalPatientsTileComponent = () => {
  const { t } = useTranslation();

  return (
    <ClientRegistryTile
      label={t("total", "Total Patients")}
      value={0}
      headerLabel={t("total", "Total No. of Patients")}
    />
  );
};

export default TotalPatientsTileComponent;
