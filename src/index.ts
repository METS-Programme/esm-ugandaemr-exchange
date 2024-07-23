import {
  getAsyncLifecycle,
  getSyncLifecycle,
  defineConfigSchema,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import { createDashboardLink } from "./create-dashboard-link.component";
import { createLeftPanelLink } from "./left-panel-link.component";
import appMenu from "./components/exchange-menu-app/exchange-menu-app-item.component";

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
    name: "",
    title: "Facility Metrics",
  }),
  options
);

export const fhirProfileLink = getSyncLifecycle(
  createLeftPanelLink({
    name: "fhir-exchange",
    title: "FHIR Profiles",
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
