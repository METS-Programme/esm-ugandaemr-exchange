import React from "react";
import Illustration from "./sent-sms-illustration.component";
import { sentSmsHeaders } from "../constants";
import styles from "./sent-sms.scss";
import DataList from "../components/data-table/data-table.component";
import { useTranslation } from "react-i18next";
import Header from "../components/header/header.component";

const SentSmsComponent: React.FC = () => {
    const { t } = useTranslation();
    
const dummySmsData = [
  {
    mobileNumber: "0701234567",
    message: "Test results available at facility.",
    dateSent: "2025-05-29 08:00 AM",
  },
  {
    mobileNumber: "0772345678",
    message: "Your next facility visit is on next Monday 2nd June 2025.",
    dateSent: "2025-05-28 02:30 PM",
  },
  {
    mobileNumber: "0784567890",
    message: "Reminder: Collect your medication today.",
    dateSent: "2025-05-27 10:00 AM",
  },
];

  return (
    <>
    <Header
        illustrationComponent={<Illustration />}
        title={t("sentSmsMessages", `Sent SMS Messages`)}
      />

      <div className={styles.smsContainer}>
        <DataList
                    data={dummySmsData}
                    columns={sentSmsHeaders}
                  />
      </div>
    </>
  );
};

export default SentSmsComponent;
