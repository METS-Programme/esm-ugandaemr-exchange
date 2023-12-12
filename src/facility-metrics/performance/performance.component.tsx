import React from "react";
import {
  DonutChart,
  SimpleBarChart,
  StackedBarChart,
} from "@carbon/charts-react";
import {
  donutDepartmentOptions,
  donutGenderOptions,
  horizontalBarData,
  horizontalBarOptions,
  stackedBarData,
  stackedBarOptions,
} from "./mock-data";
import { CaretUp } from "@carbon/react/icons";
import styles from "./performance.scss";
import { useGetFacilityMetrics } from "./performance.resource";
import EntryStatistics from "../data-entry-statistics/data-entry-statistics.component";

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
          <span className={styles.boxHeader}> UgandaEMR </span>
          <div className={styles.emrInfo}>
            <table>
              <tr>
                <td>Version:</td>{" "}
                <td>
                  4.0.0-SNAPSHOT <CaretUp size={30} />
                </td>
              </tr>
              <tr>
                <td>Tools:</td> <td> 4</td>
              </tr>
              <tr>
                <td>Reports:</td> <td>HMIS - <span>5</span></td>
              </tr>
              <tr>
                <td></td>{" "}
                <td>
                  PEPFAR - <span>2</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className={styles.chartItem}>
          <DonutChart
            data={isLoading ? [] : facilityMetrics?.gender}
            options={donutGenderOptions}
          />
        </div>
        <div className={styles.chartItem}>
          <DonutChart
            data={isLoading ? [] : facilityMetrics?.nationality}
            options={donutDepartmentOptions}
          />
        </div>
      </div>

      <div className={styles.chartRowContainer}>
        <div className={styles.chartItemStacked}>
          <StackedBarChart data={stackedBarData} options={stackedBarOptions} />
        </div>
        <div className={styles.chartItemStacked}>
          <SimpleBarChart
            data={horizontalBarData}
            options={horizontalBarOptions}
          />
        </div>
      </div>

      <div className={styles.statsContainer}>
        <EntryStatistics />
      </div>
    </>
  );
};

export default Performance;
