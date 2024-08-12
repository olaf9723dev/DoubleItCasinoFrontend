import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import HomeLayout from 'src/layouts/home';
// components
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/faq'));

// ----------------------------------------------------------------------

export const faqRoutes = [
  {
    path: 'faq',
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
