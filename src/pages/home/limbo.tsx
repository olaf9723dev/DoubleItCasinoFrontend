import { Helmet } from 'react-helmet-async';
// sections
import { APP_NAME } from 'src/config-global';
import LimboView from 'src/sections/games/limbo/view';

// ----------------------------------------------------------------------

export default function LimboPage() {
  return (
    <>
      <Helmet>
        <title> {`${APP_NAME}: Limbo`} </title>
      </Helmet>

      <LimboView />
    </>
  );
}
