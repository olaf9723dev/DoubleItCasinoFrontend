import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Typography, Button, useMediaQuery } from '@mui/material';
import { TimelineSeparator, TimelineConnector } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, dispatch } from 'src/store';
import useApi from 'src/hooks/use-api';

// components
import Image from 'src/components/image';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import WithdrawDialogComponent from './withdraw-dialog';

// types
import { ItemProps, IList } from './types';
import { useMessagesScroll } from './hooks';

// ----------------------------------------------------------------------

export default function SelectedItems({ list, selected, onCancel }: ItemProps) {
  const { withdraw, initialize } = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const { listEndRef } = useMessagesScroll(selected);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const mediaDown = useMediaQuery(theme.breakpoints.down('lg'));

  const [items, setItems] = useState<IList[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleWithdraw = async () => {
    if (!isLoggedIn || !user || !selected.length) return;
    if (totalAmount > user.balance) {
      enqueueSnackbar('Your balance is not enough', { variant: 'error' });
      return;
    }
    const res = await withdraw(selected);
    if (!res?.data) return;
    initialize();
    setOpen(true);
  };

  useEffect(() => {
    const array: IList[] = [];
    selected.forEach((select) => {
      const item = list.find((row) => row._id === select);
      if (item) array.push(item);
    });
    setTotalAmount(
      Number(
        array
          .reduce((accumulator, currentObject) => accumulator + currentObject.amount, 0)
          .toFixed(2)
      )
    );
    setItems(array);
  }, [list, selected]);

  return (
    <Stack
      data-aos-duration="500"
      sx={{
        position: 'sticky',
        top: 0,
      }}
    >
      <Stack
        sx={{
          height: '70vh',
          width: '100%',
          position: 'absolute',
          border: `2px solid #302e58`,
          borderRadius: `15px 15px 0px 0px`,
          boxShadow: `0px 0px 70px 0px rgba(0, 0, 0, 0.25)`,
          background: `linear-gradient(170deg, rgb(255 255 255 / 3%) 0%, rgb(255 255 255 / 16%) 80%, rgb(178 175 243 / 24%) 100%)`,
        }}
      >
        <Stack
          sx={{
            py: 3,
            px: 2.55,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottom: `2px solid #302e58`,
          }}
        >
          <Typography>Selected Items</Typography>
          <Stack
            sx={{
              flexDirection: 'row',
              fontSize: 13,
              gap: 1.5,
              alignItems: 'center',
            }}
          >
            <Box>{`$ ${totalAmount}`}</Box>
            <TimelineSeparator sx={{ height: '100%' }}>
              <TimelineConnector />
            </TimelineSeparator>
            <Box>{`${selected.length} Items`}</Box>
          </Stack>
        </Stack>
        <Scrollbar ref={listEndRef}>
          <Stack
            sx={{
              px: 2.5,
              py: 3,
              gap: 2.7,
              height: '100%',
            }}
          >
            {items.map((row, index) => (
              <Stack
                data-aos-duration="500"
                key={index}
                sx={{
                  p: 0.4,
                  borderRadius: 0.5,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  border: `1px solid #504e7d`,
                  background: `radial-gradient(415.64% 157.95% at 0% 3.09%, rgb(80 86 163 / 0%) 0%, rgb(83 89 157 / 55%) 95%),linear-gradient(180deg, rgb(179 183 223 / 17%) 0%, rgb(0 0 0 / 0%) 100%)`,
                  boxShadow: `2px -2px 1px 0px rgba(0, 0, 0, 0.17) inset, -2px 2px 1px 0px rgba(255, 255, 255, 0.03) inset, 0px 9px 11px 0px rgba(0, 0, 0, 0.15)`,
                }}
              >
                <Stack sx={{ p: 1, gap: 1.9, flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    src={row.img}
                    alt={row.img}
                    sx={{
                      width: 62,
                      height: 62,
                      borderRadius: 0.5,
                      border: `2px solid #302f4796`,
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>{row.name}</Typography>
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 600 }}
                    >{`$ ${row.amount}`}</Typography>
                  </Box>
                </Stack>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ width: 40, minWidth: 40, px: 1.25, borderRadius: 0.5, bgcolor: '#585b9d' }}
                  onClick={() => onCancel(row._id)}
                >
                  <CloseIcon sx={{ width: 15 }} />
                </Button>
              </Stack>
            ))}
          </Stack>
        </Scrollbar>

        <Stack
          sx={{
            py: 3,
            px: 2.55,
            borderTop: `2px solid #44417e`,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: 0.5, bgcolor: '#585b9d', textTransform: 'uppercase' }}
            onClick={handleWithdraw}
          >
            Withdraw
          </Button>
        </Stack>
      </Stack>

      <WithdrawDialogComponent open={open} onClose={() => setOpen(false)} />
    </Stack>
  );
}
