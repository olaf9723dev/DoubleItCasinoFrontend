import { useCallback, useEffect, useState, memo } from 'react';
// @mui
import { Box, Container, Stack, Typography, useMediaQuery, Grid } from '@mui/material';
import { TimelineSeparator, TimelineConnector } from '@mui/lab';
import { useTheme } from '@mui/material/styles';

// components
import { useSettingsContext } from 'src/components/settings';
import useSocketEvents from 'src/hooks/use-socket-events';
import useApi from 'src/hooks/use-api';
import { SOCKET_PATH } from 'src/config-global';
import { useSelector } from 'src/store';
import { Event, CoinflipRoom } from 'src/types';

import GameDialog from './game-dialog';
import CreateComponent from './create';
import GameListComponent from './game-list';

export default function CoinflipView() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { initialize, getCoinFlip } = useApi();
  const settings = useSettingsContext();
  const theme = useTheme();
  const mediaDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [totalValue, setTotalValue] = useState(0);
  const [gamesCount, setGamesCount] = useState(0);
  const [joinable, setJoinable] = useState(0);
  const [games, setGames] = useState<CoinflipRoom[]>([]);
  const [selectedItem, setSelectedItem] = useState<CoinflipRoom | null>(null);

  const setDialog = (selected: CoinflipRoom) => {
    setSelectedItem(selected);
  };

  const onUpdateRoomList = (data: CoinflipRoom) => {
    if (data.state === 'end') {
      const updatedGames = games.map((row) => {
        if (row._id === data._id) return data;
        return row;
      });
      setGames(updatedGames);

      setTimeout(
        () => {
          const index = games.findIndex((row) => row._id === data._id);
          games.splice(index, 1);
          setGames(games);
        },
        1000 * 60 * 3
      );
    } else setGames((pre: CoinflipRoom[]) => [...pre, { ...data }]);

    if (selectedItem && selectedItem._id === data._id) {
      setSelectedItem(data);
    }

    if (!isLoggedIn) return;
    if ((data.creator._id === user._id && data.state === 'not') || data?.joiner?._id === user._id)
      setDialog(data);

    setTimeout(
      () => {
        initialize();
      },
      data.state === 'end' ? 1000 : 10
    );
  };

  const InitialRooms = useCallback(async () => {
    const res = await getCoinFlip();
    if (!res?.data) return;
    setGames(res.data);
  }, [getCoinFlip]);

  const getGlobalData = useCallback(() => {
    let _total = 0;
    let _joinable = 0;
    games.forEach((row) => {
      _total += row.amount;
      if (row.state === 'not') _joinable += 1;
    });

    setTotalValue(Number(_total.toFixed(2)));
    setJoinable(_joinable);
    setGamesCount(games.length);
  }, [games]);

  useEffect(() => {
    InitialRooms();
  }, [InitialRooms]);

  useEffect(() => {
    getGlobalData();
  }, [games.length, getGlobalData]);

  // socket.on
  const events: Event[] = [
    {
      name: SOCKET_PATH.COINFLIP_CREATE,
      handler: onUpdateRoomList
    }
  ];

  useSocketEvents(events, [games]);

  return (
    <Stack sx={{ height: `100%` }}>
      <Stack
        sx={{
          paddingTop: '14px',
          paddingBottom: '14px',
          alignItems: 'center',
          borderBottom: `1px solid #272951`
        }}
      >
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Stack
            sx={{ justifyContent: 'space-between', flexDirection: 'row' }}
            className="coinflip_div"
          >
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                textAlign: 'center'
              }}
              className="coinflip_content"
            >
              <Typography sx={{ fontSize: 28, fontWeight: 400 }}>Coinflip</Typography>
              <Stack>
                <Typography>${totalValue}</Typography>
                <Box
                  component="span"
                  sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    background: `linear-gradient(268deg, #C8CAFF -5.8%, #7C83C5 137%)`,
                    backgroundClip: `text`,
                    WebkitBackgroundClip: `text`,
                    WebkitTextFillColor: `transparent`
                  }}
                >
                  TOTAL VALUE
                </Box>
              </Stack>
              <TimelineSeparator sx={{ height: `33%` }}>
                <TimelineConnector />
              </TimelineSeparator>
              <Stack>
                <Typography>{gamesCount}</Typography>
                <Box
                  component="span"
                  sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    background: `linear-gradient(268deg, #C8CAFF -5.8%, #7C83C5 137%)`,
                    backgroundClip: `text`,
                    WebkitBackgroundClip: `text`,
                    WebkitTextFillColor: `transparent`
                  }}
                >
                  GAMES
                </Box>
              </Stack>
              <TimelineSeparator sx={{ height: `33%` }}>
                <TimelineConnector />
              </TimelineSeparator>
              <Stack>
                <Typography>{joinable}</Typography>
                <Box
                  component="span"
                  sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    background: `linear-gradient(268deg, #C8CAFF -5.8%, #7C83C5 137%)`,
                    backgroundClip: `text`,
                    WebkitBackgroundClip: `text`,
                    WebkitTextFillColor: `transparent`
                  }}
                >
                  JOINABLE
                </Box>
              </Stack>
            </Stack>
            <CreateComponent />
          </Stack>
        </Container>
      </Stack>

      <Box
        sx={{
          mt: 4,
          width: 1,
          height: '85%',
          borderRadius: 2
        }}
      >
        <GameListComponent games={games} openView={setDialog} />
      </Box>

      {selectedItem && (
        <GameDialog
          open={!!selectedItem}
          data={selectedItem}
          onClose={() => {
            setSelectedItem(null);
          }}
        />
      )}
    </Stack>
  );
}
