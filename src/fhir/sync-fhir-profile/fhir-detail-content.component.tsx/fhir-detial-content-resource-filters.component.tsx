import React, { useCallback, useEffect, useState } from "react";
import { Dropdown, Form, FormGroup, Stack, TextInput } from "@carbon/react";
import { useTranslation } from "react-i18next";
import {
  saveSyncFhirProfile,
  useGetPatientIdentifierType,
} from "../sync-fhir-profile.resource";
import styles from "../sync-fhir-profile-detail.scss";
import { showSnackbar } from "@openmrs/esm-framework";

interface ResourceFiltersProps {
  isEditMode: boolean;
  patientIdentifierType: any;
  setPatientIdentifierType: (value: any) => void;

  observationFilterCodes: string;
  setObservationFilterCodes: (value: string) => void;

  encounterTypeUUIDS: string;
  setEncounterTypeUUIDS: (value: string) => void;

  episodeOfCareUUIDS: string;
  setEpisodeOfCareUUIDS: (value: string) => void;

  medicationRequestCodes: string;
  setMedicationRequestCodes: (value: string) => void;

  medicationDispenseCodes: string;
  setMedicationDispenseCodes: (value: string) => void;

  conditionCodes: string;
  setConditionCodes: (value: string) => void;

  diagnosticReportCodes: string;
  setDiagnosticReportCodes: (value: string) => void;

  serviceRequestCodes: string;
  setServiceRequestCodes: (value: string) => void;
}

const ResourceFilters: React.FC<ResourceFiltersProps> = ({
  isEditMode,
  patientIdentifierType,
  setPatientIdentifierType,
  observationFilterCodes,
  setObservationFilterCodes,
  encounterTypeUUIDS,
  setEncounterTypeUUIDS,
  episodeOfCareUUIDS,
  setEpisodeOfCareUUIDS,
  medicationRequestCodes,
  setMedicationRequestCodes,
  medicationDispenseCodes,
  setMedicationDispenseCodes,
  conditionCodes,
  setConditionCodes,
  diagnosticReportCodes,
  setDiagnosticReportCodes,
  serviceRequestCodes,
  setServiceRequestCodes,
}) => {
  const { t } = useTranslation();

  const { patientIdentifierTypes } = useGetPatientIdentifierType();

  const dropdownPatientIdentifierItems = patientIdentifierTypes.map((type) => ({
    id: type.uuid,
    label: type.display,
  }));

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
                selectedItem={
                  patientIdentifierType
                    ? {
                        id: patientIdentifierType.uuid,
                        label: patientIdentifierType.display,
                      }
                    : null
                }
                onChange={(event) =>
                  setPatientIdentifierType(event.selectedItem)
                }
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
                placeholder="Comma separate encounter type uuids"
                value={encounterTypeUUIDS}
                onChange={(e) =>
                  setEncounterTypeUUIDS(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
                id="encounter-type-uuids"
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("observationConceptId", "Observation Concept IDs")}
                id="observation-concept-id"
                value={observationFilterCodes}
                placeholder="Comma separate concept IDs eg 99046,47453"
                onChange={(e) =>
                  setObservationFilterCodes(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
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
                value={episodeOfCareUUIDS}
                onChange={(e) =>
                  setEpisodeOfCareUUIDS(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
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
                value={medicationRequestCodes}
                onChange={(e) =>
                  setMedicationRequestCodes(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
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
                value={medicationDispenseCodes}
                onChange={(e) =>
                  setMedicationDispenseCodes(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("conditionConceptIds", "Condition Concept IDs")}
                id="condition-id"
                placeholder="Comma separate concept IDs eg 99046,47453"
                value={conditionCodes}
                onChange={(e) =>
                  setConditionCodes(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("diagnosticReportIds", "Diagnostic Report IDs")}
                id="diagnostic-report-id"
                placeholder="Comma separate concept IDs eg 99046,47453"
                value={diagnosticReportCodes}
                onChange={(e) =>
                  setDiagnosticReportCodes(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("servceRequestIds", "Service Request IDs")}
                id="service-request-id"
                placeholder="Comma separate concept IDs eg 99046,47453"
                value={serviceRequestCodes}
                onChange={(e) =>
                  setServiceRequestCodes(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
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
