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
import {
  caseBasedPrimaryResourceTypes,
  resourceTypeGroups,
} from "../../../constants";
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

  const [checkedResourceTypes, setCheckedResourceTypes] = useState([]);
  useEffect(() => {
    if (resourceTypes) {
      setCheckedResourceTypes(resourceTypes.split(","));
    }
  }, [resourceTypes]);

  const handleCheckboxChange = (value: string) => {
    setCheckedResourceTypes((prev) => {
      const updated = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      setResourceTypes(updated.join(","));
      return updated;
    });
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
                  id="enable-profile"
                  checked={profileEnabled}
                  onChange={(e) => setProfileEnabled(e.target.checked)}
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <Checkbox
                  labelText={t("generateBundle", "Generate Bundle")}
                  id="generate-bundle"
                  checked={generateBundle}
                  onChange={(e) => setGenerateBundle(e.target.checked)}
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <Checkbox
                  labelText={t("syncHistoricalData", "Sync Historical Data")}
                  id="sync-historical-data"
                  checked={syncDataEverSince}
                  onChange={(e) => setSyncDataEverSince(e.target.checked)}
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <DatePicker
                  datePickerType="single"
                  dateFormat="Y-m-d"
                  value={dataToSyncStartDate}
                  onChange={(dates) => {
                    if (dates.length) {
                      setDataToSyncStartDate(dates[0]);
                    }
                  }}
                >
                  <DatePickerInput
                    placeholder="yyyy-mm-dd"
                    labelText={t("syncStartDate", "Sync Start Date")}
                    id="sync-start-date"
                    size="md"
                    disabled={!isEditMode || !syncDataEverSince}
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
            <span>{t("resourceTypes", "Resource Types")}</span>
            <div className={styles.resourceType}>
              {resourceTypeGroups.map((group, idx) => (
                <div key={`group-${idx}`}>
                  <FormGroup>
                    {group.map(({ id, labelKey, fallback }) => (
                      <Checkbox
                        key={id}
                        labelText={t(labelKey, fallback)}
                        id={`resource-type-${id}`}
                        checked={checkedResourceTypes.includes(id)}
                        onChange={() => handleCheckboxChange(id)}
                        disabled={!isEditMode}
                      />
                    ))}
                  </FormGroup>
                </div>
              ))}
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
                id="resource-type"
                titleText={t(
                  "caseBasedPrimaryResourceType",
                  "Case Based Primary Resource Type"
                )}
                items={caseBasedPrimaryResourceTypes}
                selectedItem={caseBasedPrimaryResourceTypes.find(
                  (item) => item.id === caseBasedPrimaryResourceType
                )}
                onChange={({ selectedItem }) =>
                  setCaseBasedPrimaryResourceType(selectedItem.id)
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
