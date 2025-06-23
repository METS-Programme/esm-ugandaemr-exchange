import React from "react";
import Header from "../components/header/header.component";
import Illustration from "./sync-task-logs-illustration.component";
import SyncTaskLogsList from "./sync-task-logs-list.component";
import { syncTaskLogsHeaders } from "../constants";
import { useGetSyncTaskLogs } from "../sync-task-types/sync-task-types.resource";
import styles from "./sync-task-logs.scss";
import { useTranslation } from "react-i18next";
import { DataTableSkeleton } from "@carbon/react";

const SyncTaskLogsComponent: React.FC = () => {
  const { t } = useTranslation();
  const { syncTaskLogs, isLoading } = useGetSyncTaskLogs();
  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={`Sync Task Logs`}
      />
      {isLoading ? (
        <DataTableSkeleton
          headers={syncTaskLogsHeaders}
          showHeader
          showToolbar
        />
      ) : (
        <div className={styles.logsContainer}>
          <SyncTaskLogsList data={syncTaskLogs} columns={syncTaskLogsHeaders} />
        </div>
      )}
    </>
  );
};

export default SyncTaskLogsComponent;
