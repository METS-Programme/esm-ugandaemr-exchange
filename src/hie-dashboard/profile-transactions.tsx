import React from "react";
import {
  Tile,
  DataTable,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Pagination,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@carbon/react";
import styles from "./styles/hie-components.scss";

const headers = [
  { key: "dateOfRequest", header: "Date of Request" },
  { key: "dateOfResponse", header: "Date of Response" },
  { key: "provider", header: "Provider" },
  { key: "source", header: "Source" },
];

const HIEProfileDataTable = ({ tableInfo }) => {
  const defineTableRows = (arr) => {
    console.info(arr);
    if (arr) {
      return arr.map((element, n) => {
        return { ...element, id: `${n}` };
      });
    }
  };

  const tableRows = React.useMemo(
    () => defineTableRows(tableInfo),
    [tableInfo]
  );

  if (tableInfo) {
    return (
      <>
        <DataTable rows={tableRows} headers={headers}>
          {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => {
                    return (
                      <TableHeader
                        {...getHeaderProps({
                          header,
                        })}
                      >
                        {header.header}
                      </TableHeader>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </DataTable>
        {/* to do: adjust when table transactions implemented */}
        <Pagination
          backwardText="Previous page"
          forwardText="Next page"
          itemsPerPageText="Items per page:"
          // onChange={{}}
          page={1}
          pageSize={10}
          pageSizes={[10, 20, 30, 40, 50]}
          size="md"
          totalItems={tableInfo.length}
        />
      </>
    );
  }
};

// eslint-disable-next-line no-empty-pattern
const ProfileTransactionsSection = ({ transactions, activeProfile }) => {
  const { incoming, outgoing } = transactions;
  return (
    <Tabs>
      <TabList
        className={styles.transactionsSection}
        aria-label="List of tabs"
        contained
      >
        <Tab>Incoming</Tab>
        <Tab>Outgoing</Tab>
      </TabList>
      {activeProfile ? (
        <TabPanels>
          <TabPanel>
            {incoming ? (
              incoming.length > 0 ? (
                <HIEProfileDataTable tableInfo={incoming} />
              ) : (
                <Tile className={styles.noTransactionTile} fullWidth>
                  <p>There are no incoming transactions for {activeProfile}</p>
                </Tile>
              )
            ) : (
              <Tile className={styles.noTransactionTile} fullWidth>
                <p>Transaction data coming soon</p>
              </Tile>
            )}
          </TabPanel>
          <TabPanel>
            {outgoing ? (
              outgoing.length > 0 ? (
                <HIEProfileDataTable tableInfo={outgoing} />
              ) : (
                <Tile className={styles.noTransactionTile} fullWidth>
                  <p>There are no outgoing transactions for {activeProfile}</p>
                </Tile>
              )
            ) : (
              <Tile className={styles.noTransactionTile} fullWidth>
                <p>Transaction data coming soon</p>
              </Tile>
            )}
          </TabPanel>
        </TabPanels>
      ) : (
        <Tile className={styles.emptyState} fullWidth>
          <p>Click a profile to view transaction details</p>
        </Tile>
      )}
    </Tabs>
  );
};

export default ProfileTransactionsSection;
