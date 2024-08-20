import { DialogProps } from '@mui/material/Dialog';

export type MethodOpenProps = {
  adopt_me: boolean;
  mm2: boolean;
  psx: boolean;
  crypto: boolean;
};

export interface MethodDialogProps extends DialogProps {
  open: boolean;
  onClose: () => void;
}
