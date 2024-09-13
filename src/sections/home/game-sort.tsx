import React, { useState, useCallback, useEffect } from 'react';
// @mui
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
// components
import Image from 'src/components/image';
// theme
import { bgGradient } from 'src/theme/css';
//
import CasinoImg from 'src/assets/sort/casino_game.png';
import CSImg from 'src/assets/sort/cs_game.png';
import PVPImg from 'src/assets/sort/pvp_game.png';

const game_sorts = [
  { coverUrl: CasinoImg, title: 'Casino Games' },
  { coverUrl: CSImg, title: 'CS Games' },
  { coverUrl: PVPImg, title: 'PVP Games' }
];

export default function GameSort() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={3}>
      {game_sorts.map((item: any, ind: number) => (
        <Grid key={ind} item xs={12} sm={4}>
          <Box
            sx={{
              boxShadow: theme.customShadows.z16,
              position: 'relative',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            <Image
              dir="ltr"
              alt={item.title}
              src={item.coverUrl}
              ratio="1/1"
              sx={{
                borderRadius: 2
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 1,
                height: 1,
                borderRadius: 2,
                '&:hover': {
                  ...bgGradient({
                    direction: 'to top',
                    startColor: `#663399 0%`,
                    endColor: `${alpha('#6c56f5', 0)} 30%`
                  })
                }
              }}
            />
            <Box
              sx={{
                top: 20,
                left: 20,
                position: 'absolute'
              }}
            >
              <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
                {item.title}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
