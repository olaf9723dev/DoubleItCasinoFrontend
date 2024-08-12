import { Navigate, useRoutes } from 'react-router-dom';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
//
import { mainRoutes } from './main';

// import { authRoutes } from './auth';
import { homeRoutes } from './home';
import { withdrawRoutes } from './withdraw';
import { faqRoutes } from './faq';
import { termsRoutes } from './terms';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    },

    // // Auth routes
    // ...authRoutes,

    // Home routes
    ...homeRoutes,

    // Withdraw routes
    ...withdrawRoutes,

    // FAQ routes
    ...faqRoutes,

    // TERMS routes
    ...termsRoutes,

    // Main routes
    ...mainRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
