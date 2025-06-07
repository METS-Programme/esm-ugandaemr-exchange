import React from "react";
import { Checkbox, Form, FormGroup, Stack, TextInput } from "@carbon/react";
import { useTranslation } from "react-i18next";
import styles from "../sync-fhir-profile-detail.scss";

const CaseBasedSettings = ({
  url,
  setUrl,
  syncLimit,
  setSyncLimit,
  urlToken,
  setUrlToken,
  urlUserName,
  setUrlUserName,
  urlPassword,
  setUrlPassword,
  searchable,
  setSearchable,
  searchURL,
  setSearchURL,
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
                onChange={(e) => setUrl(e.target.value)}
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
                onChange={(e) => setSyncLimit(Number(e.target.value))}
                id="sync-limit-input"
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("username", "Username")}
                value={urlUserName}
                onChange={(e) => setUrlUserName(e.target.value)}
                id="username-input"
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="password"
                labelText={t("password", "Password")}
                value={urlPassword}
                onChange={(e) => setUrlPassword(e.target.value)}
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
                onChange={(e) => setUrlToken(e.target.value)}
                id="auth-token-input"
                disabled={!isEditMode}
              />
            </FormGroup>
            <FormGroup>
              <Checkbox
                labelText={t("syncHistoricalData", "Sync Historical Data")}
                id="checkbox-label-2"
                checked={searchable}
                onChange={(e) => setSearchable(e.target.checked)}
                disabled={!isEditMode}
              />
              <TextInput
                type="text"
                labelText={t("profileSearchable", "Is Profile Searchable")}
                id="profile-searchable"
                value={searchURL}
                onChange={(e) => setSearchURL(e.target.value)}
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
