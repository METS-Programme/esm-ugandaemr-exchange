import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownSkeleton } from "@carbon/react";
import styles from "./sync-task-type-filter.scss";
import { useGetSyncTaskTypes } from "../../sync-task-types/sync-task-types.resource";
import { showSnackbar } from "@openmrs/esm-framework";

const SyncTaskTypesFilter: React.FC<{
  onFilterChange: (selectedSourceType: string) => void;
}> = ({ onFilterChange }) => {
  const { t } = useTranslation();
  const { syncTaskTypes, isLoading, isError } = useGetSyncTaskTypes();

  const syncTaskTypeNames = syncTaskTypes.map((item) => item.name);

  if (isLoading) {
    return <DropdownSkeleton size="sm" />;
  }

  if (isError) {
    showSnackbar({
      title: t("errorFetchingSyncTaskType", "Error fetching sync task type"),
      subtitle: isError.message,
      kind: "error",
      isLowContrast: true,
    });
  }

  if (syncTaskTypeNames.length === 0) {
    return null;
  }

  return (
    <div className={styles.filterContainer}>
      <Dropdown
        id="stockSourcesFilter"
        initialSelectedItem={syncTaskTypeNames[0]}
        items={syncTaskTypeNames}
        itemToString={(item) => (item ? item : "")}
        label=""
        onChange={({ selectedItem }) => onFilterChange(selectedItem)}
        size="sm"
        titleText={t("selectSourceType", "Select Sync Task Type")}
        type="inline"
      />
    </div>
  );
};

export default SyncTaskTypesFilter;
