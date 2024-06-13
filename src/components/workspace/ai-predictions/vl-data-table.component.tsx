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
  Tile,
} from "@carbon/react";
import {
  isDesktop,
  useLayoutType,
  usePagination,
} from "@openmrs/esm-framework";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./vl-data-table.scss";

type FilterProps = {
  rowIds: Array<string>;
  headers: any;
  cellsById: any;
  inputValue: string;
  getCellId: (row, key) => string;
};

const PatientList: React.FC = () => {
  const { t } = useTranslation();
  const layout = useLayoutType();
  const [allRows, setAllRows] = useState([]);
  const isTablet = useLayoutType() === "tablet";
  const [patients, setPatients] = useState([
    {
      artStartDate: "15 Aug 2014",
      currentArtRegimen: "TDF-3TC-DTG",
      currentRegimenInitiationDate: "10 OCT 2018",
      lastDispenseDate: "21 Oct 2020",
      lastDispenseAmount: 180,
      IITlast12months: 2,
      IITCummulative: 5,
      durationOfLastIIT: 82,
      daysSinceLastIIT: 0,
      lastVLDate: "3 May 2020",
      lastVLResult: 200,
    },
  ]);
  const pageSizes = [10, 20, 30, 40, 50];
  const [currentPageSize, setPageSize] = useState(10);
  const {
    goTo,
    results: paginatedPatientEntries,
    currentPage,
  } = usePagination(patients, currentPageSize);

  const tableHeaders = [
    {
      id: 0,
      key: "artStartDate",
      header: t("artStartDate", "ART Start Date"),
    },
    {
      id: 1,
      key: "currentArtRegimen",
      header: t("currentArtRegimen", "Current ART Regimen"),
    },
    {
      id: 2,
      key: "currentRegimenInitiationDate",
      header: t(
        "currentRegimenInitiationDate",
        "Current Regimen Initiation Date"
      ),
    },
    {
      id: 3,
      key: "lastDispenseDate",
      header: t("lastDispenseDate", "Last Dispense Date"),
    },
    {
      id: 4,
      key: "lastDispenseAmount",
      header: t("lastDispenseAmount", "Last Dispense Amount"),
    },
    {
      id: 5,
      key: "IITlast12months",
      header: t("IITlast12months", "# IIT last 12 months"),
    },
    {
      id: 6,
      key: "IITCummulative",
      header: t("IITCummulative", "# IIT Cummulative"),
    },
    {
      id: 7,
      key: "durationOfLastIIT",
      header: t("durationOfLastIIT", "Duration of Last IIT"),
    },
    {
      id: 8,
      key: "lastVLDate",
      header: t("lastVLDate", "Last VL Date"),
    },
    {
      id: 9,
      key: "daysSinceLastIIT",
      header: t("daysSinceLastIIT", "Days since Last IIT"),
    },
    {
      id: 10,
      key: "lastVLResult",
      header: t("lastVLResult", "Last VL Result"),
    },
  ];

  useEffect(() => {
    const rows = [];

    paginatedPatientEntries.map((facility) => {
      return rows.push({
        artStartDate: facility.artStartDate,
        currentArtRegimen: facility.currentArtRegimen,
        currentRegimenInitiationDate: facility.currentRegimenInitiationDate,
        lastDispenseDate: facility.lastDispenseDate,
        lastDispenseAmount: facility.lastDispenseAmount,
        IITlast12months: facility.IITlast12months,
        IITCummulative: facility.IITCummulative,
        durationOfLastIIT: facility.durationOfLastIIT,
        daysSinceLastIIT: facility.daysSinceLastIIT,
        lastVLDate: facility.lastVLDate,
        lastVLResult: facility.lastVLResult,
      });
    });
    setAllRows(rows);
  }, [paginatedPatientEntries, allRows]);

  const handleFilter = ({
    rowIds,
    headers,
    cellsById,
    inputValue,
    getCellId,
  }: FilterProps): Array<string> => {
    return rowIds.filter((rowId) =>
      headers.some(({ key }) => {
        const cellId = getCellId(rowId, key);
        const filterableValue = cellsById[cellId].value;
        const filterTerm = inputValue.toLowerCase();

        if (typeof filterableValue === "boolean") {
          return false;
        }

        return ("" + filterableValue).toLowerCase().includes(filterTerm);
      })
    );
  };

  const transformedRows = tableHeaders.map((header) => {
    return {
      id: header.key,
      field: header.header,
      value: patients[0][header.key], // Assuming only one patient for now
    };
  });

  return (
    <>
      <DataTable
        data-floating-menu-container
        rows={allRows}
        headers={tableHeaders}
        filterRows={handleFilter}
        overflowMenuOnHover={isDesktop(layout) ? true : false}
        size={isTablet ? "lg" : "sm"}
        useZebraStyles
      >
        {({ rows, headers, getHeaderProps, getTableProps }) => (
          <div>
            <TableContainer className={styles.tableContainer}>
              <TableToolbar
                style={{
                  position: "static",
                  height: "3rem",
                  overflow: "visible",
                  backgroundColor: "color",
                }}
              ></TableToolbar>
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
                  {rows.map((row, index) => (
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
                        {t("No data", "No data to display")}
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
                totalItems={patients?.length}
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
          </div>
        )}
      </DataTable>
    </>
  );
};

export default PatientList;
