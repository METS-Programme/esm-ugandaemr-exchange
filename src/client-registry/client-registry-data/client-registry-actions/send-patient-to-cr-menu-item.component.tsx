import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Patient } from "../../../types";
import { OverflowMenuItem } from "@carbon/react";
import { showModal } from "@openmrs/esm-framework";

interface SendPatientToCRActionMenuProps {
  patient: Patient;
  closeModal: () => void;
}

const SendPatientToCRActionMenu: React.FC<SendPatientToCRActionMenuProps> = ({
  patient,
}) => {
  const { t } = useTranslation();
  const launchSendPatientToCRModal = useCallback(() => {
    const dispose = showModal("send-patient-to-cr-dialog", {
      closeModal: () => dispose(),
      patient,
    });
  }, [patient]);

  return (
    <OverflowMenuItem
      itemText={t("sendPatientToCR", "Send Patient to CR")}
      onClick={launchSendPatientToCRModal}
      style={{
        maxWidth: "100vw",
      }}
    />
  );
};

export default SendPatientToCRActionMenu;
