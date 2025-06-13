import React, { useState } from "react";
import Header from "../../components/header/header.component";
import Illustration from "../sync-fhir-profile/sync-fhir-profile-illustration.component";
import { useTranslation } from "react-i18next";
import SyncFhirProfileFilter from "./sync-fhir-profile-filter.component";

const SyncFhirProfileStatistics = () => {
  const { t } = useTranslation();

  const [selectedFhirProfile, setSelectedFhirProfile] = useState("");

  const handleFhirProfile = (selectedFhirProfile: string) => {
    setSelectedFhirProfile(selectedFhirProfile);
  };

  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={t("syncFhirProfileStatistics", "Sync Fhir Profile Statistics")}
      />

      <div>
        <SyncFhirProfileFilter onFilterChange={handleFhirProfile} />
      </div>
    </>
  );
};

export default SyncFhirProfileStatistics;
