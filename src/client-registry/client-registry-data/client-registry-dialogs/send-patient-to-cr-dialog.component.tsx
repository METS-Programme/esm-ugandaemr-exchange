import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Patient } from "../../../types";
import styles from "./send-patient-to-cr-dialog.scss";
import {
  Form,
  ModalHeader,
  ModalBody,
  InlineLoading,
  ModalFooter,
  Button,
} from "@carbon/react";
import { Payload, submitPatient } from "../../client-registry.resource";
import {
  showNotification,
  showSnackbar,
  useConfig,
} from "@openmrs/esm-framework";

interface SendPatientToCRDialogProps {
  patient: Patient;
  closeModal: () => void;
}

const SendPatientToCRDialog: React.FC<SendPatientToCRDialogProps> = ({
  patient,
  closeModal,
}) => {
  const { clientRegistryUrl } = useConfig();
  const apiUrl = `${clientRegistryUrl}/Patient`;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const crPatient: Payload = {
    resourceType: "Patient",
    identifier: [],
    name: [],
    telecom: [],
    maritalStatus: undefined,
    managingOrganization: undefined,
    address: [],
    contact: [],
    communication: [],
    extension: [],
    birthDate: "",
    deceasedBoolean: false,
    active: false,
    gender: "",
  };

  const sendPatientToCR = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // send patient to CR
    submitPatient(apiUrl, crPatient).then(
      () => {
        setIsLoading(false);
        showSnackbar({
          isLowContrast: true,
          title: t("sendPatient", "Send Patient"),
          kind: "success",
          subtitle: t(
            "successfullySent",
            `You have successfully sent to Client Registry`
          ),
        });
        closeModal();
      },
      (error) => {
        setIsLoading(false);
        closeModal();
        showNotification({
          title: t(
            `errorSendingPatient', 'Error Sending patient to client registry"),`
          ),
          kind: "error",
          critical: true,
          description: error.messages,
        });
      }
    );
  };

  return (
    <>
      <Form>
        <ModalHeader
          closeModal={closeModal}
          title={t("sendPatientToCR", "Send Patient To Client Registry")}
        />
        <ModalBody>
          {isLoading && (
            <InlineLoading
              className={styles.bannerLoading}
              iconDescription="Loading"
              description="Loading banner"
              status="active"
            />
          )}
          <section className={styles.section}>
            <p>
              {patient.person?.display} : {patient.person.age} years
            </p>
            <p>
              {patient.identifiers
                .map((identifier) => identifier.display)
                .join(", ")}
            </p>
          </section>
        </ModalBody>
        <ModalFooter>
          <Button kind="secondary" onClick={closeModal}>
            {t("cancel", "Cancel")}
          </Button>

          <Button
            type="submit"
            onClick={(e) => sendPatientToCR(e)}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : t("sendPatientToCR", "Send Patient")}
          </Button>
        </ModalFooter>
      </Form>
    </>
  );
};

export default SendPatientToCRDialog;
