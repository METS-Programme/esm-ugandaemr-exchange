import React from "react";
import { Form, FormGroup, Stack, TextInput } from "@carbon/react";
import { useTranslation } from "react-i18next";
import styles from "../fhir-detail.scss";

const CaseBasedSettings = ({
  url,
  syncLimit,
  urlToken,
  urlUserName,
  urlPassword,
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
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("username", "Username")}
                value={urlUserName}
                id="username-input"
              />
            </FormGroup>
            <FormGroup>
              <TextInput
                type="text"
                labelText={t("password", "Password")}
                value={urlPassword}
                id="password-input"
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
              />
            </FormGroup>
          </Stack>
        </Form>
      </div>
    </div>
  );
};

export default CaseBasedSettings;
