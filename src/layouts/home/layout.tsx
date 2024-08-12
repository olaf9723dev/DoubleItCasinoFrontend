// @mui
import { Box, Stack } from '@mui/material';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import { useSettingsContext } from 'src/components/settings';
//
import Main from './main';
import ChatWrapper from './chat';
import Header from './header';
import NavMini from './nav-mini';
import NavVertical from './nav-vertical';
import NavHorizontal from './nav-horizontal';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  const nav = useBoolean();

  const isHorizontal = settings.themeLayout === 'horizontal';

  const isMini = settings.themeLayout === 'mini';

  const renderNavMini = <NavMini />;

  const renderHorizontal = <NavHorizontal />;

  const renderNavVertical = <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />;

  if (isHorizontal) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        {lgUp ? renderHorizontal : renderNavVertical}

        <Main>{children}</Main>
      </>
    );
  }

  if (isMini) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {lgUp ? renderNavMini : renderNavVertical}

          <Main
            sx={{
              background: `radial-gradient(91.15% 56.56% at 21.54% -0.84%, rgba(88, 105, 255, 0.11) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(81.52% 52.52% at 75.96% 76.81%, rgba(112, 88, 255, 0.04) 0%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(69deg, #151727 0%, #141122 100%)`,
            }}
          >
            {children}
          </Main>

          <ChatWrapper />
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={nav.onTrue} />

      <Stack
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {renderNavVertical}

        <Main
          sx={{
            background: `radial-gradient(91.15% 56.56% at 21.54% -0.84%, rgba(88, 105, 255, 0.11) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(81.52% 52.52% at 75.96% 76.81%, rgba(112, 88, 255, 0.04) 0%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(69deg, #151727 0%, #141122 100%)`,
            height: `100vh`,
          }}
        >
          {children}
        </Main>

        <ChatWrapper />
      </Stack>
    </>
  );
}
