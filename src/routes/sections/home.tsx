import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import HomeLayout from 'src/layouts/home';
// components
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/home'));
const PageCrash = lazy(() => import('src/pages/home/crash'));
const PageCoinflip = lazy(() => import('src/pages/home/coinflip'));
const PageLimbo = lazy(() => import('src/pages/home/limbo'));
const PageMine = lazy(() => import('src/pages/home/mine'));
const PageRoulette = lazy(() => import('src/pages/home/roulette'));
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
      { path: 'crash', element: <PageCrash /> },
      { path: 'coinflip', element: <PageCoinflip /> },
      { path: 'limbo', element: <PageLimbo /> },
      { path: 'mine', element: <PageMine /> },
      { path: 'roulette', element: <PageRoulette /> },
      { path: 'discord', element: <PageDiscord /> },
      { path: 'twitter', element: <PageTwitter /> }
    ]
  }
];
