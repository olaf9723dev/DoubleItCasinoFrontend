// @mui
import {
  Card,
  Stack,
  Table,
  Avatar,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TableContainer
} from '@mui/material';
// utils
import moment from 'moment';
import 'moment-timezone';

// components
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

import { TableProps, GameHistoryType } from './types';
// ----------------------------------------------------------------------

export default function GameHistoryTable({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}: TableProps) {
  return (
    <Card {...other}>
      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 640 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row: any) => (
                <GameHistoryTableRow key={row._id} row={row} headLabel={tableLabels} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

// ----------------------------------------------------------------------

type GameHistoryTableRowProps = {
  row: GameHistoryType | any;
  headLabel: any;
};

function GameHistoryTableRow({ row, headLabel }: GameHistoryTableRowProps) {
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <TableRow>
      {headLabel.map((label: any) => (
        <TableCell align={label.align ?? 'left'} key={label.id}>
          {label.avatar ? (
            <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar alt={row.user.avatar} src={row.user.avatar} sx={{ mr: 2 }}>
                {`${row.user.firstName?.charAt(0).toUpperCase()}${row.user.lastName
                  ?.charAt(0)
                  .toUpperCase()}`}
              </Avatar>
              {`${row.user.firstName} ${row.user.lastName} (${row.user.userName})`}
            </Stack>
          ) : (
            <Typography
              color={(theme) =>
                label.id === 'payout'
                  ? row[label.id] > 0
                    ? theme.palette.success.main
                    : theme.palette.error.main
                  : 'white'
              }
            >
              {`${
                label.date
                  ? moment(row[label.id]).startOf('s').tz(localTimezone).fromNow()
                  : row[label.id]
              }${label.unit ?? ''}`}
            </Typography>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}
