import { Helmet } from 'react-helmet-async';
// sections
import { APP_NAME } from 'src/config-global';
import HomeView from 'src/sections/home/view';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> {`${APP_NAME}: Home`}</title>
      </Helmet>

      <HomeView />
    </>
  );
}
