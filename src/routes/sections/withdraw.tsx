import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import AuthGuard from 'src/utils/authguard';
// layouts
import HomeLayout from 'src/layouts/home';
// components
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/withdraw'));

// ----------------------------------------------------------------------

export const withdrawRoutes = [
  {
    path: 'withdraw',
    element: (
      <AuthGuard>
        <HomeLayout>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </HomeLayout>
      </AuthGuard>
    ),
    children: [{ element: <IndexPage />, index: true }],
  },
];
