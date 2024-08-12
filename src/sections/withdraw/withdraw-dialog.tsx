import { useCallback } from 'react';
import {
  Stack,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Iconify from 'src/components/iconify';
import { SERVER_URL } from 'src/config-global';
import { useSnackbar } from 'src/components/snackbar';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

import { WithdrawDialogProps } from './types';

export default function WithdrawDialog({ open, onClose }: WithdrawDialogProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();

  const handleCopy = useCallback(() => {
    enqueueSnackbar('Copied!');
    copy(SERVER_URL);
  }, [copy, enqueueSnackbar]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="withdraw-dialog-title"
      aria-describedby="withdraw-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          maxWidth: `40%`,
          width: `100%`,
          border: '2px solid #32366a',
          position: `relative`,
          background: `linear-gradient(180deg, #191B35 0%, #1F203C 100%)`,
        },
      }}
    >
      <DialogTitle
        id="withdraw-dialog-title"
        sx={{
          textAlign: 'center',
          py: 3.6,
          borderBottom: '2px dashed #32366a',
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>Withdrawal Created</Typography>
        <IconButton sx={{ position: 'absolute', top: 1, right: 1.25 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack
          id="withdraw-dialog-description"
          sx={{
            px: 5,
            py: 3,
            gap: 1.5,
            borderBottom: '2px dashed #32366a',
          }}
        >
          <Typography sx={{ fontSize: 18 }}>1. Join our server:</Typography>
          <Stack
            sx={{
              p: 3,
              borderRadius: 1.25,
              flexDirection: 'row',
              justifyContent: 'space-between',
              border: `1px solid #34386c`,
              bgcolor: `rgba(0, 0, 0, 0.27)`,
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 300 }}>{SERVER_URL}</Typography>
            <IconButton onClick={handleCopy}>
              <Iconify icon="octicon:link-16" />
            </IconButton>
          </Stack>
          <Stack alignItems="center">
            <Button variant="outlined" sx={{ borderRadius: 0.5, px: 5 }}>
              Join Server
            </Button>
          </Stack>
        </Stack>
        <Stack
          sx={{
            px: 5,
            py: 1,
            gap: 1.5,
          }}
        >
          <Stack sx={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
            <Typography sx={{ fontSize: 18 }}>2. Trade our bot:</Typography>
            <Button
              variant="text"
              sx={{
                borderRadius: 1.25,
                border: `1px solid #34386c`,
                bgcolor: `rgba(0, 0, 0, 0.27)`,
                p: '5px 15px',
              }}
            >
              TheAdoptMeBot
            </Button>
          </Stack>
          <Typography sx={{ color: '#CDCDCD', textAlign: 'center', py: 4 }}>
            Our bot will automatically accept the trade and give you your items. Be quick to accept
            the trade or our bot will return the withdrawal and you will have to re-do it. Make sure
            to only trade the bot above.
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
