import React from "react";
import Header from "../components/header/header.component";
import Illustration from "./client-registry-illustration.component";
import ClientRegistrySummaryTiles from "./client-registry-tiles/client-registry-summary-tiles.component";
import ClientRegistryData from "./client-registry-data/client-registry-data.component";
import { useTranslation } from "react-i18next";

const ClientRegistry: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={t("clientRegistry", `Client Registry`)}
      />
      <ClientRegistrySummaryTiles />
      <ClientRegistryData />
    </>
  );
};

export default ClientRegistry;
