import { Helmet } from 'react-helmet-async';
// sections
import { APP_NAME } from 'src/config-global';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> {`${APP_NAME}: Home`}</title>
      </Helmet>
    </>
  );
}
