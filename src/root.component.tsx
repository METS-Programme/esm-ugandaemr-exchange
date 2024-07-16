import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setLeftNav, unsetLeftNav } from "@openmrs/esm-framework";
import LeftPanel from "./components/left-panel/left-panel.component";
import styles from "./root.scss";
import Fhir from "./fhir/fhir.component";
import FacilityMetrics from "./facility-metrics/facility-metrics.component";
import SyncTaskTypes from "./fhir/sync-task-types/sync-task-types.component";

const Root: React.FC = () => {
  const spaBasePath = window.spaBase;

  useEffect(() => {
    setLeftNav({
      name: "health-exchange-left-panel-slot",
      basePath: spaBasePath,
    });
    return () => unsetLeftNav("health-exchange-left-panel-slot");
  }, [spaBasePath]);

  return (
    <BrowserRouter basename={`${window.getOpenmrsSpaBase()}health-exchange`}>
      <LeftPanel />
      <main className={styles.container}>
        <Routes>
          <Route path="/" element={<FacilityMetrics />} />
          <Route path="/fhir-exchange" element={<Fhir />} />
          <Route path="/sync-task-types" element={<SyncTaskTypes />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Root;
