import {
  DataTable,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Tile,
} from "@carbon/react";
import {
  isDesktop,
  useLayoutType,
  usePagination,
} from "@openmrs/esm-framework";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./sync-task-logs.scss";
import { DatePickerInput } from "@carbon/react";
import { DatePicker } from "@carbon/react";
import SyncTaskTypesFilter from "./sync-task-type-filter/sync-task-type-filter.component";
import { Button } from "@carbon/react";
import { Add, PartitionAuto } from "@carbon/react/icons";

type FilterProps = {
  rowIds: Array<string>;
  headers: any;
  cellsById: any;
  inputValue: string;
  getCellId: (row, key) => string;
};

interface ListProps {
  columns: any;
  data: any;
}

const SyncTaskLogsList: React.FC<ListProps> = ({ columns, data }) => {
  const { t } = useTranslation();
  const layout = useLayoutType();
  const isTablet = useLayoutType() === "tablet";
  const responsiveSize = isTablet ? "lg" : "sm";
  const [allRows, setAllRows] = useState([]);
  const pageSizes = [10, 20, 30, 40, 50];
  const [currentPageSize, setPageSize] = useState(10);
  const {
    goTo,
    results: paginatedList,
    currentPage,
  } = usePagination(data, currentPageSize);

  const [selectedSyncType, setselectedSyncType] = useState("");

  const [tempSyncType, setTempSyncType] = useState("");
  const [tempFromDate, setTempFromDate] = useState(null);
  const [tempToDate, setTempToDate] = useState(null);

  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);

  const handleFilterChange = (selectedSyncType: string) => {
    setselectedSyncType(selectedSyncType);
  };

  const handleInputChange = ([from, to]) => {
    setTempFromDate(from);
    setTempToDate(to);
  };

  const handleSyncTypeChange = (type: string) => {
    setTempSyncType(type);
  };

  const handleApplyFilters = () => {
    setselectedSyncType(tempSyncType);
    setSelectedFromDate(tempFromDate);
    setSelectedToDate(tempToDate);
  };

  const handleFilter = ({
    rowIds,
    headers,
    cellsById,
    inputValue,
    getCellId,
  }: FilterProps): Array<string> => {
    const filterTerm = inputValue.toLowerCase();

    return rowIds.filter((rowId) => {
      const nameHeader = headers.find((header) => header.key === "name");
      if (!nameHeader) {
        return true;
      }

      const cellId = getCellId(rowId, nameHeader.key);
      const nameValue = cellsById[cellId].value;

      if (typeof nameValue === "boolean") {
        return false;
      }

      return ("" + nameValue).toLowerCase().includes(filterTerm);
    });
  };

  useEffect(() => {
    const rows: Array<Record<string, string>> = [];

    paginatedList.forEach((item: any, index) => {
      const name = item.syncTaskType?.name ?? "";

      const sentDate = new Date(item.dateSent);

      const matchesSyncType = !selectedSyncType || name === selectedSyncType;

      const matchesDateRange =
        (!selectedFromDate || sentDate >= selectedFromDate) &&
        (!selectedToDate ||
          sentDate <=
            new Date(
              selectedToDate.getFullYear(),
              selectedToDate.getMonth(),
              selectedToDate.getDate(),
              23,
              59,
              59,
              999
            ));

      if (matchesSyncType && matchesDateRange) {
        rows.push({
          ...item,
          id: index,
          name,
          requireAction: item.requireAction ? "True" : "False",
          actionCompleted: item.actionCompleted ? "True" : "False",
        });
      }
    });

    setAllRows(rows);
  }, [paginatedList, selectedSyncType, selectedFromDate, selectedToDate]);

  return (
    <DataTable
      data-floating-menu-container
      rows={allRows}
      headers={columns}
      filterRows={handleFilter}
      overflowMenuOnHover={isDesktop(layout)}
      size={isTablet ? "lg" : "sm"}
      useZebraStyles
    >
      {({ rows, headers, getHeaderProps, getTableProps }) => (
        <TableContainer className={styles.tableContainer}>
          <TableToolbar size={responsiveSize}>
            <TableToolbarContent className={styles.toolbarContent}>
              <div className={styles.container}>
                <SyncTaskTypesFilter onFilterChange={handleSyncTypeChange} />
                <div className={styles.datePicker}>
                  <DatePicker
                    datePickerType="range"
                    aria-label="Date Range Filter"
                    onChange={handleInputChange}
                    value={[tempFromDate, tempToDate]}
                    dateFormat="d/m/Y"
                  >
                    <DatePickerInput
                      id="date-picker-input-id-start"
                      placeholder="dd/mm/yyyy"
                      labelText="Start date"
                      size="sm"
                    />
                    <DatePickerInput
                      id="date-picker-input-id-end"
                      placeholder="dd/mm/yyyy"
                      labelText="End date"
                      size="sm"
                    />
                  </DatePicker>
                </div>
                <Button
                  kind="tertiary"
                  renderIcon={PartitionAuto}
                  onClick={handleApplyFilters}
                >
                  <span>Search</span>
                </Button>
              </div>
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {rows.length === 0 ? (
            <div className={styles.tileContainer}>
              <Tile className={styles.tile}>
                <div className={styles.tileContent}>
                  <p className={styles.content}>
                    {t(
                      "noSyncTaskTypesToDisplay",
                      "No sync task types to display"
                    )}
                  </p>
                  <p className={styles.helper}>
                    {t("checkFilter", "Check the filter above")}
                  </p>
                </div>
              </Tile>
            </div>
          ) : null}
          <Pagination
            forwardText="Next page"
            backwardText="Previous page"
            page={currentPage}
            pageSize={currentPageSize}
            pageSizes={pageSizes}
            totalItems={data?.length}
            className={styles.pagination}
            onChange={({ pageSize, page }) => {
              if (pageSize !== currentPageSize) {
                setPageSize(pageSize);
              }
              if (page !== currentPage) {
                goTo(page);
              }
            }}
          />
        </TableContainer>
      )}
    </DataTable>
  );
};

export default SyncTaskLogsList;
