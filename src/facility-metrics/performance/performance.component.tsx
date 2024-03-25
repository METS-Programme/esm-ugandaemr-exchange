import React, { useCallback, useState } from "react";
import {
  DonutChart,
  LineChart,
  SimpleBarChart,
  StackedBarChart,
} from "@carbon/charts-react";
import { showModal, showNotification } from "@openmrs/esm-framework";
import {
  donutDepartmentOptions,
  donutGenderOptions,
  horizontalBarData,
  horizontalBarOptions,
  lineOptions,
  StackedBarData,
  StackedBarPOCOptions,
} from "./mock-data";
import { CaretUp, CheckmarkOutline } from "@carbon/react/icons";
import styles from "./performance.scss";
import { useGetFacilityMetrics } from "./performance.resource";
import { DateFilterInput } from "../helper-components/date-filter-section";
import { DataTableSkeleton } from "@carbon/react";
import {
  formatReults,
  getDataEntryStatistics,
  useGetDataEntryStatistics,
} from "../data-entry-statistics/data-entry-statistics.resource";
import dayjs from "dayjs";

const Performance: React.FC = () => {
  const { isLoading, facilityMetrics } = useGetFacilityMetrics();
  const [encUserColumn] = useState("creator");
  const [groupBy] = useState("creator");
  const [statsChartData, setStatsChartData] = useState([]);
  const [hasUpdatedData, setHasUpdatedData] = useState(false);
  const [isUpdatingMetrics, setIsUpdatingMetrics] = useState(false);
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  const endOfWeek = new Date(currentDate);
  endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));
  const [dateArray, setDateArray] = useState([startOfWeek, endOfWeek]);
  const { isLoadingStats, encounterData } = useGetDataEntryStatistics({
    fromDate: dayjs(startOfWeek).format("YYYY-MM-DD"),
    toDate: dayjs(endOfWeek).format("YYYY-MM-DD"),
    encUserColumn: encUserColumn,
    groupBy: groupBy,
  });

  if (!isLoadingStats) {
    if (!hasUpdatedData) {
      setStatsChartData(Object.values(encounterData));
      setHasUpdatedData(true);
    }
  }

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

  const handleOnChangeRange = (dates: Array<Date>) => {
    setDateArray(dates);
  };

  const updatePerformanceMetrics = useCallback(() => {
    setIsUpdatingMetrics(true);

    getDataEntryStatistics({
      fromDate: dayjs(dateArray[0]).format("YYYY-MM-DD"),
      toDate: dayjs(dateArray[1]).format("YYYY-MM-DD"),
      encUserColumn: encUserColumn,
      groupBy: groupBy,
    }).then(
      (response) => {
        if (response.status === 200) {
          if (response?.data) {
            const statsData = formatReults(response?.data);
            setStatsChartData(Object.values(statsData));
          }
        }
        setIsUpdatingMetrics(false);
      },
      (error) => {
        showNotification({
          title: "Generating Statistics Failed",
          kind: "error",
          critical: true,
          description: error?.message,
        });
      }
    );
  }, [encUserColumn, dateArray, groupBy]);

  return (
    <>
      <DateFilterInput
        handleOnChangeRange={handleOnChangeRange}
        updateTransactions={updatePerformanceMetrics}
        dateValue={dateArray}
      />

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
              <tbody>
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
                      2
                    </span>
                  </td>
                </tr>
                <tr>
                  <td></td>{" "}
                  <td className={styles.boxThirdItem}>
                    PEPFAR -{" "}
                    <span
                      onClick={showPEPFARReports}
                      role="button"
                      tabIndex={0}
                    >
                      7
                    </span>
                  </td>
                </tr>
              </tbody>
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
          <StackedBarChart
            data={StackedBarData}
            options={StackedBarPOCOptions}
          />
        </div>
        <div className={styles.chartItemStacked}>
          <SimpleBarChart
            data={horizontalBarData}
            options={horizontalBarOptions}
          />
        </div>
      </div>

      <div className={styles.statsContainer}>
        {isLoadingStats || isUpdatingMetrics ? (
          <DataTableSkeleton role="progressbar" />
        ) : (
          <LineChart data={statsChartData} options={lineOptions} />
        )}
      </div>
    </>
  );
};

export default Performance;
