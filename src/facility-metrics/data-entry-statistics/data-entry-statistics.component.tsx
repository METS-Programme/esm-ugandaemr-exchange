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
import { getDataEntryStatistics } from "./data-entry-statistics.resource";
import { showNotification, useLayoutType } from "@openmrs/esm-framework";
import EmptyStateIllustration from "./empty-state-illustration.component";
import { LineChart } from "@carbon/charts-react";
import { lineOptions } from "../performance/mock-data";

type EntryTypeData = {
  fullName: string;
  entryType: string;
  numberOfEntries: number;
};

const EntryStatistics: React.FC = () => {
  const { t } = useTranslation();
  const layout = useLayoutType();
  const isTablet = useLayoutType() === "tablet";
  const responsiveSize = isTablet ? "lg" : "sm";
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [encUserColumn, setEncUserColumn] = useState("creator");
  const [groupBy, setGroupBy] = useState("creator");
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [statsChartData, setStatsChartData] = useState([]);
  const [allRows, setAllRows] = useState([]);

  const handleStartDateChange = (selectedDate) => {
    setFromDate(dayjs(selectedDate[0]).format("YYYY-MM-DD"));
  };

  const handleEndDateChange = (selectedDate) => {
    setToDate(dayjs(selectedDate[0]).format("YYYY-MM-DD"));
  };

  const items = [
    {
      id: "option-1",
      text: "Data Entry Assistant",
    },
    {
      id: "option-2",
      text: "Provider",
    },
  ];

  const handleEncounterDropdownChange = (event) => {
    if (event.selectedItem.text === "Data Entry Assistant") {
      setEncUserColumn("creator");
    } else {
      setEncUserColumn(event.selectedItem.text);
    }
  };

  const handleProviderDropdownChange = (event) => {
    if (event.selectedItem.text === "Data Entry Assistant") {
      setGroupBy("creator");
    } else {
      setGroupBy(event.selectedItem.text);
    }
  };

  const handleUpdateReport = useCallback(() => {
    setLoading(true);
    setShowTable(true);

    getDataEntryStatistics({
      fromDate: fromDate,
      toDate: toDate,
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
