import React, { useState } from "react";
import { InlineLoading } from "@carbon/react";
import styles from "./vl-suppression-prediction.scss";
import { useVLSuppressionDetails } from "./vl-suppression-prediction.resource";
import { ErrorState } from "@openmrs/esm-framework";

const VLSuppressionPredictionWorkSpace: React.FC = () => {
  const [encounterDate, setEncounterDate] = useState("2023-04-20");
  const [artStartDate, setArtStartDate] = useState("2020-04-20");
  const [dateOfBirth, setDateOfBirth] = useState("1992-04-20");
  const [gender, setGender] = useState("Female");
  const [arvAdherence, setArvAdherence] = useState("Good");
  const [currentRegimen, setCurrentRegimen] = useState("TDF-3TC-DTG");
  const [indicationForVLTesting, setIndicationForVLTesting] =
    useState("168684");

  const { data, isErrorInSendingRequest, isLoadingPrediction } =
    useVLSuppressionDetails({
      encounter_date: encounterDate,
      art_start_date: artStartDate,
      date_birth: dateOfBirth,
      gender: gender,
      arv_adherence: arvAdherence,
      current_regimen: currentRegimen,
      Indication_for_VL_Testing: indicationForVLTesting,
    });

  if (isLoadingPrediction) {
    return (
      <InlineLoading
        status="active"
        iconDescription="Loading"
        description="Loading data..."
      />
    );
  }

  if (isErrorInSendingRequest) {
    return <ErrorState error={isErrorInSendingRequest} headerTitle={"Error"} />;
  }

  return (
    <div className={styles.divContainer}>
      <section className={styles.section}>
        <div className={styles.title}>VL Suppression</div>
        <div className={styles.divVL}>
          Prediction: <>{data}</>
        </div>
      </section>
      <section></section>
    </div>
  );
};

export default VLSuppressionPredictionWorkSpace;
