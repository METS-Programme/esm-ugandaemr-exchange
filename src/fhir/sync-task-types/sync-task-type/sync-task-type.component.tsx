import React, { useState } from "react";
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
import { syncTaskTypeDataTypes } from "../../../constants";
import styles from "./sync-task-type.scss";

export const SyncTaskTypeRow = ({ rowData }) => {
  const { t } = useTranslation();

  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleSubmit = () => {
    setIsEditMode(false);
  };

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
                  value={rowData?.name}
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  type="text"
                  labelText={t("url", "Url")}
                  id="sync-task-type-url"
                  value={rowData?.url}
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  type="text"
                  labelText={t("username", "Username")}
                  id="sync-task-type-username"
                  value={rowData?.username}
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  type="text"
                  labelText={t("password", "Password")}
                  id="sync-task-type-password"
                  value={rowData?.password}
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
                  value={rowData?.dataTypeIdentifier}
                  disabled={!isEditMode}
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  type="text"
                  labelText={t("authToken", "Auth Token")}
                  id="auth-token"
                  value={rowData?.authToken}
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
              onClick={handleSubmit}
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
