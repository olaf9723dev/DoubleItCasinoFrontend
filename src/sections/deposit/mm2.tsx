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

import { MethodDialogProps } from './types';

export default function MM2Dialog({ open, onClose }: MethodDialogProps) {
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
      aria-labelledby="adopt-me-dialog-title"
      aria-describedby="adopt-me-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          maxWidth: { xm: '100%', sm: '100%', md: `800px` },
          width: `100%`,
          border: '2px solid #32366a',
          position: `relative`,
          background: `linear-gradient(180deg, #191B35 0%, #1F203C 100%)`,
        },
      }}
    >
      <DialogTitle
        id="adopt-me-dialog-title"
        sx={{
          textAlign: 'center',
          py: 3.6,
          borderBottom: '2px dashed #32366a',
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>Murder Mystery 2 Deposit</Typography>
        <IconButton sx={{ position: 'absolute', top: 1, right: 1.25 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            px: 5,
            py: 3,
            gap: 1.5,
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
              TheMM2Bot
            </Button>
          </Stack>
          <Typography sx={{ color: '#CDCDCD', textAlign: 'center', py: 4 }}>
            Only trade items to the username above. Any items deposited will automatically be
            credited to the username in which the items came from. Hogging the bot to prevent other
            users from using it will result in a permanent ban from the use of our services.
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
