import React from "react";
import { useTranslation } from "react-i18next";
import ClientRegistryTile from "./client-registry-tile/client-registry-tile.component";

const TotalPatientsSyncedTileComponent = () => {
  const { t } = useTranslation();

  return (
    <ClientRegistryTile
      label={t("total", "Total Patients Synced")}
      value={0}
      headerLabel={t("total", "Total No. of Patients Synced")}
    />
  );
};

export default TotalPatientsSyncedTileComponent;
