import {
  getAsyncLifecycle,
  getSyncLifecycle,
  defineConfigSchema,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import { createDashboardLink } from "./create-dashboard-link.component";
import { createLeftPanelLink } from "./left-panel-link.component";

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

export const VLSuppressionPrediction = getAsyncLifecycle(
  () =>
    import("./components/workspace/vl-suppression-prediction-button.component"),
  {
    featureName: "vl suppression prediction workspace",
    moduleName,
  }
);

export const VLSuppressionPredictionWorkspace = getAsyncLifecycle(
  () =>
    import(
      "./components/workspace/vl-suppression-prediction-workspace.component"
    ),
  {
    featureName: "vl suppression prediction workspace",
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
