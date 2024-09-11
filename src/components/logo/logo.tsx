import { forwardRef } from 'react';
// @mui
import { Stack, Link, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
// routes
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  loading?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, loading = false, sx, ...other }, ref) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    // OR using local (public folder)
    // -------------------------------------------------------
    const logo = (
      <Stack flexDirection="row" sx={{ cursor: 'pointer', minWidth: 60, ...sx }}>
        {!loading && !isMobile && (
          <>
            <Box style={{ height: '40px' }} component="img" src="/logo/logo_desktop.png" />
          </>
        )}
        {isMobile && (
          <>
            <Box
              component="img"
              src="/logo/logo_mobile.png"
              style={{ width: '50px', height: '50px' }}
            />
          </>
        )}
      </Stack>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
