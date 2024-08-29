import { useState, useEffect, Fragment } from 'react';
import { Box, Button, Grid, InputBase, Stack, Typography, useTheme } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { enqueueSnackbar } from 'notistack';
import $ from 'jquery';

import { cutDecimalPoints, parseCommasToThousands } from 'src/utils';
import { useSelector } from 'src/store';
import useApi from 'src/hooks/use-api';
import { TabPanelProps } from './types';

import Limbo1 from '../../assets/limbo/limbo1.png';
import Limbo2 from '../../assets/limbo/limbo2.png';
import Rocket from '../../assets/limbo/rocket.png';
import Mountain from '../../assets/limbo/mountain.png';

export default function GameContent() {
  const { isLoggedIn, user } = useSelector((status) => status.auth);
  const { betLimbo, getLimboSchema } = useApi();
  const theme = useTheme();
  const [, setLoading] = useState(false);
  const [payout] = useState(1);
  const [target, setTarget] = useState('2');
  const [history, setHistory] = useState<any[]>([]);
  const [betAmount, setBetAmount] = useState('0.00');
  const [betTab, setBetTab] = useState<TabPanelProps>('manual');

  const startBet = async () => {
    try {
      if (!isLoggedIn) {
        enqueueSnackbar('Need login to create game!', { variant: 'error' });
        return;
      }
      if (parseFloat(betAmount) <= 0 || parseFloat(target) <= 0) return;
      if (user.balance < parseFloat(betAmount)) {
        enqueueSnackbar('Not enough funds!', { variant: 'error' });
        return;
      }

      const res = await betLimbo(user?._id, parseFloat(betAmount), parseFloat(target));
      if (!res?.data) return;
      const win = res.data.result.status === 'WIN';
      // eslint-disable-next-line
      $('.counter').each(function () {
        const size = $(this).text().split('.')[1] ? $(this).text().split('.')[1].length : 0;
        $(this)
          .prop('Counter', 0)
          .animate(
            { Counter: String(res.data.result.multiplier) },
            {
              duration: 600,
              step: (func: any) => {
                $(this).text(parseFloat(func).toFixed(size));
              }
            }
          );
      });
      $('.rocket-wrap').addClass('flying');
      $('.rocket-payout').attr('class', 'rocket-payout');
      $('.counter').attr('class', 'counter');
      $('.rocket-wrap').addClass('flying');
      setTimeout(() => {
        $('.rocket-wrap, .rocket-boom').addClass('boom');
        setHistory((prevState: any) =>
          prevState.length >= 8
            ? [...prevState.slice(1, prevState.length), res.data.limbo]
            : [...prevState, res.data.limbo]
        );
        setTimeout(() => {
          $('.rocket-payout, .counter')
            .toggleClass('text-danger', !win)
            .toggleClass('text-success', win);
          $('.rocket-wrap').removeClass('flying').removeClass('boom');
          $('.rocket-boom').removeClass('boom');
          setLoading(false);
        }, 400);
      }, 200);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(`${err.response.data.message}!`, { variant: 'error' });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch crash schema from API
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await getLimboSchema(user?._id);
          if (!res?.data) return;
          const schema = res.data;
          setHistory(schema.reverse().slice(0, 8));
          setLoading(false);
        } catch (error1) {
          console.log('There was an error while loading crash schema:', error1);
        }
      };

      // Initially, fetch data
      fetchData();
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <Grid container spacing={3.5}>
      <Grid item xs={12} md={4} sm={3.5}>
        <Stack
          sx={{
            maxHeight: 550,
            borderRadius: `15px`,
            bgcolor: 'rgba(255, 255, 255, 0.04)',
            boxShadow: `0px 0px 15px 0px rgba(0, 0, 0, 0.25)`,
            justifyContent: 'space-between'
          }}
        >
          <Stack
            sx={{
              borderRadius: `15px`,
              bgcolor: 'rgba(255, 255, 255, 0.04)',
              boxShadow: `0px 0px 2px 0px rgba(0, 0, 0, 0.25)`,
              gap: 2,
              px: 2.5,
              py: 3.5
            }}
          >
            <Stack sx={{ flexDirection: 'row', gap: 1.9 }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  py: 0.8,
                  width: '50%',
                  borderRadius: 1.5,
                  bgcolor: betTab === 'manual' ? '#303158' : 'transparent'
                }}
                onClick={() => setBetTab('manual')}
              >
                Manual
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  py: 0.8,
                  width: '50%',
                  borderRadius: 1.5,
                  bgcolor: betTab === 'auto' ? '#303158' : 'transparent'
                }}
                onClick={() => setBetTab('auto')}
              >
                Auto
              </Button>
            </Stack>
            <Stack gap={0.4}>
              <Typography sx={{ fontSize: 11 }}>Bet Amount:</Typography>
              <InputBase
                value={betAmount}
                onChange={(e: any) => setBetAmount(e.target.value)}
                placeholder="0.00"
                type="number"
                error={parseFloat(betAmount) <= 0 ?? true}
                inputProps={{ step: 0.01, min: 0 }}
                startAdornment={
                  <AttachMoneyIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
                }
                endAdornment={
                  <Stack sx={{ flexDirection: 'row', gap: 0.55 }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      sx={{ bgcolor: theme.palette.grey[300] }}
                      onClick={() =>
                        setBetAmount((state) => (parseFloat(state) / 2).toFixed(2) || '0.00')
                      }
                    >
                      1/2
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      sx={{ bgcolor: theme.palette.grey[300] }}
                      onClick={() =>
                        setBetAmount((state) => (parseFloat(state) * 2).toFixed(2) || '0.00')
                      }
                    >
                      2x
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      sx={{ bgcolor: theme.palette.grey[300] }}
                    >
                      Max
                    </Button>
                  </Stack>
                }
                sx={{
                  px: 1.25,
                  py: 0.85,
                  borderRadius: 1.25,
                  background: `#303158`
                }}
              />
            </Stack>
            <Stack gap={0.4}>
              <Typography sx={{ fontSize: 11 }}>Multiplier</Typography>
              <InputBase
                value={target}
                onChange={(e: any) => setTarget(e.target.value)}
                placeholder="0.00"
                type="number"
                error={parseFloat(target) <= 1 ?? true}
                inputProps={{ step: 0.01, min: 0 }}
                startAdornment={
                  <Typography fontSize="sm" sx={{ color: theme.palette.primary.main, mr: 1 }}>
                    x
                  </Typography>
                }
                endAdornment={
                  <Stack sx={{ flexDirection: 'row', gap: 0.55 }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      sx={{ bgcolor: theme.palette.grey[300] }}
                      onClick={() => {
                        if (parseFloat(target) > 1)
                          setTarget((state) => (parseFloat(state) / 2).toFixed(2) || '0');
                      }}
                    >
                      1/2
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      sx={{ bgcolor: theme.palette.grey[300] }}
                      onClick={() =>
                        setTarget((state) => (parseFloat(state) * 2).toFixed(2) || '0')
                      }
                    >
                      2x
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      sx={{ bgcolor: theme.palette.grey[300] }}
                      onClick={() =>
                        setTarget((state) => (parseFloat(state) * 5).toFixed(2) || '0')
                      }
                    >
                      5x
                    </Button>
                  </Stack>
                }
                sx={{
                  px: 1.25,
                  py: 0.85,
                  borderRadius: 1.25,
                  background: `#303158`
                }}
              />
            </Stack>
            <Button variant="contained" color="primary" sx={{ py: 1.5 }} onClick={startBet}>
              Bet
            </Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={8} sm={8.5}>
        <Box
          sx={{
            borderRadius: `25px`,
            bgcolor: 'rgba(255, 255, 255, 0.04)',
            boxShadow: `0px 0px 2px 0px rgba(0, 0, 0, 0.25)`,
            gap: 2,
            px: { xs: 1, md: 2.5 },
            py: 3.5,
            position: 'relative',
            height: 550,
            overflow: 'hidden',
            padding: '0px !important'
          }}
          className="game-limbo"
        >
          <div
            className="gameLatest gameLatestHorizontal lastestHistory"
            style={{ position: 'absolute', top: 10, zIndex: 10, left: 10, maxWidth: '80%' }}
          >
            {history.map((item: any, key) => (
              <Fragment key={key}>
                {item.result === 'WIN' ? (
                  <div
                    className="gameLatestItem gameLatestItemBlue"
                    style={{ opacity: 0.2 * (key + 1) }}
                  >
                    {parseCommasToThousands(cutDecimalPoints(item.multiplier.toFixed(2)))}
                  </div>
                ) : (
                  <div
                    className="gameLatestItem gameLatestItemRed"
                    style={{ opacity: 0.2 * (key + 1) }}
                  >
                    {parseCommasToThousands(cutDecimalPoints(item.multiplier.toFixed(2)))}
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <Box className="limbo-canvas">
            <img src={Limbo1} className="cloud cloud-r" alt="" />
            <img src={Limbo2} className="cloud cloud-d" alt="" />
            <img src={Limbo1} className="cloud cloud-v" alt="" />
            <img src={Limbo2} className="cloud cloud-g" alt="" />
            <img src={Mountain} className="limbo-bg" alt="" />
            <Box className="bg-star show-1">
              <Box className="l-star e-r" />
              <Box className="l-star s-p" />
              <Box className="l-star r-p" />
            </Box>
            <Box className="bg-star show-2">
              <Box className="l-star e-r" />
              <Box className="l-star s-p" />
              <Box className="l-star r-p" />
            </Box>
            <Box className="bg-star show-3">
              <Box className="l-star e-r" />
              <Box className="l-star s-p" />
              <Box className="l-star r-p" />
            </Box>
            <Box className="game-rocket notranslate">
              <Box className="rocket-number">
                <span className="rocket-payout">
                  <span className="counter">{payout.toFixed(2)}</span>x
                </span>
                <Box className="rocket-boom" />
              </Box>
              <Box className="rocket-wrap fire">
                <Box className="rocket-img">
                  <img src={Rocket} alt="rocket" />
                </Box>
                <Box className="rocket-fire" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
