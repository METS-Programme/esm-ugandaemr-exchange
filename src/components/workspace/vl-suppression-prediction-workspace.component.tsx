import React, { useMemo, useState } from "react";
import { Button, InlineLoading, Loading } from "@carbon/react";
import { Intersect } from "@carbon/react/icons";
import styles from "./vl-suppression-prediction.scss";
import {
  extractDate,
  useGetARTStartDate,
  useGetLastEncounterDate,
  useVLSuppressionDetails,
} from "./vl-suppression-prediction.resource";
import logo from "../../assets/images/artificial-intelligence-logo.png";
import { PatientChartProps } from "../../types";
import { usePatient } from "@openmrs/esm-framework";

const VLSuppressionPredictionWorkSpace: React.FC<PatientChartProps> = ({
  patientUuid,
}) => {
  const { patient } = usePatient(patientUuid);
  const [conceptUuid, setConceptUuid] = useState(
    "ab505422-26d9-41f1-a079-c3d222000440"
  );

  const [encounterDate, setEncounterDate] = useState<string | null>(
    "2023-04-20"
  );
  const handleLastEncounterDateReceived = (newLastEncounterDate: string) => {
    setEncounterDate(newLastEncounterDate);
  };

  const [artStartDate, setArtStartDate] = useState("");
  const handleArtStartDateDataReceived = (newArtStartDate: string) => {
    setArtStartDate(newArtStartDate);
  };

  useGetARTStartDate(
    {
      patientuuid: patientUuid,
      conceptuuid: conceptUuid,
    },
    handleArtStartDateDataReceived
  );

  useGetLastEncounterDate(
    {
      patientuuid: patientUuid,
      conceptuuid: conceptUuid,
    },
    handleLastEncounterDateReceived
  );

  const gender = useMemo(() => {
    return patient ? patient.gender : "Female";
  }, [patient]);

  const dateOfBirth = useMemo(() => {
    return patient ? extractDate(patient.birthDate) : "";
  }, [patient]);

  const patientDisplay = useMemo(() => {
    return patient
      ? `${patient.name[0].given.join(" ")} ${patient.name[0].family}`
      : "Patient";
  }, [patient]);

  const [arvAdherence, setArvAdherence] = useState("90157");
  const [currentRegimen, setCurrentRegimen] = useState("TDF-3TC-DTG");
  const [indicationForVLTesting, setIndicationForVLTesting] =
    useState("168684");

  const [showPredictions, setshowPredictions] = useState(false);

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

  if (isErrorInSendingRequest) {
    return (
      <InlineLoading
        status="active"
        iconDescription="Loading"
        description="Getting Patient Details..."
      />
    );
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

  const handleButtonClick = () => {
    console.info("Last Encounter Date", encounterDate);
    setshowPredictions(true);
  };

  return (
    <>
      <section className={styles.sectionHeader}>
        <div className={styles.sectionHeaderContent}>
          <img src={logo} alt="logo" height={60} />
          <div>Welcome to Dr. Yonna</div>
          <p>Your AI Partner</p>
        </div>
        <span className={styles.divSpan}>
          Click the Run button for an AI based diagnostic assessment for{" "}
          {patientDisplay}
        </span>
      </section>
      <div className={styles.actionButton}>
        <Button kind="primary" size="md" onClick={handleButtonClick}>
          <div className={styles.icon}>
            <Intersect />
          </div>
          <span className={styles.buttonSpan}>Run</span>
        </Button>
      </div>
      {!isLoadingPrediction ? (
        <>
          {showPredictions && (
            <section className={styles.section}>
              <div className={styles.title}>Viral Load Suppression</div>
              <div className={styles.divVL}>
                Prediction: <>{data}</>
              </div>
            </section>
          )}
        </>
      ) : (
        <InlineLoading
          status="active"
          iconDescription="Loading"
          description="Loading data..."
        />
      )}
      <section></section>
    </>
  );
};

export default VLSuppressionPredictionWorkSpace;
