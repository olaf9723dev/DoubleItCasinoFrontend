import { ReactElement } from 'react';
import { DialogProps } from '@mui/material/Dialog';

export type GuardProps = {
  children: ReactElement | null;
};

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export type IChatAttachment = {
  name: string;
  size: number;
  type: string;
  path: string;
  preview: string;
  createdAt: Date;
  modifiedAt: Date;
};

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  userId: string;
  balance: number;
  userName: string;
};

export type IChatMessage = {
  _id: string;
  content: string;
  sender: UserType;
  createdAt: string;
};

export type IChatParticipant = {
  id: string;
  name: string;
  role: string;
  email: string;
  address: string;
  avatarUrl: string;
  phoneNumber: string;
  lastActivity: Date;
  status: 'online' | 'offline' | 'alway' | 'busy';
};

export type CoinflipRoom = {
  api: any;
  _id: string;
  side: boolean;
  amount: number;
  joiner: UserType;
  createdAt: string;
  creator: UserType;
  state: 'not' | 'end';
  result: 'creator' | 'joiner';
};

export interface GameDialogProps extends DialogProps {
  open: boolean;
  onClose: () => void;
  data: CoinflipRoom;
}

export type Event = {
  name: string;
  handler(...args: any[]): any;
};

export type ApiContextType = {
  initialize: () => Promise<any>;
  login: (emailOrUsername: string, password: string) => Promise<any>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    userName: string,
    password: string
  ) => Promise<any>;
  getUsers: () => Promise<any>;
  getUserId: (data: string) => Promise<any>;
  confirmPhrase: (data: number) => Promise<any>;
  getChatHistory: () => Promise<any>;
  getCoinFlip: () => Promise<any>;
  getCrashSchema: () => Promise<any>;
  getGameHistory: () => Promise<any>;
  getUserCrashData: () => Promise<any>;
  getLimboSchema: (userId: string) => Promise<any>;
  betLimbo: (userId: string, betAmount: number, cashOut: number) => Promise<any>;
  startBetMine: (
    userId: string,
    betAmount: number,
    gridCount: number,
    mineCount: number,
    playType: string,
    turboList: number[]
  ) => Promise<any>;
  cancelBetMine: (userId: string, playId: string) => Promise<any>;
  cashoutBetMine: (userId: string, playId: string) => Promise<any>;
  checkMine: (userId: string, playId: string, order: number) => Promise<any>;
  getMineProfitSetting: (gridCount: number, mineCount: number) => Promise<any>;
  startBetRoulette: (userId: string, bet: any, betAmount: number) => Promise<any>;
  getCurrencies: () => Promise<any>;
  deposit: (currency: string, amount: number) => Promise<any>;
  getWithdrawalItems: () => Promise<any>;
  withdraw: (itemIds: string[]) => Promise<any>;
};

export type SocketContextType = {
  connected: boolean;
  socket: any;
  send: (url: string, data: any) => Promise<any>;
};
