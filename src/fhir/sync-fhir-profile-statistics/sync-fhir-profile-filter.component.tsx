import React from "react";
import { useTranslation } from "react-i18next";
import { useGetFhirProfiles } from "../sync-fhir-profile/sync-fhir-profile.resource";
import { Dropdown, DropdownSkeleton, Tile } from "@carbon/react";
import { showSnackbar } from "@openmrs/esm-framework";
import styles from "./sync-fhir-profile-statistics.scss";

const SyncFhirProfileFilter: React.FC<{
  onFilterChange: (selectedFhirProfile: string) => void;
}> = ({ onFilterChange }) => {
  const { t } = useTranslation();
  const { fhirProfiles, isError, isLoadingFhirProfiles } = useGetFhirProfiles();

  const fhirProfilesNames = fhirProfiles.map((item) => item.name);

  if (isLoadingFhirProfiles) {
    <DropdownSkeleton size="sm" />;
  }

  if (isError) {
    showSnackbar({
      title: t(
        "errorFetchingFhirProfiles",
        "Error fetching sync fhir profiles"
      ),
      subtitle: isError.message,
      kind: "error",
      isLowContrast: true,
    });
  }

  if (fhirProfiles.length === 0) {
    return null;
  }

  return (
    <div className={styles.filterContainer}>
      <Tile className={styles.tile}>
        <div className={styles.tileContent}>
          <Dropdown
            id="syncfhirprofile"
            initialSelectedItem={fhirProfilesNames[0]}
            items={fhirProfilesNames}
            itemToString={(item) => (item ? item : "")}
            onChange={({ selectedItem }) => onFilterChange(selectedItem)}
            label=""
            size="sm"
            titleText={t("selectFhirProfile", "Select Sync Fhir Profile")}
            type="inline"
          />
        </div>
      </Tile>
    </div>
  );
};

export default SyncFhirProfileFilter;
