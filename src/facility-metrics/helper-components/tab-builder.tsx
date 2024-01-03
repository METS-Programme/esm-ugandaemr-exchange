import React, { JSX } from "react";

import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import { useTranslation } from "react-i18next";
import HIEDashboard from "../hie-metrics/hie-dashboard.component";
import styles from "./tab-builder.scss";
import FacilityPerformance from "../performance/performance.component";
import UserDashboard from "../user-dashboard/user-dashboard.component";
import ChatbotModal from "../../components/workspace/chatbot/chat-bot.component";

interface TabItem {
  name: string;
  component?: JSX.Element;
}

const TabBuilder: React.FC = () => {
  const { t } = useTranslation();
  const tabs: TabItem[] = [
    {
      name: t("hie", "HIE Metrics"),
      component: <HIEDashboard />,
    },
    {
      name: t("performanceMetrics", "Performance Metrics"),
      component: <FacilityPerformance />,
    },
    {
      name: t("userDashboard", "User Dashboard"),
      component: <UserDashboard />,
    },
  ];

  return (
    <div className={styles.tabBuilder}>
      <div className={styles.tabContainer}>
        <Tabs>
          <TabList aria-label="navigation">
            {tabs.map((tab: TabItem, index: number) => (
              <Tab key={index}>{tab.name}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabs.map((tab: TabItem, index: number) => (
              <TabPanel key={index}>{tab?.component}</TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default TabBuilder;
