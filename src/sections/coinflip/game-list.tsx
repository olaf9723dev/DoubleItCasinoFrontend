// @mui
import { Box, Card, Stack, Badge, Button, Avatar, Typography, IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

// components
import Scrollbar from 'src/components/scrollbar';
import { useSelector } from 'src/store';
import useSocket from 'src/hooks/use-socket';
import { enqueueSnackbar } from 'notistack';
import { CardProps } from '@mui/material/Card';
import { CoinflipRoom } from 'src/types';
import { SOCKET_PATH } from 'src/config-global';

import unknownImg from '../../assets/user.png';
import TCoin from '../../assets/t_coin.png';
import HCoin from '../../assets/h_coin.png';

interface ListProps extends CardProps {
  games: CoinflipRoom[];
  openView: (selected: CoinflipRoom) => void;
}

type GameListRowProps = {
  row: CoinflipRoom;
  openView: (selected: CoinflipRoom) => void;
};

export default function GameListComponent({ games, openView, ...other }: ListProps) {
  return (
    <Scrollbar sx={{ height: 1 }}>
      <Card
        {...other}
        sx={{
          background: `transparent`,
        }}
      >
        <Scrollbar>
          <Stack gap={3}>
            {games.length !== 0 &&
              games.map((row: CoinflipRoom, index: number) => (
                <GameListRow key={index} row={row} openView={openView} />
              ))}
          </Stack>
        </Scrollbar>
      </Card>
    </Scrollbar>
  );
}

function GameListRow({ row, openView }: GameListRowProps) {
  const { connected, send } = useSocket();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const joinRoom = () => {
    if (!isLoggedIn || !connected)
      return enqueueSnackbar('Need login to view game', { variant: 'error' });
    if (user.balance < row.amount)
      return enqueueSnackbar('Not enough funds!', { variant: 'error' });

    if (
      user._id === row.creator._id
      // || multi join
      // games.find((item: CoinflipRoom) => item.creator._id === user._id) ||
      // games.find((item: CoinflipRoom) => item.joiner._id === user._id)
    ) {
      return null;
    }
    return send(SOCKET_PATH.COINFLIP_JOIN, row._id);
  };

  const ViewGame = () => {
    openView(row);
  };

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        px: 3,
        py: 2.5,
        borderRadius: `15px`,
        background:
          row.state !== 'end'
            ? `linear-gradient(90deg, #21223E 0%, #21223E 100%)`
            : `rgba(0, 0, 0, 0.15)`,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 200,
          }}
        >
          <Badge
            className="m_badge"
            badgeContent={
              <img
                alt=""
                src={row.side === true ? TCoin : HCoin}
                style={{ width: '20px', height: '20px' }}
              />
            }
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Avatar
              alt={row.creator.name}
              src={row.creator.avatar}
              sx={{ width: 48, height: 48, borderRadius: `5px`, border: `2px solid #FFB802` }}
            />
          </Badge>
          <Typography
            sx={{
              background: `linear-gradient(180deg, #FFB802 0%, #DD9C50 100%)`,
              WebkitBackgroundClip: `text`,
              WebkitTextFillColor: `transparent`,
              fontWeight: 700,
              ml: 2,
            }}
          >
            {row.creator.name}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ color: '#ffffff61' }}>VS</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 200,
            ml: 2,
          }}
        >
          <Badge
            className="m_badge"
            badgeContent={
              <img
                alt=""
                src={row.side === true ? HCoin : TCoin}
                style={{ width: '20px', height: '20px' }}
              />
            }
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Avatar
              alt={row.joiner?.name}
              src={!row.joiner?.avatar ? unknownImg : row.joiner.avatar}
              sx={{ width: 48, height: 48, borderRadius: `5px`, border: `2px solid #FFB802` }}
            />
          </Badge>
          <Typography
            sx={{
              fontWeight: 700,
              ml: 2,
            }}
          >
            {!row.joiner?.name ? 'Waiting...' : row.joiner?.name}
          </Typography>
        </Box>
      </Stack>

      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 9,
        }}
      >
        <Stack sx={{ textAlign: 'center', width: 100 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{`$${row.amount}`}</Typography>
          <Typography sx={{ fontSize: 10, fontWeight: 700 }}>VALUE</Typography>
        </Stack>

        <Box>
          <Button
            variant="contained"
            disabled={row.state === 'end' || row.creator._id === user._id}
            color="primary"
            sx={{ py: 1.5 }}
            onClick={() => {
              joinRoom();
            }}
          >
            Join Game
          </Button>
        </Box>
        <Box>
          <IconButton aria-label="fingerprint" color="success" onClick={ViewGame}>
            <RemoveRedEyeIcon />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
}
