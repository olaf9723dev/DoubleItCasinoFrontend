import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, Button, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// theme
import { bgBlur } from 'src/theme/css';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import { DepositIcon } from 'src/components/icons';
import { useSettingsContext } from 'src/components/settings';
// reduce
import { useSelector } from 'src/store';
import CryptoDialog from 'src/sections/payment/crypto';
// import DepositMethodDialog from 'src/sections/payment/method-dialog';
import { HEADER } from '../config-layout';
import { HeaderMenu, LoginButton, AccountPopover } from '../_common';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

const MoneyIcon = () => (
  <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.86797 19.9501C5.62797 19.9501 5.42797 19.8701 5.26797 19.7101C5.1213 19.5501 5.04797 19.3567 5.04797 19.1301V17.2301L5.44797 17.6101C4.51464 17.5967 3.67464 17.4767 2.92797 17.2501C2.1813 17.0101 1.55464 16.7234 1.04797 16.3901C0.861302 16.2701 0.727969 16.1167 0.647969 15.9301C0.567969 15.7434 0.541302 15.5567 0.567969 15.3701C0.607969 15.1834 0.687969 15.0234 0.807969 14.8901C0.927969 14.7567 1.07464 14.6767 1.24797 14.6501C1.4213 14.6234 1.6213 14.6767 1.84797 14.8101C2.2613 15.0767 2.77464 15.3167 3.38797 15.5301C4.01464 15.7434 4.77464 15.8501 5.66797 15.8501C6.38797 15.8501 6.97464 15.7567 7.42797 15.5701C7.89464 15.3834 8.23464 15.1301 8.44797 14.8101C8.67464 14.4901 8.78797 14.1167 8.78797 13.6901C8.78797 13.3434 8.70797 13.0434 8.54797 12.7901C8.4013 12.5367 8.15464 12.3234 7.80797 12.1501C7.4613 11.9634 7.0013 11.8101 6.42797 11.6901L4.36797 11.2501C3.15464 10.9834 2.24797 10.5434 1.64797 9.93007C1.0613 9.31674 0.767969 8.51007 0.767969 7.51007C0.767969 6.7234 0.954635 6.0234 1.32797 5.41007C1.71464 4.79674 2.24797 4.31007 2.92797 3.95007C3.6213 3.59007 4.42797 3.3834 5.34797 3.33007L5.04797 3.61007V1.79007C5.04797 1.5634 5.1213 1.37007 5.26797 1.21007C5.42797 1.05007 5.62797 0.97007 5.86797 0.97007C6.09464 0.97007 6.28797 1.05007 6.44797 1.21007C6.60797 1.37007 6.68797 1.5634 6.68797 1.79007V3.61007L6.34797 3.33007C6.9613 3.3434 7.61464 3.47007 8.30797 3.71007C9.0013 3.93674 9.59464 4.2634 10.088 4.69007C10.248 4.8234 10.348 4.97674 10.388 5.15007C10.4413 5.3234 10.4413 5.49007 10.388 5.65007C10.348 5.81007 10.268 5.9434 10.148 6.05007C10.028 6.15674 9.87464 6.21674 9.68797 6.23007C9.5013 6.2434 9.3013 6.17674 9.08797 6.03007C8.6613 5.73674 8.18797 5.5034 7.66797 5.33007C7.1613 5.15674 6.55464 5.07007 5.84797 5.07007C4.91464 5.07007 4.17464 5.29007 3.62797 5.73007C3.0813 6.17007 2.80797 6.7434 2.80797 7.45007C2.80797 7.9834 2.97464 8.41674 3.30797 8.75007C3.6413 9.07007 4.2013 9.31674 4.98797 9.49007L7.08797 9.93007C8.36797 10.2101 9.31464 10.6434 9.92797 11.2301C10.5413 11.8167 10.848 12.5967 10.848 13.5701C10.848 14.3301 10.6546 15.0034 10.268 15.5901C9.8813 16.1634 9.34797 16.6234 8.66797 16.9701C8.0013 17.3034 7.22797 17.5101 6.34797 17.5901L6.68797 17.2101V19.1301C6.68797 19.3567 6.60797 19.5501 6.44797 19.7101C6.3013 19.8701 6.10797 19.9501 5.86797 19.9501Z"
      fill="url(#paint0_linear_1023_99)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1023_99"
        x1="5.16797"
        y1="-2.48993"
        x2="5.16797"
        y2="24.5101"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9482FF" />
        <stop offset="1" stopColor="#9280FF" />
      </linearGradient>
    </defs>
  </svg>
);

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();
  const settings = useSettingsContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isLoggedIn, user } = useSelector((state: any) => state.auth);

  const [open, setOpen] = useState<boolean>(false);

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  // const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  const handleSetOpen = () => {
    setOpen(!open);
  };

  const renderContent = (
    <>
      <Logo />
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ ml: { sm: 0, md: 2 } }}>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>
      )}
      <HeaderMenu />
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        {isLoggedIn ? (
          <>
            <Button
              variant="contained"
              size={isMobile ? 'small' : 'medium'}
              color="primary"
              startIcon={<DepositIcon />}
              onClick={handleSetOpen}
              sx={{
                maxHeight: '40px !important',
                borderRadius: 0.5,
                background: `linear-gradient(90deg, #663399 0%, #6c56f5 100%)`,
                '&:hover': {
                  background: `linear-gradient(180deg, #663399 0%, #6c56f5 100%)`
                }
              }}
            >
              Wallet
            </Button>
            <Button
              variant="contained"
              disabled
              size={isMobile ? 'small' : 'medium'}
              startIcon={<img src="/assets/unicred.png" alt="unicred" width={18} />}
              sx={{
                color: 'white !important',
                maxHeight: '40px !important',
                borderRadius: 0.5
              }}
            >
              {user?.balance?.toFixed(2) || 0}
            </Button>
            <AccountPopover />
            <CryptoDialog open={open} onClose={handleSetOpen} />
            {/* <DepositMethodDialog open={open} onClose={handleSetOpen} /> */}
          </>
        ) : (
          <LoginButton />
        )}
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter
        }),
        ...(lgUp && {
          height: HEADER.H_DESKTOP,
          background: 'linear-gradient(90deg, rgb(91 61 114 / 36%) 0%, rgb(24 22 43) 100%)',
          backgroundBlendMode: 'overlay',
          boxShadow: '0px 14px 60px 0px rgba(0, 0, 0, 0.25)',
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`
          })
        })
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 }
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
