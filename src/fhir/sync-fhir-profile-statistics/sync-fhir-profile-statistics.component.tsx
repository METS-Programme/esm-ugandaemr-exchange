import React, { useState } from "react";
import Header from "../../components/header/header.component";
import Illustration from "../sync-fhir-profile/sync-fhir-profile-illustration.component";
import { useTranslation } from "react-i18next";
import SyncFhirProfileFilter from "./sync-fhir-profile-filter.component";
import SyncFhirProfileStatTab from "./sync-fhir-profile-statistics-tab/sync-fhir-profile-statistics-tab.component";

const SyncFhirProfileStatistics = () => {
  const { t } = useTranslation();

  const [selectedFhirProfile, setSelectedFhirProfile] = useState("");

  const handleFhirProfile = (profile: string) => {
    setSelectedFhirProfile(profile);
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

      <div>
        <SyncFhirProfileStatTab selectedFhirProfile={selectedFhirProfile} />
      </div>
    </>
  );
};

export default SyncFhirProfileStatistics;
