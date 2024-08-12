import React, { useEffect, useMemo, useState, memo } from 'react';
import { Stack, Button, Dialog, Avatar, Typography, IconButton, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useApi from 'src/hooks/use-api';
import { GameDialogProps, CoinflipRoom } from 'src/types';
import { useSelector } from 'src/store';

import unknownImg from '../../assets/user.png';
import Tails1Video from '../../assets/Tails1.mp4';
import Heads1Video from '../../assets/Heads1.mp4';
import Tails2Video from '../../assets/Tails2.mp4';
import Heads2Video from '../../assets/Heads2.mp4';

/* eslint-disable */
const ResultVideoComponent = ({ data }: { data: CoinflipRoom }) => {
  const videoRef: any = React.useRef(null);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    if (
      (data.side === true && data.result === 'creator') ||
      (data.side === false && data.result === 'joiner')
    ) {
      if (Math.round(Math.random()) === 0) setResult(1);
      else setResult(2);
    } else if (
      (data.side !== true && data.result === 'creator') ||
      (data.side !== false && data.result === 'joiner')
    ) {
      if (Math.round(Math.random()) === 0) setResult(3);
      else setResult(4);
    }
  }, [data]);

  useEffect(() => {
    if (result > 0) {
      setTimeout(() => {
        videoRef.current?.play();
      }, 100);
    }
  }, [result]);

  return (
    <>
      {result !== 0 && (
        <video ref={videoRef} width="320px" height="240px">
          {result === 1 && <source src={Tails1Video} type="video/mp4" />}
          {result === 2 && <source src={Tails2Video} type="video/mp4" />}
          {result === 3 && <source src={Heads1Video} type="video/mp4" />}
          {result === 4 && <source src={Heads2Video} type="video/mp4" />}
        </video>
      )}
    </>
  );
};

const GameDialog = ({ open, onClose, data }: GameDialogProps) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Dialog
      open={open}
      aria-labelledby="game-dialog-title"
      aria-describedby="game-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          maxWidth: { xm: '100%', sm: '100%', md: `770px` },
          height: `60%`,
          width: `100%`,
          position: `relative`,
        },
      }}
    >
      <IconButton
        aria-label="close"
        sx={{ position: 'absolute', top: 1, right: 1.25, zIndex: 100 }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
        }}
      >
        <Stack
          sx={{
            width: '50%',
            bgcolor: (theme) => theme.palette.grey[100],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack sx={{ gap: 1.6, alignItems: 'center' }}>
            <Avatar
              alt={data.creator.name}
              src={data.creator.avatar}
              sx={{ width: 130, height: 130 }}
            />
            <Typography fontSize={20}>{data.creator.name}</Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{
            width: '50%',
            bgcolor: (theme) => theme.palette.grey[200],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack sx={{ gap: 1.6, alignItems: 'center' }}>
            <Avatar
              alt={!data?.joiner?._id ? data.creator.name : data.joiner.name}
              src={!data?.joiner?._id ? unknownImg : data.joiner.avatar}
              sx={{ width: 130, height: 130 }}
            />
            <Typography fontSize={20}>
              {!data?.joiner?._id ? 'Waiting...' : data.joiner.name}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          {data.state === 'end' && <ResultVideoComponent data={data} />}
          <Stack
            sx={{
              position: 'absolute',
              alignItems: 'center',
              bottom: '2%',
              display: 'flex',
              flexDirection: 'row',
              gap: '30px',
              width: '100%',
            }}
          >
            <Typography sx={{ fontSize: '11px', opacity: '0.3', flex: '1', textAlign: 'right' }}>
              Seed: {data?.api?.id}
            </Typography>
            <Typography sx={{ fontSize: '11px', opacity: '0.3', flex: '1' }}>
              Hash: {data?.api?.result?.signature.slice(0, 33) ?? ''}
            </Typography>
          </Stack>
          <Stack
            sx={{
              position: 'absolute',
              alignItems: 'center',
              bottom: '20%',
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
            }}
          >
            <Stack
              alignItems="center"
              display="flex"
              justifyContent="center"
              gap={2}
              flexDirection="column"
            >
              <Button
                disabled={data.state === 'end' || data.creator._id === user._id}
                variant="contained"
                size="medium"
                color="primary"
                sx={{ minWidth: '150px' }}
              >
                {`$${data.amount}`}
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <DialogTitle />
      </Stack>
    </Dialog>
  );
};

export default GameDialog;
