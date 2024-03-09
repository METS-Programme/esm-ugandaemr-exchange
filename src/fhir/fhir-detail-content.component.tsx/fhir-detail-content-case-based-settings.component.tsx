import React from "react";
import { Checkbox, Form, FormGroup, Stack, TextInput } from "@carbon/react";
import { useTranslation } from "react-i18next";
import styles from "../fhir-detail.scss";

const CaseBasedSettings = ({
  url,
  syncLimit,
  urlToken,
  urlUserName,
  urlPassword,
  searchable,
  searchURL,
  isEditMode,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.formContainer}>
      <div className={`${styles.form} ${styles.formFirst}`}>
        <Form>
          <Stack gap={2}>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("url", "URL")}
                id="url-input"
                value={url}
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t(
                  "syncLimit",
                  "Number of Resources to Sync at a time"
                )}
                value={syncLimit}
                id="sync-limit-input"
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("username", "Username")}
                value={urlUserName}
                id="username-input"
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("password", "Password")}
                value={urlPassword}
                id="password-input"
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
                labelText={t("authToken", "Auth Token")}
                value={urlToken}
                id="auth-token-input"
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <Checkbox
                labelText={t("syncHistoricalData", "Sync Historical Data")}
                id="checkbox-label-2"
                checked={searchable}
                disabled={!isEditMode}
              />
              <TextInput
                type="text"
                labelText={t("profileSearchable", "Is Profile Searchable")}
                id="url-input"
                value={searchURL}
                disabled={!isEditMode}
              />
            </FormGroup>
          </Stack>
        </Form>
      </div>
    </div>
  );
};

export default CaseBasedSettings;
