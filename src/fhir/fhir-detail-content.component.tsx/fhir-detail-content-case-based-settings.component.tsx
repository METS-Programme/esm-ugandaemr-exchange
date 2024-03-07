import React from "react";
import { Form, FormGroup, Stack, TextInput } from "@carbon/react";
import { useTranslation } from "react-i18next";

const CaseBasedSettings = ({
  url,
  syncLimit,
  urlToken,
  urlUserName,
  urlPassword,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Form>
        <Stack gap={2}>
          <FormGroup>
            <TextInput
              type="text"
              labelText={t("url", "URL")}
              id="url-input"
              value={url}
            />
          </FormGroup>
          <FormGroup>
            <TextInput
              type="text"
              labelText={t(
                "syncLimit",
                "Number of Resources to Sync at a time"
              )}
              id="sync-limit-input"
            />
          </FormGroup>
          <FormGroup>
            <TextInput
              type="text"
              labelText={t("username", "Username")}
              id="username-input"
            />
          </FormGroup>
          <FormGroup>
            <TextInput
              type="text"
              labelText={t("password", "Password")}
              id="password-input"
            />
          </FormGroup>
          <FormGroup>
            <TextInput
              type="text"
              labelText={t("authToken", "Auth Token")}
              id="auth-token-input"
            />
          </FormGroup>
        </Stack>
      </Form>
    </div>
  );
};

export default CaseBasedSettings;
