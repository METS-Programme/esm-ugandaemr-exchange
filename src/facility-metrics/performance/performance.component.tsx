import React, { useCallback, useEffect, useState } from "react";
import {
  DonutChart,
  PieChart,
  SimpleBarChart,
  StackedBarChart,
} from "@carbon/charts-react";
import {
  showModal,
  showNotification,
  useSession,
} from "@openmrs/esm-framework";
import {
  dataEntryStatsOptions,
  donutGenderOptions,
  healthWorkersDisaggregationOptions,
  pieChartOptions,
  StackedBarPOCOptions,
} from "./mock-data";
import { CaretUp, CheckmarkOutline } from "@carbon/react/icons";
import styles from "./performance.scss";
import {
  formatPOCData,
  getPOCDataStatistics,
  useGetFacilityMetrics,
  useParentLocation,
  useServicePointCount,
} from "./performance.resource";
import { DateFilterInput } from "../helper-components/date-filter-section";
import {
  formatReults,
  formatStatsData,
  getDataEntryStatistics,
  useGetDataEntryStatistics,
} from "../data-entry-statistics/data-entry-statistics.resource";
import dayjs from "dayjs";

const Performance: React.FC = () => {
  const { isLoading, facilityMetrics } = useGetFacilityMetrics();
  const [encUserColumn] = useState("creator");
  const [groupBy] = useState("creator");
  const [hasUpdatedData, setHasUpdatedData] = useState(false);
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
  const session = useSession();
  const { location } = useParentLocation(session?.sessionLocation?.uuid);
  const { isLoadingPOCSats, stats } = useServicePointCount(
    location?.parentLocation?.uuid,
    dayjs(startOfWeek).format("YYYY-MM-DD"),
    dayjs(endOfWeek).format("YYYY-MM-DD")
  );
  const [contractCategoryArray, setContractCategoryArray] = useState([]);
  const [providersArray, setProvidersArray] = useState([]);
  const [pOCDataStats, setPOCDataStats] = useState([]);
  const [hasUpdatedPOCStats, setHasUpdatedPOCStats] = useState(false);

  useEffect(() => {
    if (!isLoadingStats) {
      if (!hasUpdatedData) {
        formatStatsData(Object.values(encounterData)).then((res) => {
          setContractCategoryArray(res.contractCategory);
          setProvidersArray(res.providers);
        });
        setHasUpdatedData(true);
      }
    }

    if (!isLoadingPOCSats) {
      if (!hasUpdatedPOCStats && stats?.length > 0) {
        setPOCDataStats(stats);
        setHasUpdatedPOCStats(true);
      }
    }
  }, [
    encounterData,
    hasUpdatedData,
    hasUpdatedPOCStats,
    isLoadingPOCSats,
    isLoadingStats,
    stats,
  ]);

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
    getDataEntryStatistics({
      fromDate: dayjs(dateArray[0]).format("YYYY-MM-DD"),
      toDate: dayjs(dateArray[1]).format("YYYY-MM-DD"),
      encUserColumn: encUserColumn,
      groupBy: groupBy,
    }).then(
      (response) => {
        if (response.status === 200) {
          if (response?.data) {
            const statsData = Object.values(formatReults(response?.data));
            formatStatsData(statsData).then((res) => {
              setContractCategoryArray(res.contractCategory);
              setProvidersArray(res.providers);
            });
          }
        }
      },
      (error) => {
        showNotification({
          title: "Generating Data Entry Statistics Failed",
          kind: "error",
          critical: true,
          description: error?.message,
        });
      }
    );

    getPOCDataStatistics(
      location?.parentLocation?.uuid,
      dayjs(dateArray[0]).format("YYYY-MM-DD"),
      dayjs(dateArray[1]).format("YYYY-MM-DD")
    ).then(
      (response) => {
        if (response.status === 200) {
          if (response?.data) {
            setPOCDataStats(formatPOCData(response?.data?.results));
          }
        }
      },
      (error) => {
        showNotification({
          title: "Generating POC Statistics Failed",
          kind: "error",
          critical: true,
          description: error?.message,
        });
      }
    );
  }, [dateArray, encUserColumn, groupBy, location?.parentLocation?.uuid]);

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
          <PieChart
            data={isLoading ? [] : facilityMetrics?.nationality}
            options={pieChartOptions}
          />
        </div>
      </div>

      <div className={styles.chartRowContainer}>
        <div className={styles.chartItem}>
          <PieChart
            data={contractCategoryArray}
            options={healthWorkersDisaggregationOptions}
          />
        </div>
        <div className={styles.chartItemStats}>
          <StackedBarChart data={pOCDataStats} options={StackedBarPOCOptions} />
        </div>
      </div>

      <div className={styles.statsContainer}>
        <SimpleBarChart data={providersArray} options={dataEntryStatsOptions} />
      </div>
    </>
  );
};

export default Performance;
