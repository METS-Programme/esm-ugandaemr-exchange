import React from "react";
import Illustration from "./sent-sms-illustration.component";
import { sentSmsHeaders } from "../constants";
import styles from "./sent-sms.scss";
import DataList from "../components/data-table/data-table.component";
import { useTranslation } from "react-i18next";
import Header from "../components/header/header.component";
import { useGetSmsMessages } from "../sync-task-types/sync-task-types.resource";

const SentSmsComponent: React.FC = () => {
  const { t } = useTranslation();

  const { smsSentMessages } = useGetSmsMessages();

  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={t("sentSmsMessages", `Sent SMS Messages`)}
      />

      <div className={styles.smsContainer}>
        <DataList data={smsSentMessages} columns={sentSmsHeaders} />
      </div>
    </>
  );
};

export default SentSmsComponent;
