import React from "react";
import { DonutChart, LineChart, SimpleBarChart } from "@carbon/charts-react";
import { showModal } from "@openmrs/esm-framework";
import {
  donutDepartmentOptions,
  donutGenderOptions,
  horizontalBarData,
  horizontalBarOptions,
  lineData,
  linePOCOptions,
} from "./mock-data";
import { CaretUp, CheckmarkOutline } from "@carbon/react/icons";
import styles from "./performance.scss";
import { useGetFacilityMetrics } from "./performance.resource";
import EntryStatistics from "../data-entry-statistics/data-entry-statistics.component";

const Performance: React.FC = () => {
  const { isLoading, facilityMetrics } = useGetFacilityMetrics();
  const showSystemTools = () => {
    const dispose = showModal("tools-modal", {
      close: () => dispose(),
    });
  };

  const showHMISReports = () => {
    const dispose = showModal("hmis-modal", {
      close: () => dispose(),
    });
  };

  const showPEPFARReports = () => {
    const dispose = showModal("pepfar-modal", {
      close: () => dispose(),
    });
  };
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
                <td className={styles.emrInfoHeader}>Version:</td>{" "}
                <td className={styles.boxThirdItem}>
                  4.0.0-SNAPSHOT <CheckmarkOutline size={15} />
                </td>
              </tr>
              <tr>
                <td className={styles.emrInfoHeader}>Tools:</td>{" "}
                <td className={styles.boxThirdItem}>
                  <span onClick={showSystemTools} role="button" tabIndex={0}>
                    8
                  </span>
                </td>
              </tr>
              <tr>
                <td className={styles.emrInfoHeader}>Reports:</td>{" "}
                <td className={styles.boxThirdItem}>
                  HMIS -{" "}
                  <span onClick={showHMISReports} role="button" tabIndex={0}>
                    5
                  </span>
                </td>
              </tr>
              <tr>
                <td></td>{" "}
                <td className={styles.boxThirdItem}>
                  PEPFAR -{" "}
                  <span onClick={showPEPFARReports} role="button" tabIndex={0}>
                    2
                  </span>
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
          <LineChart data={lineData} options={linePOCOptions} />
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
