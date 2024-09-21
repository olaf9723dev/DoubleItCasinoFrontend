// @mui
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
// components
import Image from 'src/components/image';
// theme
import { bgGradient } from 'src/theme/css';
// config
import { ASSETS_API } from 'src/config-global';
//

type Props = {
  data: {
    _id: string;
    title: string;
    coverUrl: string;
  }[];
};

export default function GameSort({ data }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={3}>
      {data?.map((item: any, ind: number) => (
        <Grid key={ind} item xs={12} sm={4}>
          <Box
            sx={{
              boxShadow: theme.customShadows.z16,
              position: 'relative',
              borderRadius: 2.4,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
            className="game-sort-item"
          >
            <Image
              dir="ltr"
              alt={item.title}
              src={`${ASSETS_API}/${item.coverUrl}`}
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
