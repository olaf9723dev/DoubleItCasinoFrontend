import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import HomeLayout from 'src/layouts/home';
// components
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/home/crash'));
const PageCoinflip = lazy(() => import('src/pages/home/coinflip'));
const PageDiscord = lazy(() => import('src/pages/home/discord'));
const PageTwitter = lazy(() => import('src/pages/home/twitter'));

// ----------------------------------------------------------------------

export const homeRoutes = [
  {
    path: 'home',
    element: (
      <HomeLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </HomeLayout>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'coinflip', element: <PageCoinflip /> },
      { path: 'discord', element: <PageDiscord /> },
      { path: 'twitter', element: <PageTwitter /> },
    ],
  },
];
