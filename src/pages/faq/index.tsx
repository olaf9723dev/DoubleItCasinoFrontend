import { Helmet } from 'react-helmet-async';
// sections
import { APP_NAME } from 'src/config-global';
import OneView from 'src/sections/faq/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`${APP_NAME}: FAQ`}</title>
      </Helmet>

      <OneView />
    </>
  );
}
