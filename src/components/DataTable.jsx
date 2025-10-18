import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

export default function DataTable({ data }) {
  if (!data || data.length === 0) return <p>No data found</p>;

  const columns = Object.keys(data[0]);

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col) => (
                <TableCell key={col}>{row[col]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
