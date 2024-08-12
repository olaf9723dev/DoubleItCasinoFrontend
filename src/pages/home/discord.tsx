import { Helmet } from 'react-helmet-async';
// sections
import DiscordView from 'src/sections/discord/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Home: Discord</title>
      </Helmet>

      <DiscordView />
    </>
  );
}
