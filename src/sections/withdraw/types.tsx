import { DialogProps } from '@mui/material/Dialog';

export type IList = {
  _id: string;
  name: string;
  img: string;
  amount: number;
  status: number;
};

export type ItemProps = {
  selected: string[];
  list: IList[];
  onCancel: (id: string) => void;
};

export type ListItemProps = {
  selected: boolean;
  row: IList;
  onSelected: VoidFunction;
};

export interface WithdrawDialogProps extends DialogProps {
  open: boolean;
  onClose: () => void;
}
