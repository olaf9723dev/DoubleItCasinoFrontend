import { DialogProps } from '@mui/material/Dialog';

export type ActiveProps = 'username' | 'verify';

export interface LoginDialogProps extends DialogProps {
  open: boolean;
  onClose: () => void;
}
