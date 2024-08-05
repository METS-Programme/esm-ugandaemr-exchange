import React from "react";
import Header from "../components/header/header.component";
import Illustration from "./facility-registry-illustration.component";
import { useTranslation } from "react-i18next";

const FacilityRegistry: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={t("facilityRegistry", `Facility Registry`)}
      />
    </>
  );
};

export default FacilityRegistry;
