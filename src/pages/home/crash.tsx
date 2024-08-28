import { Helmet } from 'react-helmet-async';
// sections
import { APP_NAME } from 'src/config-global';
import CrashView from 'src/sections/crash/view';

// ----------------------------------------------------------------------

export default function CrashPage() {
  return (
    <>
      <Helmet>
        <title> {`${APP_NAME}: Crash`}</title>
      </Helmet>

      <CrashView />
    </>
  );
}
