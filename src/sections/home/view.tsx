// @mui
import { Grid } from '@mui/material';
// components
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
// _mock
import { _mock } from 'src/_mock';
//
import BannerCarousel from './banner-carousel';
import GameSort from './game-sort';
import GameHistory from './game-history';

const _carouselsExample = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  coverUrl: _mock.image.cover(index),
  description: _mock.description(index)
}));

export default function HomeView() {
  const settings = useSettingsContext();

  return (
    <Scrollbar sx={{ height: `100%` }}>
      <Grid container gap={5} sx={{ px: 3, py: 2 }}>
        <Grid item xs={12}>
          <BannerCarousel data={_carouselsExample.slice(8, 12)} />
        </Grid>
        <Grid item xs={12}>
          <GameSort />
        </Grid>
        <Grid item xs={12}>
          <GameHistory />
        </Grid>
      </Grid>
    </Scrollbar>
  );
}
