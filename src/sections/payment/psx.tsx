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

import { MethodDialogProps } from './types';

export default function PSXDialog({ open, onClose }: MethodDialogProps) {
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
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>Pet Simulator X Deposit</Typography>
        <IconButton sx={{ position: 'absolute', top: 1, right: 1.25 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            px: 3,
            py: 3,
            gap: 1.5,
          }}
        >
          <Stack sx={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
            <Typography sx={{ fontSize: 20 }}>1. Send through mailbox to: </Typography>
            <Button
              variant="text"
              sx={{
                borderRadius: 1.25,
                border: `1px solid #34386c`,
                bgcolor: `rgba(0, 0, 0, 0.27)`,
                p: '5px 15px',
              }}
            >
              ThePSXBot
            </Button>
          </Stack>
          <Stack
            sx={{
              p: 3,
              borderRadius: 1.25,
              justifyContent: 'space-between',
              border: `1px solid #34386c`,
              bgcolor: `rgba(0, 0, 0, 0.27)`,
              gap: 2,
            }}
          >
            <Typography>What items are accepted?</Typography>
            <Typography
              sx={{
                fontSize: 13,
                color: `rgba(234, 234, 234, 0.60)`,
              }}
            >
              We accept any items from Pet Simulator X that are above the rarity of Exclusive. This
              can be pets, gifts, etc. We also accept gems.
            </Typography>
          </Stack>
          <Stack
            sx={{
              p: 3,
              borderRadius: 1.25,
              justifyContent: 'space-between',
              border: `1px solid #34386c`,
              bgcolor: `rgba(0, 0, 0, 0.27)`,
              gap: 2,
            }}
          >
            <Typography>What is the current gem rate?</Typography>
            <Typography
              sx={{
                fontSize: 13,
                color: `rgba(234, 234, 234, 0.60)`,
              }}
            >
              The current gem conversion rate is 1T = $5.00
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
