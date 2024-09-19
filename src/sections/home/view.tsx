import { useState, useEffect, useCallback } from 'react';
// @mui
import { Grid } from '@mui/material';
// components
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
// _mock
import { _mock } from 'src/_mock';
// hooks
import useApi from 'src/hooks/use-api';
//
import BannerCarousel from './banner-carousel';
import GameCarousel from './game-carousel';
import GameSort from './game-sort';
import GameHistory from './game-history';

const _carouselsExample = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  coverUrl: _mock.image.cover(index),
  description: _mock.description(index)
}));

export default function HomeView() {
  const { getBanners } = useApi();
  const [banners, setBanners] = useState<any[]>([]);

  const getData = useCallback(async () => {
    const res = await getBanners(true);
    if (!res?.data) return;
    setBanners(res.data);
  }, [getBanners]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Scrollbar sx={{ height: `100%` }}>
      <Grid container gap={5} sx={{ px: 3, py: 2 }}>
        <Grid item xs={12}>
          <BannerCarousel data={banners} />
        </Grid>
        <Grid item xs={12}>
          <GameSort />
        </Grid>
        <Grid item xs={12}>
          <GameCarousel data={_carouselsExample.slice(8, 16)} title="Casino Games" />
        </Grid>
        <Grid item xs={12}>
          <GameCarousel data={_carouselsExample.slice(8, 16)} title="CS Games" />
        </Grid>
        <Grid item xs={12}>
          <GameCarousel data={_carouselsExample.slice(8, 16)} title="PVP Games" />
        </Grid>
        <Grid item xs={12}>
          <GameHistory />
        </Grid>
      </Grid>
    </Scrollbar>
  );
}
