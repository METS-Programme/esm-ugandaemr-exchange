import React, { useState } from "react";
import { Button, InlineLoading } from "@carbon/react";
import { Intersect } from "@carbon/react/icons";
import styles from "./vl-suppression-prediction.scss";
import {
  useGetARTStartDate,
  useVLSuppressionDetails,
} from "./vl-suppression-prediction.resource";
import { ErrorState } from "@openmrs/esm-framework";
import logo from "../../assets/images/artificial-intelligence-logo.png";

const VLSuppressionPredictionWorkSpace: React.FC = () => {
  const [patientUuid, setPatientUuid] = useState(
    "93e4e7e1-c916-47d3-b00d-c7c0aa6d1ce6"
  );
  const [conceptUuid, setConceptUuid] = useState(
    "ab505422-26d9-41f1-a079-c3d222000440"
  );
  const [encounterDate, setEncounterDate] = useState<string | null>(
    "2023-04-20"
  );

  const [artStartDate, setArtStartDate] = useState("2020-04-20");
  const handleArtStartDateDataReceived = (newArtStartDate: string) => {
    setArtStartDate(newArtStartDate);
  };

  const handleConceptUuidReceived = (newConceptUuid: string) => {
    setConceptUuid(newConceptUuid);
  };

  const handlePatientuuidReceived = (newPatientuuid: string) => {
    setPatientUuid(newPatientuuid);
  };

  const { conceptuuid, patientuuid } = useGetARTStartDate(
    {
      patientuuid: patientUuid,
      conceptuuid: conceptUuid,
    },
    handleArtStartDateDataReceived,
    handleConceptUuidReceived,
    handlePatientuuidReceived
  );

  const [dateOfBirth, setDateOfBirth] = useState("1992-04-20");
  const [gender, setGender] = useState("Female");
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
    return <ErrorState error={isErrorInSendingRequest} headerTitle={"Error"} />;
  }

  const handleButtonClick = () => {
    console.info("PatientUuid", patientUuid);
    console.info("Patientuuid", patientuuid);
    console.info("Concept uuid", conceptuuid);
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
          Click the Run button for an AI based diagnostic assessment for
          (Patient Name)
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
