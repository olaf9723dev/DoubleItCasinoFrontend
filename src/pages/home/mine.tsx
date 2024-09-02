import { Helmet } from 'react-helmet-async';
// sections
import { APP_NAME } from 'src/config-global';
import MineView from 'src/sections/mine/view';

// ----------------------------------------------------------------------

export default function MinePage() {
  return (
    <>
      <Helmet>
        <title> {`${APP_NAME}: Mine`}</title>
      </Helmet>

      <MineView />
    </>
  );
}
