import React, { useState } from "react";
import {
  Checkbox,
  DatePicker,
  DatePickerInput,
  Dropdown,
  Form,
  FormGroup,
  Stack,
  TextInput,
} from "@carbon/react";
import { useTranslation } from "react-i18next";
import { caseBasedPrimaryResourceTypes } from "../../constants";
import styles from "../fhir-detail.scss";

const ResourceDefinition = ({
  syncFhirName,
  resourcesInBundle,
  durationSyncedResources,
}) => {
  const { t } = useTranslation();
  const [
    selectedCaseBasedPrimaryResourceType,
    setCaseBasedPrimaryResourceType,
  ] = useState<Item>();
  const handleCaseBasedPrimaryResourceTypes = (selectedItem) => {
    setCaseBasedPrimaryResourceType(selectedItem);
  };

  return (
    <div className={styles.formContainer}>
      <div className={`${styles.form} ${styles.formFirst}`}>
        <Form>
          <Stack gap={2}>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("syncFhirProfileName", "Sync Fhir Profile Name")}
                id="sync-fhir-profile-name"
                value={syncFhirName}
              />
            </FormGroup>
            <div>
              <FormGroup>
                <Checkbox
                  labelText={t("enableProfile", "Enable Profile")}
                  id="checkbox-label-1"
                />
              </FormGroup>
              <FormGroup>
                <Checkbox
                  labelText={t("generateBundle", "Generate Bundle")}
                  id="checkbox-label-2"
                />
              </FormGroup>
              <FormGroup>
                <Checkbox
                  labelText={t("syncHistoricalData", "Sync Historical Data")}
                  id="checkbox-label-2"
                />
              </FormGroup>
              <FormGroup>
                <DatePicker datePickerType="single">
                  <DatePickerInput
                    placeholder="mm/dd/yyyy"
                    labelText="Date Picker"
                    id="date-picker-single"
                    size="md"
                  />
                </DatePicker>
              </FormGroup>
            </div>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t(
                  "noOfResourcesInBundle",
                  "No of Resources in Bundle"
                )}
                id="no-of-resources-in-bundle"
                value={resourcesInBundle || ""}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t(
                  "durationKeepSyncedResource",
                  "Duration To Keep Synced Resource (Days)"
                )}
                id="duration-synced-resource"
                value={durationSyncedResources}
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
                labelText={t("observationConceptId", "Observation Concept IDs")}
                id="observation-concept-id"
              />
            </FormGroup>
            <div className={styles.resourceType}>
              <div>
                <FormGroup>
                  <Checkbox
                    labelText={t("patient", "Patient")}
                    id="resource-type-1"
                  />
                  <Checkbox
                    labelText={t("person", "Person")}
                    id="resource-type-2"
                  />
                  <Checkbox
                    labelText={t("episodeOfCare", "Episode of Care (Program)")}
                    id="resource-type-3"
                  />
                  <Checkbox
                    labelText={t("encounter", "Encounter")}
                    id="resource-type-4"
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup>
                  <Checkbox
                    labelText={t("observation", "Observation")}
                    id="resource-type-5"
                  />
                  <Checkbox
                    labelText={t(
                      "serviceRequest",
                      "Service Request (Lab Orders)"
                    )}
                    id="checkbox-label-2"
                  />
                  <Checkbox
                    labelText={t(
                      "medicationRequest",
                      "Medication Request (Medication Orders)"
                    )}
                    id="checkbox-label-2"
                  />
                  <Checkbox
                    labelText={t("practitioner", "Practioner (Provider)")}
                    id="checkbox-label-2"
                  />
                </FormGroup>
              </div>
            </div>
            <FormGroup>
              <Checkbox
                labelText={t("profileCaseBased", "Is Profile Case Based")}
                id="checkbox-label-2"
              />
            </FormGroup>
            <FormGroup>
              <Dropdown
                id="dropdown-2"
                titleText={t(
                  "caseBasedPrimaryResourceType",
                  "Case Based Primary Resource Type"
                )}
                items={caseBasedPrimaryResourceTypes}
                selectedItem={selectedCaseBasedPrimaryResourceType}
                onChange={(event) =>
                  handleCaseBasedPrimaryResourceTypes(event.selectedItem)
                }
                itemToString={(item) => (item ? item.label : "")}
                label="Select Primary Resource Type"
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t(
                  "caseBasedPrimaryResourceTypeIdentifier",
                  "Case Based Primary Resource Type Identifier"
                )}
                id="observation-concept-id"
              />
            </FormGroup>
          </Stack>
        </Form>
      </div>
    </div>
  );
};

export default ResourceDefinition;
