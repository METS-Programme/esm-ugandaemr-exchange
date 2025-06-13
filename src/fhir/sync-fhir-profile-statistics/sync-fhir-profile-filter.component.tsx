import React from "react";
import { useTranslation } from "react-i18next";
import { useGetFhirProfiles } from "../sync-fhir-profile/sync-fhir-profile.resource";
import { DropdownSkeleton } from "@carbon/react";
import { showSnackbar } from "@openmrs/esm-framework";
import { Dropdown } from "@carbon/react";

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
    <div>
      <Dropdown
        id="syncfhirprofile"
        initialSelectedItem={fhirProfiles[0]}
        items={fhirProfilesNames}
        itemToString={(item) => (item ? item : "")}
        onChange={({ selectedItem }) => onFilterChange(selectedItem)}
        label=""
        size="sm"
        titleText={t("selectFhirProfile", "Select Sync Fhir Profile")}
        type="inline"
      />
    </div>
  );
};

export default SyncFhirProfileFilter;
