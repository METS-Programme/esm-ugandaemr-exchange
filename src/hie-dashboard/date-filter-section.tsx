import React, { useEffect, useState } from "react";
import {
  DatePicker,
  DatePickerInput,
  RadioButtonGroup,
  RadioButton,
} from "@carbon/react";
import dayjs from "dayjs";
import { formatDate } from "@openmrs/esm-framework";
import styles from "./styles/hie-components.scss";

const DateFilterInput = (props) => {
  const { setStartDate, setEndDate } = props;
  return (
    <DatePicker
      datePickerType="range"
      className={styles.datePicker}
      aria-label="Date Range Filter"
      onChange={(event) => {
        if (event.length === 1) {
          setStartDate(event[0]);
        } else if (event.length === 2) {
          setStartDate(event[0]);
          setEndDate(event[1]);
        }
      }}
    >
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Start date"
        size="sm"
      />
      <DatePickerInput
        id="date-picker-input-id-end"
        placeholder="mm/dd/yyyy"
        labelText="End date"
        size="sm"
      />
    </DatePicker>
  );
};

export const DateFilterSection = (props) => {
  const { startDate, endDate, setStartDate, setEndDate } = props;
  const [dateRangeSelection, setDateRangeSelection] = useState("today");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const formattedStartDate = formatDate(startDate, {
    time: false,
    noToday: true,
  });
  const formattedEndDate = formatDate(endDate, {
    time: false,
    noToday: true,
  });
  const dateRange =
    dayjs(startDate).diff(dayjs(endDate)) === 0
      ? `${formattedStartDate}`
      : `${formattedStartDate} to ${formattedEndDate}`;

  useEffect(() => {
    if (dateRangeSelection === "today") {
      setShowDateFilter(false);
    } else if (dateRangeSelection === "custom range") {
      setShowDateFilter(true);
    }
  }, [dateRangeSelection]);

  useEffect(() => {
    if (dateRangeSelection === "today") {
      setStartDate(new Date());
      setEndDate(new Date());
    }
  }, [dateRangeSelection, setEndDate, setStartDate]);
  return (
    <>
      <div className={styles.dateFilterSection}>
        <p className={styles.selectedPeriod}>
          Profile information for {dateRange}
        </p>
        <div className={styles.dateRangeSelector}>
          <RadioButtonGroup
            legendText=""
            name="radio-button-group"
            defaultSelected="today"
            onChange={(value) => setDateRangeSelection(value)}
            hideLabel={true}
          >
            <RadioButton
              labelText="Today"
              value="today"
              id="date-selection-today"
            />
            <RadioButton
              labelText="Custom Range"
              value="custom range"
              id="date-selection-custom-range"
            />
          </RadioButtonGroup>
        </div>
      </div>
      {showDateFilter ? (
        <DateFilterInput
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
        />
      ) : (
        ""
      )}
    </>
  );
};
