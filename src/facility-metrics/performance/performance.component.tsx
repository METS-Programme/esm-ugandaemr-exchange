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

const Performance: React.FC = () => {
  return (
    <>
      <div className={styles.chartRowContainer}>
        <div className={styles.chartItem}>
          <span className={styles.boxHeader}> Patients</span>
          <div className={styles.boxItem}>
            <span className={styles.boxFirstItem}>29,206</span>
            <span className={styles.boxSecondItem}>
              92% <CaretUp size={30} />
            </span>
            <span className={styles.boxThirdItem}>vs previous year</span>
          </div>
        </div>
        <div className={styles.chartItem}>
          <span className={styles.boxHeader}> Inpatients </span>
          <div className={styles.boxItem}>
            <span className={styles.boxFirstItem}>11,251</span>
            <span className={styles.boxSecondItem}>
              88% <CaretUp size={30} />
            </span>
            <span className={styles.boxThirdItem}>vs previous year</span>
          </div>
        </div>
        <div className={styles.chartItem}>
          <span className={styles.boxHeader}> Outpatients </span>
          <div className={styles.boxItem}>
            <span className={styles.boxFirstItem}>17,955</span>
            <span className={styles.boxSecondItem}>
              80% <CaretUp size={30} />
            </span>
            <span className={styles.boxThirdItem}>vs previous year</span>
          </div>
        </div>
        <div className={styles.chartItem}>
          <DonutChart data={donutGenderData} options={donutGenderOptions} />
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
            data={donutDepartmentData}
            options={donutDepartmentOptions}
          />
        </div>
      </div>
    </>
  );
};

export default Performance;
