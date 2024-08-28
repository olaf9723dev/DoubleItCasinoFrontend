import { Helmet } from 'react-helmet-async';
// sections
import { APP_NAME } from 'src/config-global';
import CoinflipView from 'src/sections/coinflip/view';

// ----------------------------------------------------------------------

export default function CoinflipPage() {
  return (
    <>
      <Helmet>
        <title> {`${APP_NAME}: Coinflip`}</title>
      </Helmet>

      <CoinflipView />
    </>
  );
}
