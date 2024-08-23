import { useState } from 'react';
import {
  Box,
  Grid,
  Stack,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'src/components/image';
import { StyledScrollbar } from 'src/components/scrollbar/styles';
import { MethodDialogProps, MethodOpenProps } from './types';
import MM2Dialog from './mm2';
import PSXDialog from './psx';
import CryptoDialog from './crypto';
import AdoptMeDialog from './adopt-me';

const _MethodData = [
  {
    id: 'crypto',
    name: 'Crypto'
  },
  {
    id: 'unicred',
    name: 'UniCred'
  },
  {
    id: 'visa',
    name: 'Visa'
  },
  {
    id: 'gift',
    name: 'Gift'
  }
];

const defaultState = {
  adopt_me: false,
  mm2: false,
  psx: false,
  crypto: false
};

export default function MethodDialog({ open, onClose }: MethodDialogProps) {
  const [state, setState] = useState<MethodOpenProps>(defaultState);

  const handleSelectMethod = (id: string) => {
    setState({ ...state, [id]: true });
    onClose();
  };

  const onCloseDialog = () => {
    setState(defaultState);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="method-dialog-title"
        aria-describedby="method-dialog-description"
        sx={{
          '& .MuiPaper-root': {
            maxWidth: { xm: '100%', sm: '100%', md: `640px` },
            width: `100%`,
            border: '2px solid #32366a',
            position: `relative`,
            background: `linear-gradient(180deg, #191B35 0%, #1F203C 100%)`
          }
        }}
      >
        <DialogTitle
          id="method-dialog-title"
          sx={{
            textAlign: 'center',
            py: 3.6,
            borderBottom: '2px dashed #32366a'
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: 'white' }}>
            Deposit Method
          </Typography>
          <IconButton sx={{ position: 'absolute', top: 1, right: 1.25 }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack
            sx={{
              py: 3,
              px: { xm: 1.4, sm: 2 },
              gap: 1.25
            }}
          >
            <StyledScrollbar>
              <Stack p={1.25} direction="row">
                {_MethodData.map((row) => (
                  <Grid key={row.id} item xs={3} md={3} pr={2}>
                    <Button
                      onClick={() => handleSelectMethod(row.id)}
                      sx={{
                        py: 2.4,
                        px: 1.8,
                        gap: 0.5,
                        borderRadius: 1.25,
                        flexDirection: 'column',
                        border: `1px solid #454779`,
                        boxShadow: '0px 7px 10px 1px rgb(2 2 2 / 49%)',
                        background:
                          'linear-gradient(rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 0%) 95%),linear-gradient(180deg, rgb(80 88 167 / 29%) 0%, rgb(255 255 255 / 0%) 112.23%)'
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.2,
                          borderRadius: 0.5,
                          border: `2px solid #303462`,
                          bgcolor: '#1a1c36'
                        }}
                      >
                        <Image
                          src={`/assets/icons/deposit/${row.id}.png`}
                          alt={row.id}
                          sx={{
                            width: 70,
                            height: 70
                          }}
                        />
                      </Box>
                      <Typography sx={{ fontSize: 14, textAlign: 'center', color: 'white' }}>
                        {row.name}
                      </Typography>
                    </Button>
                  </Grid>
                ))}
              </Stack>
            </StyledScrollbar>
            <Typography sx={{ fontSize: 12, textAlign: 'center', mt: 4 }}>
              By depositing, you acknowledge that you are at least 18 years of age and agree to our
              Terms of Service.
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
      {state.psx && <PSXDialog open={state.psx} onClose={onCloseDialog} />}
      {state.mm2 && <MM2Dialog open={state.mm2} onClose={onCloseDialog} />}
      {state.crypto && <CryptoDialog open={state.crypto} onClose={onCloseDialog} />}
      {state.adopt_me && <AdoptMeDialog open={state.adopt_me} onClose={onCloseDialog} />}
    </>
  );
}
