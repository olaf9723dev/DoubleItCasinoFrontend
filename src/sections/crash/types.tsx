import React, { useState } from 'react';
import { CardProps } from '@mui/material/Card';
import { UserType } from 'src/types';

export type TabPanelProps = 'manual' | 'auto';

export type PlayerProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  userName: string;
  stoppedAt: number;
  betAmount: number;
};

export type RowProps = {
  id: string;
  name: string;
  odds: number;
  amount: number;
  avatarUrl: string;
};

export type PlayerType = {
  firstName: string;
  lastName: string;
  avatar: string;
  status: number;
  playerID: string;
  betAmount: number;
  autoCashOut?: number;
  createdAt?: string;
  forcedCashout?: number;
  stoppedAt?: number;
  winningAmount?: number;
};

export type BetType = {
  status: number;
  playerID: string;
  stoppedAt: number;
  winningAmount: number;
};

export type GameEndType = {
  _id: string;
  crashPoint: number;
  publicSeed: string;
  privateHash: string;
  privateSeed: string;
};

export type GameHistoryType = {
  _id: string;
  user: UserType;
  gameid: string;
  type: string;
  bet: number;
  target: number;
  payout: number;
  createdAt: string;
};

export interface TableProps extends CardProps {
  tableLabels: any;
  title?: string;
  subheader?: string;
  tableData: GameHistoryType[];
}
