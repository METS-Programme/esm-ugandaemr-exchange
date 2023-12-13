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

const EntryStatistics: React.FC = () => {
  const { t } = useTranslation();
  const layout = useLayoutType();
  const isTablet = useLayoutType() === "tablet";
  const responsiveSize = isTablet ? "lg" : "sm";
  const [fromDate, setFromDate] = useState(new Date("2023-09-01"));
  const [toDate, setToDate] = useState(new Date(new Date("2023-12-13")));
  const [encUserColumn, setEncUserColumn] = useState("creator");
  const [groupBy, setGroupBy] = useState("creator");
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [statsChartData, setStatsChartData] = useState([]);
  const [willUpdateStatistics, setWillUpdateStatistics] = useState(true);

  const handleStartDateChange = (selectedDate) => {
    setFromDate(selectedDate[0]);
  };

  const handleEndDateChange = (selectedDate) => {
    setToDate(selectedDate[0]);
  };

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

  const { isLoading, encounterData } = useGetDataEntryStatistics({
    fromDate: dayjs(fromDate).format("YYYY-MM-DD"),
    toDate: dayjs(toDate).format("YYYY-MM-DD"),
    encUserColumn: encUserColumn,
    groupBy: groupBy,
  });

  if (!isLoading) {
    if (willUpdateStatistics) {
      const dataEntrydata = [];
      (encounterData as EncounterEntry[]).forEach((entry) => {
        dataEntrydata.push({
          group: entry.entryType,
          key: entry.fullName,
          value: entry.numberOfEntries,
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
      <div className={styles.dataEntryContainer}>
        <div className={styles.datePickerContainer}>
          <DatePicker datePickerType="single" onChange={handleStartDateChange}>
            <DatePickerInput
              id="date-picker-input-start"
              placeholder="mm/dd/yyyy"
              labelText="Start date"
              size="md"
            />
          </DatePicker>
        </div>
        <div className={styles.datePickerContainer}>
          <DatePicker datePickerType="single" onChange={handleEndDateChange}>
            <DatePickerInput
              id="date-picker-input-finish"
              placeholder="mm/dd/yyyy"
              labelText="End date"
              size="md"
            />
          </DatePicker>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            size="sm"
            kind="primary"
            onClick={handleUpdateReport}
            className={styles.actionButton}
          >
            <Intersect />
            <span>View</span>
          </Button>
        </div>
      </div>
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
