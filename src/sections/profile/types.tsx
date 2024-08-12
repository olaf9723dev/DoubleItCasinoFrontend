import { DialogProps } from '@mui/material/Dialog';

export interface ProfileDialogProps extends DialogProps {
  open: boolean;
  onClose: () => void;
}
