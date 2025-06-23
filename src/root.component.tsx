import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setLeftNav, unsetLeftNav } from "@openmrs/esm-framework";
import LeftPanel from "./components/left-panel/left-panel.component";
import styles from "./root.scss";
import Fhir from "./fhir/sync-fhir-profile/sync-fhir-profile.component";
import FacilityMetrics from "./facility-metrics/facility-metrics.component";
import ClientRegistry from "./client-registry/client-registry.component";
import FacilityRegistry from "./facility-registry/facility-registry.component";
import ProductRegistry from "./product-registry/product-registry.component";
import ScheduleManager from "./scheduler/scheduler.component";
import SyncTaskTypes from "./sync-task-types/sync-task-types.component";
import SyncTaskLogsComponent from "./sync-task-logs/sync-task-logs.component";
import SentSmsComponent from "./sent-sms/sent-sms.component";
import SyncFhirProfileStatistics from "./fhir/sync-fhir-profile-statistics/sync-fhir-profile-statistics.component";

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
          <Route path="/facility-metrics" element={<FacilityMetrics />} />
          <Route path="/fhir-exchange" element={<Fhir />} />
          <Route path="/schedule-manager" element={<ScheduleManager />} />
          <Route path="/sync-task-types" element={<SyncTaskTypes />} />
          <Route path="/sync-task-logs" element={<SyncTaskLogsComponent />} />
          <Route path="/sms-statistics" element={<SentSmsComponent />} />
          <Route
            path="fhir-profile-statistics"
            element={<SyncFhirProfileStatistics />}
          />

          <Route
            path="/client-registry-dashboard"
            element={<ClientRegistry />}
          />
          <Route
            path="/facility-registry-dashboard"
            element={<FacilityRegistry />}
          />
          <Route
            path="/product-registry-dashboard"
            element={<ProductRegistry />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Root;
