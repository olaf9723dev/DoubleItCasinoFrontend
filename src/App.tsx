import { useEffect } from 'react';

// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

import 'aos/dist/aos.css';
import 'src/assets/scss/games.scss';
import './index.css';

import AOS from 'aos';

import ThemeProvider from 'src/theme';
import Router from 'src/routes/sections';
import ProgressBar from 'src/components/progress-bar';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';

import { useSelector } from './store';
import { ApiProvider } from './contexts/ApiContext';
import { SocketProvider } from './contexts/SocketContext';
import { authenticateSockets } from './utils/socket';
import EventHandler from './utils/event-handler';

export default function App() {
  const { token, isLoggedIn } = useSelector((status) => status.auth);

  useScrollToTop();

  useEffect(() => {
    if (isLoggedIn) authenticateSockets(token);
  }, [isLoggedIn, token]);

  useEffect(() => {
    setTimeout(() => {
      AOS.init();
    }, 500);
  }, []);

  return (
    <SettingsProvider
      defaultSettings={{
        themeMode: 'dark', // 'light' | 'dark'
        themeDirection: 'ltr', //  'rtl' | 'ltr'
        themeContrast: 'default', // 'default' | 'bold'
        themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
        themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
        themeStretch: false
      }}
    >
      <ThemeProvider>
        <MotionLazy>
          <SnackbarProvider>
            <SettingsDrawer />
            <ProgressBar />
            <EventHandler />
            <SocketProvider>
              <ApiProvider>
                <Router />
              </ApiProvider>
            </SocketProvider>
          </SnackbarProvider>
        </MotionLazy>
      </ThemeProvider>
    </SettingsProvider>
  );
}
