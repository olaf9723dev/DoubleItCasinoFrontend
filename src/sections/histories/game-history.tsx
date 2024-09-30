import React, { useState, useCallback, useEffect } from 'react';
// @mui
import { Tabs, Tab, Stack, Typography } from '@mui/material';

// components
import useApi from 'src/hooks/use-api';
import { crashSocket } from 'src/utils/socket';
import GameHistoryTableComponent from './history-table';
import { GameHistoryType } from './types';

// ----------------------------------------------------------------------
const TABS = [
  {
    value: 'latest_bets',
    label: 'Latest Bets'
  },
  {
    value: 'high_rollers',
    label: 'High rollers'
  },
  {
    value: 'luckiest_wins',
    label: 'luckiest wins'
  }
];

export default function GameHistory() {
  const [currentTab, setCurrentTab] = useState('latest_bets');
  const { getGameHistory } = useApi();

  const [histories, setHistories] = useState<GameHistoryType[]>([]);

  const getData = useCallback(async () => {
    const res = await getGameHistory();
    if (!res?.data) return;
    setHistories(res.data);
  }, [getGameHistory]);

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const addHistory = (history: GameHistoryType[]) => {
      setHistories([...history, ...histories]);
    };

    crashSocket.on('game-end-history', addHistory);
    return () => {
      crashSocket.off('game-end-history', addHistory);
    };
  }, [histories]);

  return (
    <Stack>
      <Typography sx={{ fontSize: 28 }}>Live Feed</Typography>
      <Stack sx={{ borderBottom: 1, borderColor: 'divider', gap: 2 }}>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            '& .MuiTabs-indicator': {
              background: 'linear-gradient(180deg, #C8CAFF 0%, #7C83C5 100%)'
            }
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              sx={{
                textTransform: 'uppercase',
                background: `linear-gradient(180deg, #C8CAFF 0%, #7C83C5 100%)`,
                backgroundClip: `text`,
                WebkitBackgroundClip: `text`,
                WebkitTextFillColor: `transparent`
              }}
            />
          ))}
        </Tabs>
        <GameHistoryTableComponent
          title="Best Salesman"
          tableData={histories}
          tableLabels={[
            { id: 'type', label: 'Game' },
            { id: 'userName', label: 'Username', avatar: true },
            { id: 'createdAt', label: 'Time', align: 'center', date: true },
            { id: 'bet', label: 'Bet', align: 'center', unit: '$' },
            { id: 'target', label: 'Multiplier', align: 'center', unit: 'x' },
            { id: 'payout', label: 'Payout', align: 'right', unit: '$' }
          ]}
          sx={{ background: `transparent` }}
        />
      </Stack>
    </Stack>
  );
}
