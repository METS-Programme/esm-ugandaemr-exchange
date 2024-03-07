import React from "react";
import {
  Checkbox,
  DatePicker,
  DatePickerInput,
  Form,
  FormGroup,
  Stack,
  TextInput,
} from "@carbon/react";
import { useTranslation } from "react-i18next";

const ResourceDefinition = ({
  syncFhirName,
  resourcesInBundle,
  durationSyncedResources,
}) => {
  const { t } = useTranslation();

  return (
    <div>
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
              value={resourcesInBundle}
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

export default ResourceDefinition;
