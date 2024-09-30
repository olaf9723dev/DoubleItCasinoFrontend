import { useState, useEffect, Fragment } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  InputBase,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import gsap from 'gsap';
import _ from 'underscore';
import { enqueueSnackbar } from 'notistack';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import Scrollbar from 'src/components/scrollbar';
import { crashSocket } from 'src/utils/socket';
import { useSelector } from 'src/store';
import useApi from 'src/hooks/use-api';
import { cutDecimalPoints, parseCommasToThousands, playSound } from 'src/utils';

import placebet from 'src/assets/crash/placebet.wav';
import error from 'src/assets/crash/error.wav';
import success from 'src/assets/crash/success.wav';
import crash from 'src/assets/crash/crash.wav';

import {
  GameEndType,
  PlayerProps,
  TabPanelProps,
  BetType,
  PlayerType
} from '../../histories/types';
// ----------------------------------------------------------------------
import GameCanvas from './game-canvas';
// const multipliers = ['1.0', '1.4', '1.8', '2.0', '2.4', '2.8', '3.0', '3.2'];
// const times = [3, 6, 9, 12, 15, 18, 21];

const errorAudio = new Audio(error);
const placebetAudio = new Audio(placebet);
const successAudio = new Audio(success);
const crashAudio = new Audio(crash);

gsap.registerPlugin(MotionPathPlugin);

export const GAME_STATES = {
  NotStarted: 1,
  Starting: 2,
  InProgress: 3,
  Over: 4,
  Blocking: 5,
  Refunded: 6
};

const BET_STATES = {
  Playing: 1,
  CashedOut: 2
};
// Renderer callback with condition
const renderer = ({ minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a completed state
    return '';
  }
  // Render a countdown
  return ` ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default function GameContent() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { isLoggedIn, user } = useSelector((status) => status.auth);
  const { getCrashSchema, getUserCrashData } = useApi();

  const [crashed, setCrashed] = useState<boolean>(false);
  const [rockets, setRockets] = useState<any>(null);
  const [charts, setCharts] = useState<any>(null);

  const [betTab, setBetTab] = useState<TabPanelProps>('manual');

  const [gameState, setGameState] = useState(1);
  const [gameId, setGameId] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);
  const [joining, setJoining] = useState<boolean>(false);
  const [betting, setBetting] = useState<boolean>(false);
  const [plannedBet, setPlannedBet] = useState<boolean>(false);
  const [ownBet, setOwnBet] = useState<any>(null);
  const [autoCashoutEnabled, setAutoCashoutEnabled] = useState<boolean>(true);
  const [autoBetEnabled, setAutoBetEnabled] = useState<boolean>(false);
  const [cashedOut, setCashedOut] = useState<boolean>(false);
  const [history, setHistory] = useState<GameEndType[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<any>(null);
  const [payout, setPayout] = useState<number>(1);
  const [betAmount, setBetAmount] = useState('0.00');
  const [target, setTarget] = useState('2');
  const [privateHash, setPrivateHash] = useState<string>('');
  const [publicSeed, setPublicSeed] = useState<string>('');
  const [maxProfit, setMaxProfit] = useState<number>(0);

  // Add new player to the current game
  const addNewPlayer = (player: any) => {
    setPlayers((state) => [...state, player]);
  };

  const startBet = () => {
    if (parseFloat(betAmount) <= 0 || parseFloat(target) <= 0) return;

    if (gameState === GAME_STATES.Starting) {
      setJoining(true);

      // Emit new bet event
      crashSocket.emit(
        'join-game',
        autoCashoutEnabled ? parseFloat(target) * 100 : null,
        parseFloat(betAmount)
      );
      // eslint-disable-next-line
    } else {
      // eslint-disable-next-line
      if (plannedBet) {
        setPlannedBet(false);
      } else if (!autoBetEnabled) {
        setPlannedBet(true);
      }
    }
  };

  const clickCashout = () => {
    // Emit bet cashout
    crashSocket.emit('bet-cashout');
  };

  // TextField onChange event handler
  const onBetChange = (e: any) => {
    setBetAmount(e.target.value);
  };

  const onTargetChange = (e: any) => {
    setTarget(e.target.value);
  };

  // Add game to history
  const addGameToHistory = (game: GameEndType) => {
    setHistory((state) =>
      state.length >= 8 ? [...state.slice(1, state.length), game] : [...state, game]
    );
  };

  const handleChange = (newValue: TabPanelProps) => {
    setBetTab(newValue);
  };

  useEffect(() => {
    // eslint-disable-next-line
    setAutoBetEnabled(betTab === 'auto' ? true : false);
  }, [betTab]);

  // componentDidMount
  useEffect(() => {
    // Error event handler
    const joinError = (msg: any) => {
      setJoining(false);
      enqueueSnackbar(msg, { variant: 'error' });
      playSound(errorAudio);
    };

    // Success event handler
    const joinSuccess = (bet: any) => {
      setJoining(false);
      setOwnBet(bet);
      setBetting(true);
      enqueueSnackbar('Successfully joined the game!', { variant: 'success' });
      playSound(placebetAudio);
    };

    // Error event handler
    const cashoutError = (msg: any) => {
      enqueueSnackbar(msg, { variant: 'error' });
      playSound(errorAudio);
    };

    // Success event handler
    const cashoutSuccess = () => {
      enqueueSnackbar('Successfully cashed out!', { variant: 'success' });
      playSound(successAudio);

      // Reset betting state
      setTimeout(() => {
        setBetting(false);
      }, 1500);
    };

    // New round is starting handler
    const gameStarting = (data: any) => {
      // Update state
      setGameId(data._id);
      setStartTime(new Date(Date.now() + new Date(data.timeUntilStart).valueOf()));
      setGameState(GAME_STATES.Starting);
      setPrivateHash(data.privateHash);
      setPublicSeed('');

      setPayout(1);
      setPlayers([]);
      setOwnBet(null);

      if (autoBetEnabled || plannedBet) {
        setJoining(true);

        // Emit new bet event
        crashSocket.emit(
          'join-game',
          autoCashoutEnabled ? parseFloat(target) * 100 : null,
          parseFloat(betAmount)
        );

        // Reset planned bet
        if (plannedBet) setPlannedBet(false);
      }
      setCrashed(false);
      rockets.restart();
      charts.restart();
      setTimeout(() => {
        rockets.pause();
        charts.pause();
      }, 100);
    };

    // New round started handler
    const gameStart = (data: any) => {
      // Update state
      setStartTime(Date.now());
      setGameState(GAME_STATES.InProgress);
      setPublicSeed(data.publicSeed);
      if (rockets) {
        rockets.restart();
      }
      if (charts) {
        charts.restart();
      }
      setCrashed(false);
    };

    // Current round ended handler
    const gameEnd = ({ game }: { game: GameEndType }) => {
      // Update state
      setGameState(GAME_STATES.Over);
      setCrashed(true);
      if (rockets) {
        rockets.pause();
      }
      if (charts) {
        charts.pause();
      }
      playSound(crashAudio);
      setPayout(game.crashPoint);
      addGameToHistory(game);
      setBetting(false);
      setCashedOut(false);
    };

    // New game bets handler
    const gameBets = (bets: any) => {
      _.forEach(bets, (bet: any) => addNewPlayer(bet));
    };

    // New cashout handler
    const betCashout = (bet: BetType) => {
      // Check if local user cashed out
      if (bet.playerID === user._id) {
        setCashedOut(true);
        if (ownBet) setOwnBet(Object.assign(ownBet, bet));
        playSound(successAudio);

        // Reset betting state
        setTimeout(() => {
          setBetting(false);
        }, 1500);
      }

      // Update state
      setPlayers((state) =>
        state.map((player) =>
          player.playerID === bet.playerID ? Object.assign(player, bet) : player
        )
      );
    };

    // Current round tick handler
    const gameTick = (payoutData: any) => {
      if (gameState !== GAME_STATES.InProgress) return;
      setPayout(payoutData);
    };

    // Listeners
    crashSocket.on('game-starting', gameStarting);
    crashSocket.on('game-start', gameStart);
    crashSocket.on('game-end', gameEnd);
    crashSocket.on('game-tick', gameTick);
    crashSocket.on('game-bets', gameBets);
    crashSocket.on('bet-cashout', betCashout);
    crashSocket.on('game-join-error', joinError);
    crashSocket.on('game-join-success', joinSuccess);
    crashSocket.on('bet-cashout-error', cashoutError);
    crashSocket.on('bet-cashout-success', cashoutSuccess);

    return () => {
      // Remove Listeners
      crashSocket.off('game-starting', gameStarting);
      crashSocket.off('game-start', gameStart);
      crashSocket.off('game-end', gameEnd);
      crashSocket.off('game-tick', gameTick);
      crashSocket.off('game-bets', gameBets);
      crashSocket.off('bet-cashout', betCashout);
      crashSocket.off('game-join-error', joinError);
      crashSocket.off('game-join-success', joinSuccess);
      crashSocket.off('bet-cashout-error', cashoutError);
      crashSocket.off('bet-cashout-success', cashoutSuccess);
    };
  }, [
    gameState,
    startTime,
    plannedBet,
    autoBetEnabled,
    autoCashoutEnabled,
    betAmount,
    target,
    ownBet,
    user,
    rockets,
    charts
  ]);

  useEffect(() => {
    // Fetch crash schema from API
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getCrashSchema();
        if (!res?.data) return;
        const schema = res.data;

        const betted = schema.current.players.some((row: PlayerType) => row.playerID === user._id);

        // Update state
        if (betted) setBetting(true);
        setGameId(schema.current._id);
        setPlayers(schema.current.players);
        setGameState(schema.current.status);
        setMaxProfit(schema.options.maxProfit);
        setPublicSeed(schema.current.publicSeed);
        setPrivateHash(schema.current.privateHash);
        setHistory(schema.history.reverse().slice(0, 8));
        setStartTime(new Date(Date.now() - new Date(schema.current.elapsed).valueOf()));

        setLoading(false);
      } catch (error1) {
        console.log('There was an error while loading crash schema:', error1);
      }
    };

    // Initially, fetch data
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Fetch crash schema from API
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUserCrashData();

        // Update state
        if (data.bet && data.bet.status === BET_STATES.Playing) {
          setBetting(true);
          setOwnBet(data.bet);
        }
      } catch (error2) {
        console.log('There was an error while loading crash schema:', error2);
      }
    };

    // If user is signed in, check user data
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, getUserCrashData]);

  useEffect(() => {
    gsap.set(['.rocket', '.rocket--self'], {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: '50% 50%'
    });

    const rocket = gsap.to('.rocket', {
      motionPath: {
        path: '#path',
        align: '#path',
        autoRotate: true
      },
      duration: 20,
      ease: 'power1.in'
    });
    const chart = gsap.to('.crash-game-chart-inner', {
      duration: 19.5,
      width: 600,
      ease: 'power1.in'
    });
    setRockets(rocket);
    setCharts(chart);
    const time = setTimeout(() => {
      rocket.pause();
      chart.pause();
    }, 100);
    return () => {
      clearInterval(time);
    };
  }, []);

  return (
    <Grid container spacing={3.5}>
      <Grid item xs={12} sm={12} md={4}>
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
                onClick={() => handleChange('manual')}
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
                onClick={() => handleChange('auto')}
              >
                Auto
              </Button>
            </Stack>

            <Stack gap={0.4}>
              <Typography sx={{ fontSize: 11 }}>Bet Amount:</Typography>
              <InputBase
                value={betAmount}
                onChange={onBetChange}
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
                onChange={onTargetChange}
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
            {!betting ? (
              <Button
                variant="contained"
                color="primary"
                sx={{ py: 1.5 }}
                disabled={joining || autoBetEnabled}
                onClick={startBet}
              >
                {joining ? 'BETTING...' : plannedBet ? 'CANCEL BET' : 'Place Bet (next round)'}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{ py: 1.5 }}
                disabled={gameState !== GAME_STATES.InProgress || cashedOut}
                onClick={clickCashout}
              >
                {cashedOut ? 'CASHED OUT' : 'CASHOUT'}
              </Button>
            )}
          </Stack>
          <Stack sx={{ gap: 1.5 }}>
            <Stack
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                px: 3.8,
                pt: 2
              }}
            >
              <Typography sx={{ fontSize: 10 }}>{players.length} Players</Typography>
              <Typography sx={{ fontSize: 10 }}>
                {players.reduce((a, b) => a + b.betAmount, 0)}
              </Typography>
            </Stack>
            <Stack sx={{ height: 150 }}>
              <Scrollbar>
                {players.map((row: PlayerProps, index: number) => (
                  <Stack
                    key={index}
                    sx={{
                      px: 3.8,
                      py: 0.55,
                      flexDirection: 'row',
                      bgcolor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.17)' : ''
                    }}
                  >
                    <Stack
                      sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '60%'
                      }}
                    >
                      <Avatar alt={row.avatar} src={row.avatar} sx={{ width: 32, height: 32 }}>
                        {`${row.firstName?.charAt(0).toUpperCase()}${row.lastName
                          ?.charAt(0)
                          .toUpperCase()}`}
                      </Avatar>
                      <Typography
                        sx={{
                          fontSize: 11,
                          ml: 1.1
                        }}
                      >
                        {`${row.firstName} ${row.lastName} (${row.userName})`}
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        width: '20%',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 11,
                          textAlign: 'center',
                          color: theme.palette.success.main
                        }}
                      >
                        {row.stoppedAt ? `${(row.stoppedAt / 100).toFixed(2)}x` : ''}
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        width: '20%',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography sx={{ fontSize: 11, textAlign: 'right' }}>
                        {row.betAmount}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Scrollbar>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
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
        >
          <div
            className="gameLatest gameLatestHorizontal lastestHistory"
            style={{ position: 'absolute', top: 10, zIndex: 10, left: 10, maxWidth: '80%' }}
          >
            {history.map((item, key) => (
              <Fragment key={key}>
                {item.crashPoint < 1.2 ? (
                  <div
                    className="gameLatestItem gameLatestItemRed"
                    style={{ opacity: 0.2 * (key + 1) }}
                  >
                    {parseCommasToThousands(cutDecimalPoints(item.crashPoint.toFixed(2)))}
                  </div>
                ) : item.crashPoint >= 1.2 && item.crashPoint < 2 ? (
                  <div
                    className="gameLatestItem gameLatestItemNeutral"
                    style={{ opacity: 0.2 * (key + 1) }}
                  >
                    {parseCommasToThousands(cutDecimalPoints(item.crashPoint.toFixed(2)))}
                  </div>
                ) : item.crashPoint >= 2 && item.crashPoint < 100 ? (
                  <div
                    className="gameLatestItem gameLatestItemBlue"
                    style={{ opacity: 0.2 * (key + 1) }}
                  >
                    {parseCommasToThousands(cutDecimalPoints(item.crashPoint.toFixed(2)))}
                  </div>
                ) : (
                  <div
                    className="gameLatestItem gameLatestItemPurple"
                    style={{ opacity: 0.2 * (key + 1) }}
                  >
                    {parseCommasToThousands(cutDecimalPoints(item.crashPoint.toFixed(2)))}
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <Typography
            className="crash-game-status"
            style={{
              top: 10,
              right: 20,
              zIndex: 10,
              height: 24,
              fontSize: 15,
              position: 'absolute'
            }}
          >
            {!isMobile && `Network status`}
            <span className="good" />
          </Typography>
          <GameCanvas status={gameState} payout={payout} startTime={startTime} />
        </Box>
      </Grid>
    </Grid>
  );
}
