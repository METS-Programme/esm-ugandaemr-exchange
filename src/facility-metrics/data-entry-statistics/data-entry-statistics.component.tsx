import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  DatePicker,
  DatePickerInput,
  DataTableSkeleton,
  Layer,
  Tile,
} from "@carbon/react";
import styles from "./data-entry-statistics-tile.scss";
import { Intersect } from "@carbon/react/icons";
import { useTranslation } from "react-i18next";
import {
  getDataEntryStatistics,
  useGetDataEntryStatistics,
} from "./data-entry-statistics.resource";
import { showNotification, useLayoutType } from "@openmrs/esm-framework";
import EmptyStateIllustration from "./empty-state-illustration.component";
import { LineChart } from "@carbon/charts-react";
import { lineOptions } from "../performance/mock-data";
import { fetchTransactionCount } from "../facility-metrics.resource";

type EntryTypeData = {
  fullName: string;
  entryType: string;
  numberOfEntries: number;
};

interface EncounterEntry {
  entryType: string;
  fullName: string;
  numberOfEntries: number;
}

interface ComponentProps {
  startDate: Date;
  endDate: Date;
}

const EntryStatistics: React.FC<ComponentProps> = ({ startDate, endDate }) => {
  const { t } = useTranslation();
  const layout = useLayoutType();
  const isTablet = useLayoutType() === "tablet";
  const responsiveSize = isTablet ? "lg" : "sm";
  const [fromDate, setFromDate] = useState(startDate);
  const [toDate, setToDate] = useState(endDate);
  const [encUserColumn, setEncUserColumn] = useState("creator");
  const [groupBy, setGroupBy] = useState("creator");
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [statsChartData, setStatsChartData] = useState([]);
  const [willUpdateStatistics, setWillUpdateStatistics] = useState(true);

  // const handleStartDateChange = (selectedDate) => {
  //   setFromDate(selectedDate[0]);
  // };
  //
  // const handleEndDateChange = (selectedDate) => {
  //   setToDate(selectedDate[0]);
  // };

  const handleUpdateReport = useCallback(() => {
    setLoading(true);
    setShowTable(true);

    getDataEntryStatistics({
      fromDate: dayjs(fromDate).format("YYYY-MM-DD"),
      toDate: dayjs(toDate).format("YYYY-MM-DD"),
      encUserColumn: encUserColumn,
      groupBy: groupBy,
    }).then(
      (response) => {
        console.info(response);
        if (response.status === 200) {
          if (response?.data) {
            const dataEntrydata = [];

            response?.data.forEach((entry) => {
              dataEntrydata.push({
                group: entry.entryType,
                key: entry.fullName,
                value: entry.numberOfEntries,
              });
            });

            setStatsChartData(Object.values(dataEntrydata));
          } else {
            setShowTable(false);
          }
          setLoading(false);
        }
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
  }, [encUserColumn, fromDate, groupBy, toDate]);

  const { isLoadingStats, encounterData } = useGetDataEntryStatistics({
    fromDate: dayjs(fromDate).format("YYYY-MM-DD"),
    toDate: dayjs(toDate).format("YYYY-MM-DD"),
    encUserColumn: encUserColumn,
    groupBy: groupBy,
  });

  if (!isLoadingStats) {
    if (willUpdateStatistics) {
      const dataEntrydata = [];
      encounterData.forEach((entry) => {
        dataEntrydata.push({
          group: entry.group,
          key: entry.key,
          value: entry.value,
        });
      });
      setShowTable(true);
      setStatsChartData(Object.values(dataEntrydata));
      setWillUpdateStatistics(false);
      setLoading(false);
    }
  }

  return (
    <>
      {showTable ? (
        <>
          {loading && <DataTableSkeleton role="progressbar" />}
          {!loading && (
            <div className={styles.dataChartContainer}>
              <LineChart data={statsChartData} options={lineOptions} />
            </div>
          )}
        </>
      ) : (
        <Layer className={styles.layerTable}>
          <Tile className={styles.tileTable}>
            <EmptyStateIllustration />
            <p className={styles.contentTable}>No data to display</p>
            <p className={styles.explainerTable}>
              Use the data entry statistics filters above to view statistics
            </p>
          </Tile>
        </Layer>
      )}
    </>
  );
};

export default EntryStatistics;
