// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Grid, Paper, Box, Typography, CardContent } from '@mui/material';
// theme
import { bgGradient } from 'src/theme/css';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';
// config
import { ASSETS_API } from 'src/config-global';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
  title: string;
};

export default function GameCarousel({ data, title }: Props) {
  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
    slidesToShow: 3.5,
    centerMode: true,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3.5 }
      },
      {
        breakpoint: 960,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 2.5 }
      },
      {
        breakpoint: 720,
        settings: { slidesToShow: 2.2 }
      },
      {
        breakpoint: 660,
        settings: { slidesToShow: 1.8 }
      },
      {
        breakpoint: 570,
        settings: { slidesToShow: 1.5 }
      },
      {
        breakpoint: 500,
        settings: { slidesToShow: 1.2 }
      },
      {
        breakpoint: 440,
        settings: { slidesToShow: 1 }
      },
      {
        breakpoint: 400,
        settings: { slidesToShow: 1, centerPadding: '40px' }
      },
      {
        breakpoint: 360,
        settings: { slidesToShow: 1, centerPadding: '20px' }
      },
      {
        breakpoint: 320,
        settings: { slidesToShow: 1, centerPadding: '0' }
      }
    ]
  });

  return (
    <Grid container gap={2}>
      <Typography sx={{ fontSize: 18, fontWeight: 400, borderBottom: `2px solid #6c56f5` }}>
        {title}
      </Typography>
      <Grid
        item
        xs={12}
        sx={{
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {data.length > 1 ? (
          <CarouselArrows
            filled
            icon="noto:rightwards-hand"
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
          >
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {data.map((item: any, ind: number) => (
                <Box key={ind} sx={{ px: 1 }}>
                  <CarouselItem item={item} />
                </Box>
              ))}
            </Carousel>
          </CarouselArrows>
        ) : (
          <Box sx={{ px: 1 }}>
            <CarouselItem item={data[0]} />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    title: string;
    description: string;
    coverUrl: string;
  };
};

function CarouselItem({ item }: CarouselItemProps) {
  const theme = useTheme();

  const { coverUrl, title } = item;

  return (
    <Paper
      sx={{
        borderRadius: 2,
        border: '1px solid #6c56f5',
        overflow: 'hidden',
        position: 'relative',
        my: 1,
        width: '200px',
        height: '240px',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }}
    >
      <Image
        alt={title}
        src={`${ASSETS_API}/${coverUrl}`}
        ratio="1/1"
        sx={{ width: '200px', height: '240px' }}
      />
      <CardContent
        sx={{
          bottom: 0,
          zIndex: 9,
          width: '100%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
          ...bgGradient({
            direction: 'to top',
            startColor: `${theme.palette.grey[900]} 5%`,
            endColor: `${alpha(theme.palette.grey[900], 0)} 100%`
          })
        }}
      >
        <TextMaxLine variant="h6" sx={{ mb: 0.5 }}>
          {title}
        </TextMaxLine>
      </CardContent>
    </Paper>
  );
}
