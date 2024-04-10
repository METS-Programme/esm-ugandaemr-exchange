import React, { useEffect, useState } from "react";
import { Dropdown, Form, FormGroup, Stack, TextInput } from "@carbon/react";
import { useTranslation } from "react-i18next";
import { useGetPatientIdentifierType } from "../fhir.resource";
import styles from "../fhir-detail.scss";

const ResourceFilters = ({
  isEditMode,
  patientIdentifierType,
  observationFilterCodes,
  encounterTypeUUIDS,
}) => {
  const { t } = useTranslation();

  const { patientIdentifierTypes } = useGetPatientIdentifierType();

  const dropdownPatientIdentifierItems = patientIdentifierTypes.map((type) => ({
    id: type.uuid,
    label: type.display,
  }));

  const [observationConceptIds, setObservationConceptIds] = useState("");
  const [encounterTypeUuids, setEncounterTypeUuids] = useState("");

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
                onChange={(e) => setObservationConceptIds(e.target.value)}
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
                  "episodeOfCareUuids",
                  "Episode of Care (Program) UUIDS"
                )}
                id="episode-of-care"
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
