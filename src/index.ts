import {
  getAsyncLifecycle,
  getSyncLifecycle,
  defineConfigSchema,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import { createLeftPanelLink } from "./left-panel-link.component";
import appMenu from "./components/exchange-menu-app/exchange-menu-app-item.component";
import totalPatientsTileComponent from "./client-registry/client-registry-tiles/client-registry-total-patients-tile.component";
import totalPatientsSyncedTileComponent from "./client-registry/client-registry-tiles/client-registry-total-patients-synced-tile.component";
import sendPatientToCRButtonComponent from "./client-registry/client-registry-data/client-registry-actions/send-patient-to-cr-menu-item.component";
import sendPatientToCRDialogComponent from "./client-registry/client-registry-data/client-registry-dialogs/send-patient-to-cr-dialog.component";
import clientRegistryDashboardComponent from "./client-registry/client-registry.component";
import facilityRegistryDashboardComponent from "./facility-registry/facility-registry.component";
import productRegistryDashboardComponent from "./product-registry/product-registry.component";
import { createDashboardGroup } from "@openmrs/esm-patient-common-lib";
import {
  clientRegistryDashboardMeta,
  facilityRegistryDashboardMeta,
  productRegistryDashboardMeta,
  registryDashboardMeta,
  smsStatisticsDashboardMeta,
  syncFhirProfileDashboardMeta,
  syncFhirProfileStatisticsDashboardMeta,
  syncTaskLogsDashboardMeta,
  syncTaskTypeListDashboardMeta,
  ugandaemrSyncDashbaordMeta,
} from "./dashboard.meta";
import SyncTaskTypesComponent from "./sync-task-types/sync-task-types.component";
import SyncTaskLogsComponent from "./sync-task-logs/sync-task-logs.component";
import SyncFhirProfile from "./fhir/sync-fhir-profile/sync-fhir-profile.component";
import SentSmsComponent from "./sent-sms/sent-sms.component";

const moduleName = "@ugandaemr/esm-ugandaemr-exchange-app";

const options = {
  featureName: "health-exchange",
  moduleName,
};

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export const hieHomeLink = getSyncLifecycle(
  createLeftPanelLink({
    name: "facility-metrics",
    title: "Facility Metrics",
  }),
  options
);

export const scheduleManagerLink = getSyncLifecycle(
  createLeftPanelLink({
    name: "schedule-manager",
    title: "Schedule Manager",
  }),
  options
);

export const VLSuppressionPrediction = getAsyncLifecycle(
  () =>
    import(
      "./components/workspace/ai-predictions/vl-suppression-prediction-button.component"
    ),
  {
    featureName: "vl suppression prediction workspace",
    moduleName,
  }
);

export const VLSuppressionPredictionWorkspace = getAsyncLifecycle(
  () =>
    import(
      "./components/workspace/ai-predictions/vl-suppression-prediction-workspace.component"
    ),
  {
    featureName: "vl suppression prediction workspace",
    moduleName,
  }
);

export const healthExchangeAppMenuItem = getSyncLifecycle(appMenu, options);

export const totalPatientsTile = getSyncLifecycle(
  totalPatientsTileComponent,
  options
);
export const totalPatientsSyncedTile = getSyncLifecycle(
  totalPatientsSyncedTileComponent,
  options
);

export const sendPatientToCRButton = getSyncLifecycle(
  sendPatientToCRButtonComponent,
  options
);

export const sendPatientToCRDialog = getSyncLifecycle(
  sendPatientToCRDialogComponent,
  options
);

export const ChatbotButton = getAsyncLifecycle(
  () => import("./components/workspace/chatbot/chatbot-button.component"),
  {
    featureName: "chatbot button",
    moduleName,
  }
);
export const ChatbotComponent = getAsyncLifecycle(
  () => import("./components/workspace/chatbot/chat-bot.component"),
  {
    featureName: "chat bot",
    moduleName,
  }
);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const root = getAsyncLifecycle(
  () => import("./root.component"),
  options
);

export const toolsModal = getAsyncLifecycle(
  () =>
    import("./facility-metrics/performance/model-components/tools.component"),
  options
);

export const hmisModal = getAsyncLifecycle(
  () =>
    import("./facility-metrics/performance/model-components/hmis.component"),
  options
);

export const pepfarModal = getAsyncLifecycle(
  () =>
    import("./facility-metrics/performance/model-components/pepfar.component"),
  options
);

export const registriesDashboard = getSyncLifecycle(
  createDashboardGroup(registryDashboardMeta),
  options
);

export const ugandaemrSyncDashboard = getSyncLifecycle(
  createDashboardGroup(ugandaemrSyncDashbaordMeta),
  options
);

export const clientRegistryDashboardLink = getSyncLifecycle(
  createLeftPanelLink({
    ...clientRegistryDashboardMeta,
    name: "client-registry-dashboard",
  }),
  options
);

export const facilityRegistryDashboardLink = getSyncLifecycle(
  createLeftPanelLink({
    ...facilityRegistryDashboardMeta,
    name: "facility-registry-dashboard",
  }),
  options
);

export const productRegistryDashboardLink = getSyncLifecycle(
  createLeftPanelLink({
    ...productRegistryDashboardMeta,
    name: "product-registry-dashboard",
  }),
  options
);

export const clientRegistry = getSyncLifecycle(
  clientRegistryDashboardComponent,
  options
);

export const facilityRegistry = getSyncLifecycle(
  facilityRegistryDashboardComponent,
  options
);
export const productRegistry = getSyncLifecycle(
  productRegistryDashboardComponent,
  options
);

export const syncTaskTypeListDashboardLink = getSyncLifecycle(
  createLeftPanelLink({
    ...syncTaskTypeListDashboardMeta,
    name: "sync-task-types",
  }),
  options
);

export const syncTaskTypeListDashboard = getSyncLifecycle(
  SyncTaskTypesComponent,
  options
);

export const syncTaskLogsDashboardLink = getSyncLifecycle(
  createLeftPanelLink({
    ...syncTaskLogsDashboardMeta,
    name: "sync-task-logs",
  }),
  options
);

export const syncTaskLogsDashboard = getSyncLifecycle(
  SyncTaskLogsComponent,
  options
);

export const syncFhirProfileDashboardLink = getSyncLifecycle(
  createLeftPanelLink({
    ...syncFhirProfileDashboardMeta,
    name: "fhir-exchange",
  }),
  options
);

export const syncFhirProfileDashboard = getSyncLifecycle(
  SyncFhirProfile,
  options
);

export const syncFhirProfileStatisticsDashboardLink = getSyncLifecycle(
  createLeftPanelLink({
    ...syncFhirProfileStatisticsDashboardMeta,
    name: "fhir-profile-statistics",
  }),
  options
);

export const smsStatisticsDashboardLink = getSyncLifecycle(
  createLeftPanelLink({
    ...smsStatisticsDashboardMeta,
    name: "sms-statistics",
  }),
  options
);

export const sentSmsDashboard = getSyncLifecycle(SentSmsComponent, options);
