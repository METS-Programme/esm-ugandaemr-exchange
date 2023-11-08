import React from "react";
import {
  DonutChart,
  SimpleBarChart,
  StackedBarChart,
} from "@carbon/charts-react";
import {
  donutDepartmentData,
  donutDepartmentOptions,
  donutGenderData,
  donutGenderOptions,
  horizontalBarData,
  horizontalBarOptions,
  stackedBarData,
  stackedBarOptions,
} from "./mock-data";
import { CaretUp } from "@carbon/react/icons";
import styles from "./performance.scss";
import { useGetFacilityMetrics } from "./performance.resource";

const Performance: React.FC = () => {
  const { isLoading, facilityMetrics } = useGetFacilityMetrics();

  return (
    <>
      <div className={styles.chartRowContainer}>
        <div className={styles.chartItem}>
          <span className={styles.boxHeader}> Patients</span>
          <div className={styles.boxItem}>
            <span className={styles.boxFirstItem}>
              {facilityMetrics?.totalPatients}
            </span>
            <span className={styles.boxSecondItem}>
              82% <CaretUp size={30} />
            </span>
            <span className={styles.boxThirdItem}>vs previous year</span>
          </div>
        </div>
        <div className={styles.chartItem}>
          <span className={styles.boxHeader}> Inpatients </span>
          <div className={styles.boxItem}>
            <span className={styles.boxFirstItem}>10</span>
            <span className={styles.boxSecondItem}>
              88% <CaretUp size={30} />
            </span>
            <span className={styles.boxThirdItem}>vs previous year</span>
          </div>
        </div>
        <div className={styles.chartItem}>
          <span className={styles.boxHeader}> Outpatients </span>
          <div className={styles.boxItem}>
            <span className={styles.boxFirstItem}>
              {facilityMetrics?.totalPatients - 10}
            </span>
            <span className={styles.boxSecondItem}>
              80% <CaretUp size={30} />
            </span>
            <span className={styles.boxThirdItem}>vs previous year</span>
          </div>
        </div>
        <div className={styles.chartItem}>
          <DonutChart
            data={isLoading ? [] : facilityMetrics?.gender}
            options={donutGenderOptions}
          />
        </div>
      </div>

      <div className={styles.chartRowContainer}>
        <div className={styles.chartItemStacked}>
          <StackedBarChart data={stackedBarData} options={stackedBarOptions} />
        </div>
        <div className={styles.chartItem}>
          <SimpleBarChart
            data={horizontalBarData}
            options={horizontalBarOptions}
          />
        </div>
        <div className={styles.chartItem}>
          <DonutChart
            data={isLoading ? [] : facilityMetrics?.nationality}
            options={donutDepartmentOptions}
          />
        </div>
      </div>
    </>
  );
};

export default Performance;
