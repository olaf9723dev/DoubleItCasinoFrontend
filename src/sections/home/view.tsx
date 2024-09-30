import { useState, useEffect, useCallback } from 'react';
// @mui
import { Grid } from '@mui/material';
// components
import Scrollbar from 'src/components/scrollbar';
// hooks
import useApi from 'src/hooks/use-api';
//
import BannerCarousel from './banner-carousel';
import GameSort from './game-sort';
import GameCarousel from './game-carousel';
import GameHistory from '../histories/game-history';

export default function HomeView() {
  const { getHomeSettings } = useApi();
  const [homeSettings, setHomeSettings] = useState<any>({});

  const getData = useCallback(async () => {
    const res = await getHomeSettings();
    if (!res?.data) return;
    setHomeSettings(res.data);
  }, [getHomeSettings]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Scrollbar sx={{ height: `100%` }}>
      <Grid container gap={5} sx={{ px: 3, py: 2 }}>
        {homeSettings?.banners?.length > 0 && (
          <Grid item xs={12}>
            <BannerCarousel data={homeSettings?.banners} />
          </Grid>
        )}
        {homeSettings?.sorts?.length > 0 && (
          <>
            <Grid item xs={12}>
              <GameSort data={homeSettings?.sorts} />
            </Grid>
            {homeSettings?.sorts?.map((item: any, ind: number) => (
              <Grid key={ind} item xs={12}>
                <GameCarousel data={item.games} title={item.title} />
              </Grid>
            ))}
          </>
        )}
        <Grid item xs={12}>
          <GameHistory />
        </Grid>
      </Grid>
    </Scrollbar>
  );
}
