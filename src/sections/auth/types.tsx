import { DialogProps } from '@mui/material/Dialog';

export type ActiveProps = 'login' | 'register';

export interface LoginDialogProps extends DialogProps {
  open: boolean;
  onClose: () => void;
}
