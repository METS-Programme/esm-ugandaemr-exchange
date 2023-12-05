import { Button } from "@carbon/react";
import { Bot } from "@carbon/react/icons";
import { useLayoutType } from "@openmrs/esm-framework";
import { launchPatientWorkspace } from "@openmrs/esm-patient-common-lib";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import styles from "./vl-suppression-prediction.scss";

const VLSuppressionPredictionButton: React.FC = () => {
  const layout = useLayoutType();
  const { t } = useTranslation();

  const handleClick = useCallback(
    () =>
      launchPatientWorkspace("ai-predictions-workspace", {
        workspaceTitle: t("aiPrediction", "AI Predictions"),
      }),
    []
  );

  if (layout === "tablet") {
    return (
      <Button
        kind="ghost"
        className={`${styles.container}`}
        role="button"
        tabIndex={0}
        iconDescription={t("aiPrediction", "AI Predictions")}
        onClick={handleClick}
      />
    );
  }

  return (
    <Button
      className={styles.container}
      kind="ghost"
      size="sm"
      renderIcon={(props) => (
        <div className={styles.elementContainer}>
          <Bot size={24} {...props} />
        </div>
      )}
      hasIconOnly
      iconDescription={t("aiPrediction", "AI Predictions")}
      enterDelayMs={1000}
      tooltipAlignment="center"
      tooltipPosition="left"
      onClick={handleClick}
    />
  );
};

export default VLSuppressionPredictionButton;
