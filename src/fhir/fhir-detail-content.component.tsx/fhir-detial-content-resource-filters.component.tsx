import React from "react";
import { Dropdown, Form, FormGroup, Stack, TextInput } from "@carbon/react";
import { useTranslation } from "react-i18next";

const ResourceFilters = () => {
  const { t } = useTranslation();
  const identifierTypeItems = [{ key: "openmrsId", label: "Openmrs ID" }];

  return (
    <div>
      <Form>
        <Stack gap={2}>
          <FormGroup>
            <Dropdown
              id="dropdown-1"
              titleText={t("patientIdentifierType", "Patient Identifier Type")}
              items={identifierTypeItems}
              initialSelectedItem={identifierTypeItems[0]}
              itemToString={(item) => (item ? item.label : "")}
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
            />
          </FormGroup>
          <FormGroup>
            <TextInput
              type="text"
              labelText={t("encounterTypeUuids", "Encounter Type UUIDS")}
              id="encounter-type-uuids"
            />
          </FormGroup>
          <FormGroup>
            <TextInput
              type="text"
              labelText={t("observationConceptId", "Observation Concept IDs")}
              id="observation-concept-id"
            />
          </FormGroup>
        </Stack>
      </Form>
    </div>
  );
};

export default ResourceFilters;
