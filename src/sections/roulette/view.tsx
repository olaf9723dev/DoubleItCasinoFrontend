// @mui
import { Grid, Container, Stack, Typography } from '@mui/material';

// components
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';

import GameContent from './game-content';
import GameHistory from './game-history';

// ----------------------------------------------------------------------

export default function RouletteView() {
  const settings = useSettingsContext();

  return (
    <Scrollbar sx={{ height: `100%` }}>
      <Stack
        sx={{
          height: `90px`,
          alignItems: 'center',
          borderBottom: `1px solid #272951`
        }}
      >
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Stack
            sx={{
              height: `90px`,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5
            }}
          >
            <Typography sx={{ fontSize: 28, fontWeight: 400 }}>Roulette</Typography>
          </Stack>
        </Container>
      </Stack>
      <Grid container spacing={5} sx={{ px: 3, py: 2 }}>
        <Grid item xs={12}>
          <GameContent />
        </Grid>
        <Grid item xs={12}>
          <GameHistory />
        </Grid>
      </Grid>
    </Scrollbar>
  );
}
