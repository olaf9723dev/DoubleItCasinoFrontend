import React, { useState } from 'react';
// @mui
import { Stack, InputBase, IconButton, Button, Avatar } from '@mui/material';

// components
import Iconify from 'src/components/iconify';
import { useSelector, dispatch } from 'src/store';
import { enqueueSnackbar } from 'notistack';
import useSocket from 'src/hooks/use-socket';
import { setbalance } from 'src/store/reducers/auth';
import { SOCKET_PATH } from 'src/config-global';

export default function CreateCoinflip() {
  const { connected, send } = useSocket();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const [betAmount, setBetAmount] = useState<number>(1);

  const handleChangeBetAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 0) setBetAmount(Number(e.target.value));
  };

  const [selectedCoin, setSelectedCoin] = useState(true);

  const CreatNewGame = async () => {
    if (!isLoggedIn || !connected)
      return enqueueSnackbar('Need login to create game!', { variant: 'error' });
    if (betAmount < 1 && betAmount > 1000)
      return enqueueSnackbar(
        <>
          Bet amount is invalid <br /> Min amount 1, Max amount 1000
        </>,
        { variant: 'error' }
      );

    if (user.balance < betAmount) return enqueueSnackbar('Not enough funds!', { variant: 'error' });

    // multi create
    // if (games?.find((item: CoinflipRoom) => item.creator._id === user._id))
    //   return enqueueSnackbar('Room is already created', { variant: 'error' });
    // if (games?.find((item: CoinflipRoom) => item.joiner._id === user._id))
    //   return enqueueSnackbar('There is Room you already joined!', { variant: 'error' });

    send(SOCKET_PATH.COINFLIP_CREATE, {
      amount: betAmount,
      side: selectedCoin,
    });

    dispatch(setbalance(user.balance - betAmount));
    return enqueueSnackbar('New Room created');
  };

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
      }}
      className='coinflip_content creatcontent'
    >
      <Stack sx={{ gap: 0.55, alignItems: 'center' }}>
        <InputBase
          value={betAmount}
          onChange={handleChangeBetAmount}
          placeholder="0.00"
          type="number"
          inputProps={{ step: 0.01, min: 0 }}
          startAdornment={
            <IconButton>
              <Iconify icon="mdi:attach-money" />
            </IconButton>
          }
          className='coinflip_input'
          sx={{
            px: 1,
            width: 140,
            flexShrink: 0,
            borderRadius: `5px`,
            background: `#303158`,
          }}
        />
        <Stack sx={{ flexDirection: 'row', gap: 0.55 }}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            sx={{ bgcolor: (theme) => theme.palette.grey[300] }}
            onClick={() => {
              setBetAmount(betAmount / 2);
            }}
          >
            1/2
          </Button>
          <Button
            onClick={() => {
              setBetAmount(betAmount * 2);
            }}
            size="small"
            variant="contained"
            color="secondary"
            sx={{ bgcolor: (theme) => theme.palette.grey[300] }}
          >
            2x
          </Button>
          <Button
            onClick={() => {
              setBetAmount(Number(user.balance.toFixed(2)));
            }}
            size="small"
            variant="contained"
            color="secondary"
            sx={{ bgcolor: (theme) => theme.palette.grey[300] }}
          >
            Max
          </Button>
        </Stack>
      </Stack>
      <Stack sx={{ gap: 0.9, flexDirection: 'row' }}>
        <IconButton aria-label="fingerprint" color="success" onClick={() => setSelectedCoin(true)}>
          <Avatar
            sx={{
              width: selectedCoin ? '50px' : '40px',
              height: selectedCoin ? '50px' : '40px',
            }}
            src="/assets/icons/coins/t_coin.png"
          />
        </IconButton>
        <IconButton aria-label="fingerprint" color="success" onClick={() => setSelectedCoin(false)}>
          <Avatar
            sx={{
              width: !selectedCoin ? '50px' : '40px',
              height: !selectedCoin ? '50px' : '40px',
            }}
            src="/assets/icons/coins/h_coin.png"
          />
        </IconButton>
      </Stack>
      <Button
        variant="contained"
        color="primary"
        className='create_btn'
        sx={{ py: 1.5 }}
        onClick={() => {
          CreatNewGame();
        }}
      >
        Create Game
      </Button>
    </Stack>
  );
}
