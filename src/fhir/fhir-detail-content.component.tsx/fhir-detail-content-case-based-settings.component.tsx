import React from "react";
import {
  DataTable,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";

const CaseBasedSettings = ({ fhirProfiles }) => {
  const tableHeaders = [
    { key: "url", header: "URL" },
    {
      key: "numberOfResourcesInBundle",
      header: "Number of Resources in Bundle",
    },
    { key: "urlUserName", header: "User Name" },
    { key: "urlToken", header: "Token" },
  ];

  const tableRows = fhirProfiles.map((profile, index) => ({
    id: `${index}`,
    url: profile.url,
    numberOfResourcesInBundle: profile.numberOfResourcesInBundle,
    urlUserName: profile.urlUserName,
    urlToken: profile.urlToken,
  }));

  return (
    <DataTable rows={tableRows} headers={tableHeaders} useZebraStyles>
      {({ rows, headers, getHeaderProps, getTableProps, getRowProps }) => (
        <TableContainer>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header?.content ?? header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })} key={row.id}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
};

export default CaseBasedSettings;
