import React from "react";
import Header from "../../components/header/header.component";
import Illustration from "../fhir-illustration.component";
import { Button } from "@carbon/react";
import { Add } from "@carbon/react/icons";
import styles from "./sync-task-types.scss";
import { useGetSyncTaskTypes } from "./sync-task-types.resource";
import { syncTaskTypeTableHeaders } from "../../constants";
import SyncTaskTypeList from "./sync-task-types-list.component";
import { EmptyStateComponent } from "../../components/empty-state/empty-state.component";

export const SyncTaskTypes = () => {
  const { syncTaskTypes } = useGetSyncTaskTypes();
  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={`Sync Task Types`}
      />

      <div className={styles.createIcon}>
        <Button size="md" kind="primary">
          <Add /> <span>Create task</span>
        </Button>
      </div>

      {syncTaskTypes.length > 0 ? (
        <div className={styles.taskTypeContainer}>
          <SyncTaskTypeList
            data={syncTaskTypes}
            columns={syncTaskTypeTableHeaders}
          />
        </div>
      ) : (
        <EmptyStateComponent
          title={`Use the create button to add new sync task types`}
        />
      )}
    </>
  );
};

export default SyncTaskTypes;
