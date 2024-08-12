import { useState, useCallback, useEffect } from 'react';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Card, Grid, Stack, ListItemText, Typography, useMediaQuery } from '@mui/material';

import useApi from 'src/hooks/use-api';

// components
import Image from 'src/components/image';
import Scrollbar from 'src/components/scrollbar';
import SelectedItemsComponent from './selected-items';

// types
import { ListItemProps, IList } from './types';
// ----------------------------------------------------------------------

type Props = {
  filterValue: string;
  sortValue: boolean;
};

export default function WithdrawList({ filterValue, sortValue }: Props) {
  const { getWithdrawalItems } = useApi();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [gameItems, setGameItems] = useState<IList[]>([]);
  const [gameFilteredItems, setGameFilteredItems] = useState<IList[]>([]);
  const theme = useTheme();
  const mediaDown = useMediaQuery(theme.breakpoints.down('lg'));
  console.log('mediaDown=>', mediaDown);
  const getList = useCallback(async () => {
    const res = await getWithdrawalItems();
    if (!res?.data) return;
    setGameItems(res.data);
    setGameFilteredItems(res.data);
  }, [getWithdrawalItems]);

  useEffect(() => {
    getList();
  }, [getList]);

  const handleClick = useCallback(
    (id: string) => {
      const selected = selectedItems.includes(id)
        ? selectedItems.filter((value) => value !== id)
        : [...selectedItems, id];

      setSelectedItems(selected);
    },
    [selectedItems]
  );

  useEffect(() => {
    const filtered: IList[] = [];
    gameItems.forEach((value) => {
      if (value.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1) {
        filtered.push(value);
      }
    });
    setGameFilteredItems(sortValue ? filtered.sort((FItem, SItem) => FItem.amount - SItem.amount) : filtered.sort((FItem, SItem) => SItem.amount - FItem.amount));
  }, [filterValue, gameItems, sortValue])

  return (
    <Scrollbar>
      <Grid container spacing={5}>
        <Grid item xs={selectedItems.length ? mediaDown ? 12 : 8.5 : 12}>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: `repeat(${selectedItems.length ? mediaDown ? 6 : 4 : 6}, 1fr)`,
            }}
          >
            {gameFilteredItems.map((row) => (
              <ListItem
                key={row._id}
                row={row}
                selected={selectedItems.includes(row._id)}
                onSelected={() => handleClick(row._id)}
              />
            ))}
          </Box>
        </Grid>
        {selectedItems.length && (
          <Grid item xs={mediaDown ? 12 : 3.5}>
            <Stack
              sx={{
                position: 'sticky',
                top: 0,
              }}
            >
              <SelectedItemsComponent
                list={gameItems}
                selected={selectedItems}
                onCancel={handleClick}
              />
            </Stack>
          </Grid>
        )}
      </Grid>
    </Scrollbar>
  );
}

// ----------------------------------------------------------------------

function ListItem({ row, selected, onSelected }: ListItemProps) {
  const theme = useTheme();
  const bg = `linear-gradient(172deg,rgba(23, 24, 36, 0) 0%, rgba(40, 43, 74, 0.52) 100%)`;
  const bg_active = `linear-gradient(162deg, rgb(59 63 110 / 24%) 0%, rgb(57 60 105) 100%)`;
  return (
    <Stack
      component={Card}
      spacing={2}
      key={row._id}
      onClick={onSelected}
      sx={{
        p: 3,
        background: selected ? bg_active : bg,
        border: `2px solid #25243c`,
        borderRadius: 1.25,
        cursor: 'pointer',
        '&:hover': {
          background: bg_active,
        },
      }}
    >
      <Image
        src={row.img}
        alt={row.img}
        overlay={alpha(theme.palette.grey[900], 0.48)}
        sx={{
          borderRadius: 0.5,
          border: `2px solid #302f4796`,
        }}
      />

      <Stack spacing={2} flexGrow={1}>
        <ListItemText
          primary={row.name}
          secondary={
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
              <Typography fontSize="small" color="primary">
                $
              </Typography>
              <Typography fontSize="small">{row.amount}</Typography>
            </Stack>
          }
          secondaryTypographyProps={{
            component: 'span',
            typography: 'caption',
            color: 'text.disabled',
          }}
          sx={{
            textAlign: 'center',
          }}
        />
      </Stack>
    </Stack>
  );
}
