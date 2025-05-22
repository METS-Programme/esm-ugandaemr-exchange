import React, { useCallback, useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  FormGroup,
  Stack,
  TextInput,
} from "@carbon/react";
import { Edit, Save } from "@carbon/react/icons";
import { useTranslation } from "react-i18next";
import { syncTaskTypeDataTypes } from "../../constants";
import styles from "./sync-task-type.scss";
import {
  saveSyncTaskType,
  useGetSyncTaskTypes,
} from "../sync-task-types.resource";
import { showNotification, showSnackbar } from "@openmrs/esm-framework";

export const SyncTaskTypeRow = ({ rowData }) => {
  const { t } = useTranslation();
  const { mutate } = useGetSyncTaskTypes();

  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(rowData?.name || "");
  const [url, setUrl] = useState(rowData?.url || "");
  const [username, setUsername] = useState(rowData?.urlUserName || "");
  const [password, setPassword] = useState(rowData?.urlPassword || "");
  const [dataTypeId, setDataTypeId] = useState(rowData?.dataTypeId || "");
  const [token, setToken] = useState(rowData?.urlToken || "");
  const [tokenType, setTokenType] = useState(rowData?.tokenType || "");
  const [tokenExpiryDate, setTokenExpiryDate] = useState(
    rowData?.tokenExpiryDate ? new Date(rowData.tokenExpiryDate) : new Date()
  );

  const dataTypesList = syncTaskTypeDataTypes.map((type) => ({
    id: type.id,
    label: type.label,
  }));

  const normalizeString = (str) => str?.toLowerCase().replace(/\s+/g, "");

  const findItemByLabel = (apiValue, items) => {
    const normalizedApiValue = normalizeString(apiValue);
    return items?.find(
      (item) => normalizeString(item.label) === normalizedApiValue
    );
  };

  const [selectedDataTypeType, setSelectedDataTypeType] = useState(() =>
    findItemByLabel(rowData?.dataType, dataTypesList)
  );

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = useCallback(async () => {
    try {
      const payload = {
        uuid: rowData?.uuid,
        name,
        dataType: selectedDataTypeType?.label,
        dataTypeId,
        url,
        urlToken: token,
        urlUserName: username,
        urlPassword: password,
        tokenExpiryDate,
        tokenType,
      };
      const response = await saveSyncTaskType(payload);

      if (response?.status === 200 || response?.status === 201) {
        showSnackbar({
          title: t("syncTaskTypeSaved", "Sync Task Type Saved"),
          kind: "success",
          subtitle: t(
            "syncTaskTypeSaved",
            "Sync task type has been saved successfully."
          ),
        });
        setIsEditMode(false);
        mutate();
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      showNotification({
        title: t("syncTaskTypeError", "Error saving Sync Task Type"),
        kind: "error",
        critical: true,
        description: error.message,
      });
    }
  }, [
    rowData,
    name,
    dataTypeId,
    selectedDataTypeType,
    url,
    token,
    username,
    password,
    tokenExpiryDate,
    tokenType,
    t,
  ]);

  const handleCancel = () => {
    setIsEditMode(false);
  };

  return (
    <>
      <div className={styles.formContainer}>
        <div className={`${styles.form} ${styles.formFirst}`}>
          <Form>
            <Stack gap={2}>
              <FormGroup>
                <TextInput
                  type="text"
                  labelText={t("syncTaskTypeName", "Sync Task Type Name")}
                  id="sync-task-type-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  type="text"
                  labelText={t("url", "Url")}
                  id="sync-task-type-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  type="text"
                  labelText={t("username", "Username")}
                  id="sync-task-type-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  type="password"
                  labelText={t("password", "Password")}
                  id="sync-task-type-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!isEditMode}
                />
              </FormGroup>
            </Stack>
          </Form>
        </div>
        <div className={`${styles.form} ${styles.formFirst}`}>
          <Form>
            <Stack>
              <FormGroup>
                <Dropdown
                  id="sync-task-type-data-type"
                  titleText={t("dataType", "Data Type")}
                  itemToString={(item) => (item ? item.label : "")}
                  items={dataTypesList}
                  label="Select Data Type"
                  selectedItem={selectedDataTypeType}
                  onChange={(event) =>
                    setSelectedDataTypeType(event.selectedItem)
                  }
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  type="text"
                  labelText={t(
                    "dataTypeIdentifier",
                    "Data Type Identifier (eg uuid for enounter type)"
                  )}
                  id="data-type-identifier"
                  value={dataTypeId}
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  type="text"
                  labelText={t("authToken", "Auth Token")}
                  id="auth-token"
                  value={token}
                  disabled={!isEditMode}
                />
              </FormGroup>
            </Stack>
          </Form>
        </div>
      </div>
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
    </>
  );
};

export default SyncTaskTypeRow;
