import React, { useCallback, useState } from "react";
import { Button, ContentSwitcher, Switch } from "@carbon/react";
import { useTranslation } from "react-i18next";
import {
  AssemblyCluster,
  Edit,
  Filter,
  Save,
  Settings,
} from "@carbon/react/icons";
import styles from "./sync-fhir-profile-detail.scss";
import ResourceDefinition from "./fhir-detail-content.component.tsx/fhir-detail-content-resource-definition.component";
import CaseBasedSettings from "./fhir-detail-content.component.tsx/fhir-detail-content-case-based-settings.component";
import ResourceFilters from "./fhir-detail-content.component.tsx/fhir-detial-content-resource-filters.component";
import { showNotification, showSnackbar } from "@openmrs/esm-framework";
import { saveSyncFhirProfile } from "./sync-fhir-profile.resource";
const RowDetails = ({ selectedProfileData }) => {
  const { t } = useTranslation();
  const [tabType, setTabType] = useState("Resource Definition");

  const [name, setName] = useState(selectedProfileData.name);
  const [resourceTypes, setResourceTypes] = useState(
    selectedProfileData.resourceTypes
  );
  const [profileEnabled, setProfileEnabled] = useState(
    selectedProfileData.profileEnabled
  );
  const [patientIdentifierType, setPatientIdentifierType] = useState(
    selectedProfileData.patientIdentifierType
  );
  const [numberOfResourcesInBundle, setNumberOfResourcesInBundle] = useState(
    selectedProfileData.numberOfResourcesInBundle
  );
  const [durationToKeepSyncedResources, setDurationToKeepSyncedResources] =
    useState(selectedProfileData.durationToKeepSyncedResources);
  const [generateBundle, setGenerateBundle] = useState(
    selectedProfileData.generateBundle
  );
  const [isCaseBasedProfile, setIsCaseBasedProfile] = useState(
    selectedProfileData.isCaseBasedProfile
  );
  const [caseBasedPrimaryResourceType, setCaseBasedPrimaryResourceType] =
    useState(selectedProfileData.caseBasedPrimaryResourceType);
  const [caseBasedPrimaryResourceTypeId, setCaseBasedPrimaryResourceTypeId] =
    useState(selectedProfileData.caseBasedPrimaryResourceTypeId);
  const [syncDataEverSince, setSyncDataEverSince] = useState(
    selectedProfileData.syncDataEverSince
  );
  const [dataToSyncStartDate, setDataToSyncStartDate] = useState(
    selectedProfileData.dataToSyncStartDate
  );
  const [resourceSearchParameterObject, setResourceSearchParameterObject] =
    useState(JSON.parse(selectedProfileData.resourceSearchParameter));

  const [conceptSource, setConceptSource] = useState(
    selectedProfileData.conceptSource
  );
  const [url, setUrl] = useState(selectedProfileData.url);
  const [syncLimit, setSyncLimit] = useState(selectedProfileData.syncLimit);
  const [urlToken, setUrlToken] = useState(selectedProfileData.urlToken);
  const [urlUserName, setUrlUserName] = useState(
    selectedProfileData.urlUserName
  );
  const [urlPassword, setUrlPassword] = useState(
    selectedProfileData.urlPassword
  );
  const [searchable, setSearchable] = useState(selectedProfileData.searchable);
  const [searchURL, setSearchURL] = useState(selectedProfileData.searchURL);

  const handleTabTypeChange = ({ name }) => {
    setTabType(name);
  };
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSubmit = () => {
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const [observationFilterCodes, setObservationFilterCodes] = useState(
    resourceSearchParameterObject.observationFilter?.code || ""
  );
  const [encounterTypeUUIDS, setEncounterTypeUUIDS] = useState(
    resourceSearchParameterObject.encounterFilter?.type || ""
  );
  const [episodeOfCareUUIDS, setEpisodeOfCareUUIDS] = useState(
    resourceSearchParameterObject.episodeofcareFilter?.type || ""
  );
  const [medicationRequestCodes, setMedicationRequestCodes] = useState(
    resourceSearchParameterObject.medicationrequestFilter?.code || ""
  );
  const [medicationDispenseCodes, setMedicationDispenseCodes] = useState(
    resourceSearchParameterObject.medicationdispenseFilter?.code || ""
  );
  const [conditionCodes, setConditionCodes] = useState(
    resourceSearchParameterObject.conditionFilter?.code || ""
  );
  const [diagnosticReportCodes, setDiagnosticReportCodes] = useState(
    resourceSearchParameterObject.diagnosticreportFilter?.code || ""
  );
  const [serviceRequestCodes, setServiceRequestCodes] = useState(
    resourceSearchParameterObject.servicerequestFilter?.code || ""
  );

  const buildResourceSearchParameter = () => {
    return {
      observationFilter: {
        code: observationFilterCodes ? [observationFilterCodes] : [],
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
        type: encounterTypeUUIDS ? encounterTypeUUIDS : [],
        date: { lowerBound: "", myUpperBound: "" },
        lastUpdated: { lowerBound: "", myUpperBound: "" },
        subject: [],
        location: [],
        id: [],
        participant: [],
      },
      episodeofcareFilter: {
        type: episodeOfCareUUIDS ? episodeOfCareUUIDS : [],
        lastUpdated: { lowerBound: "", myUpperBound: "" },
      },
      medicationrequestFilter: {
        code: medicationRequestCodes ? medicationRequestCodes : [],
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
        code: medicationDispenseCodes ? medicationDispenseCodes : [],
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
        code: conditionCodes ? conditionCodes : [],
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
        code: diagnosticReportCodes ? diagnosticReportCodes : [],
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
        code: serviceRequestCodes ? serviceRequestCodes : [],
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

  const handleSave = useCallback(async () => {
    try {
      const payload: syncFhirProfilePayload = {
        uuid: selectedProfileData.uuid,
        name,
        resourceTypes,
        profileEnabled,
        patientIdentifierType,
        numberOfResourcesInBundle,
        durationToKeepSyncedResources,
        generateBundle,
        isCaseBasedProfile,
        caseBasedPrimaryResourceType,
        caseBasedPrimaryResourceTypeId,
        resourceSearchParameter,
        url,
        conceptSource,
        syncLimit,
        urlToken,
        urlUserName,
        urlPassword,
        syncDataEverSince,
        dataToSyncStartDate,
        searchable,
        searchURL,
      };

      const response = await saveSyncFhirProfile(payload);
      console.log(payload);

      if (response?.status === 200 || response?.status === 201) {
        showSnackbar({
          title: t("syncFhirProfileSaved", "Sync FHIR Profile Saved"),
          kind: "success",
          subtitle: t(
            "syncFhirProfileSaved",
            "The FHIR profile has been saved successfully."
          ),
        });
        setIsEditMode(false);
        // Optionally refetch or mutate
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      showNotification({
        title: t("syncFhirProfileError", "Error Saving FHIR Profile"),
        kind: "error",
        critical: true,
        description: error.message,
      });
    }
  }, [
    selectedProfileData.uuid,
    name,
    resourceTypes,
    profileEnabled,
    patientIdentifierType,
    numberOfResourcesInBundle,
    durationToKeepSyncedResources,
    generateBundle,
    isCaseBasedProfile,
    caseBasedPrimaryResourceType,
    caseBasedPrimaryResourceTypeId,
    resourceSearchParameter,
    url,
    syncLimit,
    urlToken,
    urlUserName,
    urlPassword,
    syncDataEverSince,
    dataToSyncStartDate,
    searchable,
    searchURL,
    t,
  ]);

  return (
    <div>
      <ContentSwitcher onChange={handleTabTypeChange}>
        <Switch name="Resource Definition">
          <div className={styles.switch}>
            <AssemblyCluster />
            <span>{t("resourceDefinition", "Resource Definition")}</span>
          </div>
        </Switch>
        <Switch name="Resource Filters">
          <div className={styles.switch}>
            <Filter />
            <span>{t("resourceFilters", "Resource Filters")}</span>
          </div>
        </Switch>
        <Switch name="Sync Settings">
          <div className={styles.switch}>
            <Settings />
            <span>{t("syncSettings", "Sync Settings")}</span>
          </div>
        </Switch>
      </ContentSwitcher>

      {tabType === "Resource Definition" && (
        <ResourceDefinition
          syncFhirName={name}
          setSyncFhirName={setName}
          resourcesInBundle={numberOfResourcesInBundle}
          setResourcesInBundle={setNumberOfResourcesInBundle}
          durationSyncedResources={durationToKeepSyncedResources}
          setDurationSyncedResources={setDurationToKeepSyncedResources}
          isCaseBasedProfile={isCaseBasedProfile}
          setIsCaseBasedProfile={setIsCaseBasedProfile}
          generateBundle={generateBundle}
          setGenerateBundle={setGenerateBundle}
          resourceTypes={resourceTypes}
          setResourceTypes={setResourceTypes}
          profileEnabled={profileEnabled}
          setProfileEnabled={setProfileEnabled}
          syncDataEverSince={syncDataEverSince}
          setSyncDataEverSince={setSyncDataEverSince}
          caseBasedPrimaryResourceType={caseBasedPrimaryResourceType}
          setCaseBasedPrimaryResourceType={setCaseBasedPrimaryResourceType}
          caseBasedPrimaryResourceTypeId={caseBasedPrimaryResourceTypeId}
          setCaseBasedPrimaryResourceTypeId={setCaseBasedPrimaryResourceTypeId}
          dataToSyncStartDate={dataToSyncStartDate}
          setDataToSyncStartDate={setDataToSyncStartDate}
          isEditMode={isEditMode}
        />
      )}
      {tabType === "Resource Filters" && (
        <ResourceFilters
          isEditMode={isEditMode}
          patientIdentifierType={patientIdentifierType}
          setPatientIdentifierType={setPatientIdentifierType}
          observationFilterCodes={observationFilterCodes}
          setObservationFilterCodes={setObservationFilterCodes}
          encounterTypeUUIDS={encounterTypeUUIDS}
          setEncounterTypeUUIDS={setEncounterTypeUUIDS}
          episodeOfCareUUIDS={episodeOfCareUUIDS}
          setEpisodeOfCareUUIDS={setEpisodeOfCareUUIDS}
          medicationRequestCodes={medicationRequestCodes}
          setMedicationRequestCodes={setMedicationRequestCodes}
          medicationDispenseCodes={medicationDispenseCodes}
          setMedicationDispenseCodes={setMedicationDispenseCodes}
          conditionCodes={conditionCodes}
          setConditionCodes={setConditionCodes}
          diagnosticReportCodes={diagnosticReportCodes}
          setDiagnosticReportCodes={setDiagnosticReportCodes}
          serviceRequestCodes={serviceRequestCodes}
          setServiceRequestCodes={setServiceRequestCodes}
        />
      )}
      {tabType === "Sync Settings" && (
        <CaseBasedSettings
          url={url}
          setUrl={setUrl}
          syncLimit={syncLimit}
          setSyncLimit={setSyncLimit}
          urlToken={urlToken}
          setUrlToken={setUrlToken}
          urlUserName={urlUserName}
          setUrlUserName={setUrlUserName}
          urlPassword={urlPassword}
          setUrlPassword={setUrlPassword}
          searchable={searchable}
          setSearchable={setSearchable}
          searchURL={searchURL}
          setSearchURL={setSearchURL}
          isEditMode={isEditMode}
        />
      )}
      <div className={styles.editButtonsContainer}>
        {!isEditMode && (
          <Button
            kind="primary"
            size="md"
            className={styles.actionButton}
            onClick={handleEdit}
          >
            <Edit />
            <span>{t("edit", "Edit")}</span>
          </Button>
        )}
        {isEditMode && (
          <>
            <Button kind="secondary" onClick={handleCancel}>
              <span>{t("cancel", "Cancel")}</span>
            </Button>
            <Button
              kind="primary"
              size="md"
              className={styles.actionButton}
              onClick={handleSave}
            >
              <Save />
              <span>{t("save", "Save")}</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RowDetails;
