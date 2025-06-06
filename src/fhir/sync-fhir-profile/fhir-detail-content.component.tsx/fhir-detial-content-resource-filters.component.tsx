import React, { useCallback, useEffect, useState } from "react";
import { Dropdown, Form, FormGroup, Stack, TextInput } from "@carbon/react";
import { useTranslation } from "react-i18next";
import {
  saveSyncFhirProfile,
  useGetPatientIdentifierType,
} from "../sync-fhir-profile.resource";
import styles from "../sync-fhir-profile-detail.scss";
import { showSnackbar } from "@openmrs/esm-framework";

const ResourceFilters = ({
  isEditMode,
  patientIdentifierType,
  observationFilterCodes,
  encounterTypeUUIDS,
  episodeOfCareUUIDS,
  medicationRequestCodes,
  medicationDispenseCodes,
  conditionCodes,
  diagnosticReportCodes,
  serviceRequestCodes,
}) => {
  const { t } = useTranslation();

  const { patientIdentifierTypes } = useGetPatientIdentifierType();

  const dropdownPatientIdentifierItems = patientIdentifierTypes.map((type) => ({
    id: type.uuid,
    label: type.display,
  }));

  const [observationConceptIds, setObservationConceptIds] = useState("");
  const [encounterTypeUuids, setEncounterTypeUuids] = useState("");
  const [episodeOfCareUuids, setEpisodeOfCareUuids] = useState("");
  const [medicationRequestIds, setMedicationRequestIds] = useState("");
  const [medicationDispenseIds, setMedicationDispenseIds] = useState("");
  const [conditionConceptIds, setConditionConceptIds] = useState("");
  const [diagnosticReportIds, setDiagnosticReportIds] = useState("");
  const [serviceRequestIds, setServiceRequestIds] = useState("");

  const [selectedItem, setSelectedItem] = useState(
    patientIdentifierType
      ? {
          id: patientIdentifierType.uuid,
          label: patientIdentifierType.display,
        }
      : null
  );

  const handleSelectionChange = (selectedItem) => {
    setSelectedItem(selectedItem);
  };

  useEffect(() => {
    if (patientIdentifierType) {
      setSelectedItem({
        id: patientIdentifierType.uuid,
        label: patientIdentifierType.display,
      });
    }
  }, [patientIdentifierType]);

  useEffect(() => {
    if (observationFilterCodes) {
      setObservationConceptIds(observationFilterCodes);
    }
  }, [observationFilterCodes]);

  useEffect(() => {
    if (encounterTypeUUIDS) {
      setEncounterTypeUuids(encounterTypeUUIDS);
    }
  }, [encounterTypeUUIDS]);

  useEffect(() => {
    if (episodeOfCareUUIDS) {
      setEpisodeOfCareUuids(episodeOfCareUUIDS);
    }
  }, [episodeOfCareUUIDS]);

  useEffect(() => {
    if (medicationRequestCodes) {
      setMedicationRequestIds(medicationRequestCodes);
    }
  }, [medicationRequestCodes]);

  useEffect(() => {
    if (medicationDispenseCodes) {
      setMedicationDispenseIds(medicationDispenseCodes);
    }
  }, [medicationDispenseCodes]);

  useEffect(() => {
    if (conditionCodes) {
      setConditionConceptIds(conditionCodes);
    }
  }, [conditionCodes]);

  useEffect(() => {
    if (diagnosticReportCodes) {
      setDiagnosticReportIds(diagnosticReportCodes);
    }
  }, [diagnosticReportCodes]);

  useEffect(() => {
    if (serviceRequestCodes) {
      setServiceRequestIds(serviceRequestCodes);
    }
  }, [serviceRequestCodes]);

  const buildResourceSearchParameter = () => {
    return {
      observationFilter: {
        code: observationConceptIds ? [observationConceptIds] : [],
        encounterReference: [],
        patientReference: [],
        valueQuantityParam: [],
        hasMemberReference: [],
        valueStringParam: [],
        id: [],
        valueConcept: [],
        valueDateParam: { lowerBound: "", myUpperBound: "" },
        date: { lowerBound: "", myUpperBound: "" },
        category: [],
        lastUpdated: { lowerBound: "", myUpperBound: "" },
      },
      encounterFilter: {
        type: encounterTypeUuids ? encounterTypeUuids.split(",") : [],
        date: { lowerBound: "", myUpperBound: "" },
        lastUpdated: { lowerBound: "", myUpperBound: "" },
        subject: [],
        location: [],
        id: [],
        participant: [],
      },
      episodeofcareFilter: {
        type: episodeOfCareUuids ? episodeOfCareUuids.split(",") : [],
        lastUpdated: { lowerBound: "", myUpperBound: "" },
      },
      medicationrequestFilter: {
        code: medicationRequestIds ? medicationRequestIds.split(",") : [],
        encounterReference: [],
        patientReference: [],
        valueQuantityParam: [],
        hasMemberReference: [],
        valueStringParam: [],
        id: [],
        valueConcept: [],
        valueDateParam: { lowerBound: "", myUpperBound: "" },
        date: { lowerBound: "", myUpperBound: "" },
        category: [],
        lastUpdated: { lowerBound: "", myUpperBound: "" },
      },
      medicationdispenseFilter: {
        code: medicationDispenseIds ? medicationDispenseIds.split(",") : [],
        encounterReference: [],
        patientReference: [],
        valueQuantityParam: [],
        hasMemberReference: [],
        valueStringParam: [],
        id: [],
        valueConcept: [],
        valueDateParam: { lowerBound: "", myUpperBound: "" },
        date: { lowerBound: "", myUpperBound: "" },
        category: [],
        lastUpdated: { lowerBound: "", myUpperBound: "" },
      },
      conditionFilter: {
        code: conditionConceptIds ? conditionConceptIds.split(",") : [],
        encounterReference: [],
        patientReference: [],
        valueQuantityParam: [],
        hasMemberReference: [],
        valueStringParam: [],
        id: [],
        valueConcept: [],
        valueDateParam: { lowerBound: "", myUpperBound: "" },
        date: { lowerBound: "", myUpperBound: "" },
        category: [],
        lastUpdated: { lowerBound: "", myUpperBound: "" },
      },
      diagnosticreportFilter: {
        code: diagnosticReportIds ? diagnosticReportIds.split(",") : [],
        encounterReference: [],
        patientReference: [],
        valueQuantityParam: [],
        hasMemberReference: [],
        valueStringParam: [],
        id: [],
        valueConcept: [],
        valueDateParam: { lowerBound: "", myUpperBound: "" },
        date: { lowerBound: "", myUpperBound: "" },
        category: [],
        lastUpdated: { lowerBound: "", myUpperBound: "" },
      },
      servicerequestFilter: {
        code: serviceRequestIds ? serviceRequestIds.split(",") : [],
        encounterReference: [],
        patientReference: [],
        valueQuantityParam: [],
        hasMemberReference: [],
        valueStringParam: [],
        id: [],
        valueConcept: [],
        valueDateParam: { lowerBound: "", myUpperBound: "" },
        date: { lowerBound: "", myUpperBound: "" },
        category: [],
        lastUpdated: { lowerBound: "", myUpperBound: "" },
      },
    };
  };

  const resourceSearchParameter = JSON.stringify(
    buildResourceSearchParameter()
  );

  return (
    <div className={styles.formContainer}>
      <div className={`${styles.form} ${styles.formFirst}`}>
        <Form>
          <Stack gap={2}>
            <FormGroup>
              <Dropdown
                id="dropdown-1"
                titleText={t(
                  "patientIdentifierType",
                  "Patient Identifier Type"
                )}
                items={dropdownPatientIdentifierItems}
                selectedItem={selectedItem}
                onChange={(event) => handleSelectionChange(event.selectedItem)}
                itemToString={(item) => (item ? item.label : "")}
                label="Select Patient Identifier Type"
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="number"
                labelText={t(
                  "patientIdentifierSourceId",
                  "Patient Identifier Source ID"
                )}
                id="patient-identifier-source-id"
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("encounterTypeUuids", "Encounter Type UUIDS")}
                value={encounterTypeUuids}
                onChange={(e) => setEncounterTypeUuids(e.target.value)}
                id="encounter-type-uuids"
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("observationConceptId", "Observation Concept IDs")}
                id="observation-concept-id"
                value={observationConceptIds}
                placeholder="Comma separate concept IDs eg 99046,47453"
                onChange={(e) => setObservationConceptIds(e.target.value)}
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t(
                  "episodeOfCareUuids",
                  "Episode of Care (Program) UUIDS"
                )}
                id="episode-of-care"
                placeholder="Comma separate program uuids"
                value={episodeOfCareUuids}
                onChange={(e) => setEpisodeOfCareUuids(e.target.value)}
                disabled={!isEditMode}
              />
            </FormGroup>
          </Stack>
        </Form>
      </div>
      <div className={`${styles.form} ${styles.formRight}`}>
        <Form>
          <Stack gap={2}>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t(
                  "medicationRequestIds",
                  "Meciation Request Concept IDs"
                )}
                id="medication-request-id"
                placeholder="Comma separate concept IDs eg 99046,47453"
                value={medicationRequestIds}
                onChange={(e) => setMedicationRequestIds(e.target.value)}
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t(
                  "medicationDispenseIds",
                  "Meciation Dispense Concept IDs"
                )}
                id="medication-dispense-id"
                placeholder="Comma separate concept IDs eg 99046,47453"
                value={medicationDispenseIds}
                onChange={(e) => setMedicationDispenseIds(e.target.value)}
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("conditionConceptIds", "Condition Concept IDs")}
                id="condition-id"
                placeholder="Comma separate concept IDs eg 99046,47453"
                value={conditionConceptIds}
                onChange={(e) => setConditionConceptIds(e.target.value)}
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("diagnosticReportIds", "Diagnostic Report IDs")}
                id="diagnostic-report-id"
                placeholder="Comma separate concept IDs eg 99046,47453"
                value={diagnosticReportIds}
                onChange={(e) => setDiagnosticReportIds(e.target.value)}
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("servceRequestIds", "Service Request IDs")}
                id="service-request-id"
                placeholder="Comma separate concept IDs eg 99046,47453"
                value={serviceRequestIds}
                onChange={(e) => setServiceRequestIds(e.target.value)}
                disabled={!isEditMode}
              />
            </FormGroup>
          </Stack>
        </Form>
      </div>
    </div>
  );
};

export default ResourceFilters;
