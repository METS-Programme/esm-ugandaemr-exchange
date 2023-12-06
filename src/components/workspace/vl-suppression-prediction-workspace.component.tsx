import React, { useEffect, useState } from "react";
import { InlineLoading } from "@carbon/react";
import styles from "./vl-suppression-prediction.scss";
import {
  useGetARTStartDate,
  useVLSuppressionDetails,
} from "./vl-suppression-prediction.resource";
import { ErrorState } from "@openmrs/esm-framework";

const VLSuppressionPredictionWorkSpace: React.FC = () => {
  const [encounterDate, setEncounterDate] = useState("2023-04-20");
  const [artStartDate, setArtStartDate] = useState("2020-04-20");
  const [dateOfBirth, setDateOfBirth] = useState("1992-04-20");
  const [gender, setGender] = useState("Female");
  const [arvAdherence, setArvAdherence] = useState("90157");
  const [currentRegimen, setCurrentRegimen] = useState("TDF-3TC-DTG");
  const [indicationForVLTesting, setIndicationForVLTesting] =
    useState("168684");

  const [patientUuid, setPatientUuid] = useState(
    "93e4e7e1-c916-47d3-b00d-c7c0aa6d1ce6"
  );
  const [conceptUuid, setConceptUuid] = useState(
    "ab505422-26d9-41f1-a079-c3d222000440"
  );
  const { artStartDateData, isLoading, conceptuuid, patientuuid } =
    useGetARTStartDate({
      patientuuid: patientUuid,
      conceptuuid: conceptUuid,
    });

  const { data, isErrorInSendingRequest, isLoadingPrediction } =
    useVLSuppressionDetails({
      last_encounter_date: encounterDate,
      art_start_date: artStartDate,
      date_birth: dateOfBirth,
      gender: gender,
      last_arv_adherence: arvAdherence,
      current_regimen: currentRegimen,
      last_indication_for_VL_Testing: indicationForVLTesting,
    });

  if (isLoading && patientuuid && conceptuuid) {
    setPatientUuid(patientuuid);
    setConceptUuid(conceptuuid);
  }

  if (isLoadingPrediction) {
    console.info("ART START DATE", artStartDateData);
    console.info("Concept uuid", conceptuuid);
    console.info("Person uuid", patientuuid);
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
