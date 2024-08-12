// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// theme
import { hideScroll } from 'src/theme/css';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { NavSectionMini } from 'src/components/nav-section';
//
import { NAV, HEADER } from '../config-layout';
import { useNavData } from './config-navigation';
import { NavToggleButton } from '../_common';

// ----------------------------------------------------------------------

export default function NavMini() {
  const { user } = useMockedUser();

  const navData = useNavData();

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
        height: { lg: `calc(100% - ${HEADER.H_DESKTOP + 1}px)` },
      }}
    >
      <NavToggleButton
        sx={{
          top: HEADER.H_DESKTOP + 22,
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          top: HEADER.H_DESKTOP,
          height: `calc(100% - ${HEADER.H_DESKTOP + 1}px)`,
          paddingY: 2,
          // pb: 2,
          // height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        {/* <Logo sx={{ mx: 'auto', my: 2 }} /> */}

        <NavSectionMini
          data={navData}
          config={{
            currentRole: user?.role || 'admin',
          }}
        />
      </Stack>
    </Box>
  );
}
