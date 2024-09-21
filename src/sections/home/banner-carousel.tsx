import { useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Paper, Button, Typography, CardContent, useMediaQuery } from '@mui/material';
// components
import Image from 'src/components/image';
import { MotionContainer, varFade } from 'src/components/animate';
import Carousel, { CarouselDots, CarouselArrows, useCarousel } from 'src/components/carousel';
// theme
import { bgGradient } from 'src/theme/css';
// config
import { ASSETS_API } from 'src/config-global';
//
import LoginDialog from 'src/sections/auth/login';
// ----------------------------------------------------------------------

type Props = {
  data: {
    _id: string;
    title: string;
    coverUrl: string;
  }[];
};

export default function BannerCarousel({ data }: Props) {
  const theme = useTheme();

  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
    ...CarouselDots({
      rounded: true,
      sx: { mt: { xs: 1, sm: 2 } }
    })
  });

  return (
    <Box
      sx={{
        position: 'relative',
        '& .slick-list': {
          borderRadius: 2,
          boxShadow: theme.customShadows.z16
        }
      }}
    >
      <CarouselArrows filled shape="rounded" onNext={carousel.onNext} onPrev={carousel.onPrev}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data?.map((item, index) => (
            <CarouselItem key={item._id} item={item} active={index === carousel.currentIndex} />
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    title: string;
    coverUrl: string;
  };
  active: boolean;
};

function CarouselItem({ item, active }: CarouselItemProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const { coverUrl, title } = item;

  const variants = theme.direction === 'rtl' ? varFade().inLeft : varFade().inRight;

  return (
    <>
      <Paper sx={{ position: 'relative', height: { xs: '260px', sm: '360px' } }}>
        <Image
          dir="ltr"
          alt={title}
          src={`${ASSETS_API}/${coverUrl}`}
          ratio="16/9"
          sx={{ height: { xs: '260px', sm: '360px' } }}
        />
        <Box
          sx={{
            top: 0,
            width: 1,
            height: 1,
            position: 'absolute',
            ...bgGradient({
              direction: 'to top',
              startColor: `${theme.palette.grey[900]} 0%`,
              endColor: `${alpha(theme.palette.grey[900], 0)} 100%`
            })
          }}
        />
        <CardContent
          component={MotionContainer}
          animate={active}
          action
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            textAlign: 'center',
            position: 'absolute',
            color: 'common.white'
          }}
        >
          <m.div variants={variants}>
            <Typography variant={isMobile ? 'h5' : 'h3'} gutterBottom>
              {item.title}
            </Typography>
          </m.div>
          <m.div variants={variants}>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              sx={{
                mt: { xs: 1, sm: 3 },
                height: { xs: '42px', sm: '50px' },
                width: { xs: '140px', sm: '200px' },
                borderRadius: 0.5,
                background: `linear-gradient(90deg, #663399 0%, #6c56f5 100%)`,
                '&:hover': {
                  background: `linear-gradient(180deg, #663399 0%, #6c56f5 100%)`
                }
              }}
              onClick={() => setShowLogin(true)}
            >
              Login
            </Button>
          </m.div>
        </CardContent>
      </Paper>
      <LoginDialog open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
