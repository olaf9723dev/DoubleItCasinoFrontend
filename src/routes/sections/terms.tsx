import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import HomeLayout from 'src/layouts/home';
// components
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/terms'));

// ----------------------------------------------------------------------

export const termsRoutes = [
  {
    path: 'terms',
    element: (
      <HomeLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </HomeLayout>
    ),
    children: [{ element: <IndexPage />, index: true }],
  },
];
