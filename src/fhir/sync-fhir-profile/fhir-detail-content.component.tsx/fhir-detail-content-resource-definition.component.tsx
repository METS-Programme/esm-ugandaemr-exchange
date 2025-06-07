import React, { useEffect, useState } from "react";
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
import { caseBasedPrimaryResourceTypes } from "../../../constants";
import styles from "../sync-fhir-profile-detail.scss";

const ResourceDefinition = ({
  syncFhirName,
  setSyncFhirName,
  resourcesInBundle,
  setResourcesInBundle,
  durationSyncedResources,
  setDurationSyncedResources,
  isCaseBasedProfile,
  setIsCaseBasedProfile,
  generateBundle,
  setGenerateBundle,
  resourceTypes,
  setResourceTypes,
  profileEnabled,
  setProfileEnabled,
  syncDataEverSince,
  setSyncDataEverSince,
  caseBasedPrimaryResourceType,
  setCaseBasedPrimaryResourceType,
  caseBasedPrimaryResourceTypeId,
  setCaseBasedPrimaryResourceTypeId,
  dataToSyncStartDate,
  setDataToSyncStartDate,
  isEditMode,
}) => {
  const { t } = useTranslation();

  const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, "");

  const dropdownItems = caseBasedPrimaryResourceTypes.map((type) => ({
    id: type.id,
    label: type.label,
  }));

  const findItemByLabel = (apiValue, items) => {
    const normalizedApiValue = normalizeString(apiValue);
    return items.find(
      (item) => normalizeString(item.label) === normalizedApiValue
    );
  };

  const [
    selectedCaseBasedPrimaryResourceType,
    setSelectedCaseBasedPrimaryResourceType,
  ] = useState(() =>
    findItemByLabel(caseBasedPrimaryResourceType, dropdownItems)
  );

  const [checkedResourceTypes, setCheckedResourceTypes] = useState([]);
  useEffect(() => {
    if (resourceTypes) {
      setCheckedResourceTypes(resourceTypes.split(","));
    }
  }, [resourceTypes]);

  const handleCheckboxChange = (value: string) => {
    setCheckedResourceTypes((previous) =>
      previous.includes(value)
        ? previous.filter((v) => v !== value)
        : [...previous, value]
    );
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
                onChange={(e) => setSyncFhirName(e.target.value)}
                disabled={!isEditMode}
              />
            </FormGroup>
            <div>
              <FormGroup>
                <Checkbox
                  labelText={t("enableProfile", "Enable Profile")}
                  id="checkbox-label-1"
                  checked={profileEnabled}
                  onChange={(e) => setProfileEnabled(e.target.checked)}
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <Checkbox
                  labelText={t("generateBundle", "Generate Bundle")}
                  id="checkbox-label-2"
                  checked={generateBundle}
                  onChange={(e) => setGenerateBundle(e.target.checked)}
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <Checkbox
                  labelText={t("syncHistoricalData", "Sync Historical Data")}
                  id="checkbox-label-2"
                  checked={syncDataEverSince}
                  onChange={(e) => setSyncDataEverSince(e.target.checked)}
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <DatePicker datePickerType="single">
                  <DatePickerInput
                    placeholder="mm/dd/yyyy"
                    labelText={t("syncStartDate", "Sync Start Date")}
                    id="date-picker-single"
                    size="md"
                    value={dataToSyncStartDate}
                    onChange={(e) => setDataToSyncStartDate(e.target.value)}
                    disabled={!isEditMode}
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
                onChange={(e) => setResourcesInBundle(e.target.value)}
                disabled={!isEditMode}
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
                onChange={(e) => setDurationSyncedResources(e.target.value)}
                disabled={!isEditMode}
              />
            </FormGroup>
          </Stack>
        </Form>
      </div>
      <div className={`${styles.form} ${styles.formRight}`}>
        <Form>
          <Stack gap={2}>
            <div className={styles.resourceType}>
              <div>
                <span>{t("resourceTypes", "Resource Types")}</span>
                <FormGroup>
                  <Checkbox
                    labelText={t("patient", "Patient")}
                    id="resource-type-1"
                    checked={checkedResourceTypes.includes("Patient")}
                    onChange={() => handleCheckboxChange("Patient")}
                    disabled={!isEditMode}
                  />
                  <Checkbox
                    labelText={t("person", "Person")}
                    id="resource-type-2"
                    checked={checkedResourceTypes.includes("Person")}
                    onChange={() => handleCheckboxChange("Person")}
                    disabled={!isEditMode}
                  />
                  <Checkbox
                    labelText={t("episodeOfCare", "Episode of Care (Program)")}
                    id="resource-type-3"
                    checked={checkedResourceTypes.includes("EpisodeOfCare")}
                    onChange={() => handleCheckboxChange("EpisodeOfCare")}
                    disabled={!isEditMode}
                  />
                  <Checkbox
                    labelText={t("encounter", "Encounter")}
                    id="resource-type-4"
                    checked={checkedResourceTypes.includes("Encounter")}
                    onChange={() => handleCheckboxChange("Encounter")}
                    disabled={!isEditMode}
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup>
                  <Checkbox
                    labelText={t("observation", "Observation")}
                    id="resource-type-5"
                    checked={checkedResourceTypes.includes("Observation")}
                    onChange={() => handleCheckboxChange("Observation")}
                    disabled={!isEditMode}
                  />
                  <Checkbox
                    labelText={t(
                      "serviceRequest",
                      "Service Request (Lab Orders)"
                    )}
                    id="checkbox-label-2"
                    checked={checkedResourceTypes.includes("ServiceRequest")}
                    onChange={() => handleCheckboxChange("ServiceRequest")}
                    disabled={!isEditMode}
                  />
                  <Checkbox
                    labelText={t(
                      "medicationRequest",
                      "Medication Request (Medication Orders)"
                    )}
                    id="checkbox-label-2"
                    checked={checkedResourceTypes.includes("MedicationRequest")}
                    onChange={() => handleCheckboxChange("MedicationRequest")}
                    disabled={!isEditMode}
                  />
                  <Checkbox
                    labelText={t("practitioner", "Practioner (Provider)")}
                    id="checkbox-label-2"
                    checked={checkedResourceTypes.includes("Practitioner")}
                    onChange={() => handleCheckboxChange("Practitioner")}
                    disabled={!isEditMode}
                  />
                </FormGroup>
              </div>
            </div>
            <span>{t("caseBasedSettings", "Case Based Settings")}</span>
            <FormGroup>
              <Checkbox
                labelText={t("profileCaseBased", "Is Profile Case Based")}
                id="checkbox-label-2"
                checked={isCaseBasedProfile}
                onChange={(e) => setIsCaseBasedProfile(e.target.checked)}
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <Dropdown
                id="dropdown-2"
                titleText={t(
                  "caseBasedPrimaryResourceType",
                  "Case Based Primary Resource Type"
                )}
                items={dropdownItems}
                selectedItem={selectedCaseBasedPrimaryResourceType}
                onChange={({ selectedItem }) =>
                  setSelectedCaseBasedPrimaryResourceType(selectedItem)
                }
                itemToString={(item) => (item ? item.label : "")}
                label="Select Primary Resource Type"
                disabled={!isEditMode}
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
                value={caseBasedPrimaryResourceTypeId}
                onChange={(e) =>
                  setCaseBasedPrimaryResourceTypeId(e.target.value)
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

export default ResourceDefinition;
