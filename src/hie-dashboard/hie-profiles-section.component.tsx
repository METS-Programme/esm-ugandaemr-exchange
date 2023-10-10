import React, { useState, useEffect } from "react";
import { Grid, Column } from "@carbon/react";
import { showNotification } from "@openmrs/esm-framework";
import { DateFilterSection } from "./date-filter-section";
import ProfileCardsSection from "./profile-cards-section";
import ProfileTransactionsSection from "./profile-transactions";
import styles from "./styles/hie-components.scss";
import {
  fetchTransactionCount,
  findProfileKey,
  findTaskKey,
  useFetchSyncFhirProfiles,
  useFetchSyncTaskTypes,
} from "./hie-dashboard.resource";
import {
  HIEProfiles,
  syncFhirProfileUuids,
  syncTaskTypeUuids,
} from "./constants/hie-constants";
import { TransactionCount } from "./hie.types";

const HIEDashboard = () => {
  const [hieProfilesAndTasks, setHieProfilesAndTasks] = useState(HIEProfiles);
  // date ranges
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [filteredTaskTypes, setFilteredTaskTypes] = useState([]);
  // set selected tile
  const [selectedTile, setSelectedTile] = useState("");
  // // depending on selected tile, set datatable info
  const [tableInfo, setTableInfo] = useState({
    incoming: null,
    outgoing: null,
  });

  //fetch profiles and task types
  const { syncFhirProfiles } = useFetchSyncFhirProfiles();
  const { syncTaskTypes } = useFetchSyncTaskTypes();

  useEffect(() => {
    if (syncFhirProfiles) {
      const filtered = syncFhirProfiles.filter((profile) =>
        syncFhirProfileUuids.includes(profile.uuid)
      );
      setFilteredProfiles(filtered);
    }
    if (syncTaskTypes) {
      const filtered = syncTaskTypes.filter((taskType) =>
        syncTaskTypeUuids.includes(taskType.uuid)
      );
      setFilteredTaskTypes(filtered);
    }
  }, [syncFhirProfiles, syncTaskTypes]);

  // fetch counts of the the different profiles and task types
  useEffect(() => {
    if (filteredProfiles.length > 0) {
      filteredProfiles.forEach((profile) => {
        fetchTransactionCount(profile["uuid"], startDate, endDate, "syncFHIR")
          .then((res: TransactionCount) => {
            const { key, countType } = findProfileKey(profile["uuid"]);
            setHieProfilesAndTasks((previousState) => ({
              ...previousState,
              [key]: { ...previousState[key], [countType]: res.count },
            }));
          })
          .catch((error) => {
            showNotification({
              title: "Error updating profile information",
              kind: "error",
              critical: true,
              description: error?.message,
            });
          });
      });
    }
    if (filteredTaskTypes.length > 0) {
      filteredTaskTypes.map((task) => {
        fetchTransactionCount(task["uuid"], startDate, endDate, "syncTask")
          .then((res: TransactionCount) => {
            const { key, countType } = findTaskKey(task["uuid"]);
            setHieProfilesAndTasks((previousState) => ({
              ...previousState,
              [key]: { ...previousState[key], [countType]: res.count },
            }));
          })
          .catch((error) => {
            showNotification({
              title: "Error updating profile information",
              kind: "error",
              critical: true,
              description: error?.message,
            });
          });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate, filteredProfiles, startDate, filteredTaskTypes]);

  // TODO: fetch transactions data of the different profiles and task types
  useEffect(() => {
    const selectedProfile = Object.values(hieProfilesAndTasks).filter(
      (profile) => profile["name"] === selectedTile
    );
    if (selectedProfile.length > 0) {
      setTableInfo({
        ...tableInfo,
        incoming: selectedProfile["incoming"]
          ? selectedProfile["incoming"]
          : null,
        outgoing: selectedProfile["outgoing"]
          ? selectedProfile["outgoing"]
          : null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTile]);

  return (
    <>
      <Grid className={styles.gridContainer} fullWidth>
        <Column lg={16} md={8} sm={4} className={styles.gridChild}>
          <div className={styles.upperDiv}>
            <DateFilterSection
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              startDate={startDate}
              endDate={endDate}
            />
            {/* todo: if fhirProfileCountLoading || taskTypeCountLoading - display loader */}
            <ProfileCardsSection
              setSelectedTile={setSelectedTile}
              profiles={hieProfilesAndTasks}
              activeCard={selectedTile}
            />
          </div>
        </Column>
        <Column lg={16} md={8} sm={4} className={styles.gridChild}>
          <ProfileTransactionsSection
            transactions={tableInfo}
            activeProfile={selectedTile}
          />
        </Column>
      </Grid>
    </>
  );
};

export default HIEDashboard;
