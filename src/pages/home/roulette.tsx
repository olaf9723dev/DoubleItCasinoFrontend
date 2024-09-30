import { Helmet } from 'react-helmet-async';
// sections
import { APP_NAME } from 'src/config-global';
import RouletteView from 'src/sections/games/roulette/view';

// ----------------------------------------------------------------------

export default function RoulettePage() {
  return (
    <>
      <Helmet>
        <title> {`${APP_NAME}: Roulette`} </title>
      </Helmet>

      <RouletteView />
    </>
  );
}
