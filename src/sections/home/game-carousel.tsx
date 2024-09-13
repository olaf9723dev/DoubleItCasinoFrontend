// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Grid, Paper, Box, Typography, CardContent, Link } from '@mui/material';
// theme
import { bgGradient } from 'src/theme/css';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';

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
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' }
      }
    ]
  });

  return (
    <Grid container gap={2}>
      <Typography sx={{ fontSize: 24, fontWeight: 400, borderBottom: `2px solid #6c56f5` }}>
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
        <CarouselArrows
          filled
          icon="noto:rightwards-hand"
          onNext={carousel.onNext}
          onPrev={carousel.onPrev}
        >
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {data.map((item) => (
              <Box key={item.id} sx={{ px: 1 }}>
                <CarouselItem item={item} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
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
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Image alt={title} src={coverUrl} ratio="1/1" />
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
            startColor: `${theme.palette.grey[900]} 25%`,
            endColor: `${alpha(theme.palette.grey[900], 0)} 100%`
          })
        }}
      >
        <TextMaxLine variant="h4" sx={{ mb: 2 }}>
          {title}
        </TextMaxLine>
      </CardContent>
    </Paper>
  );
}
