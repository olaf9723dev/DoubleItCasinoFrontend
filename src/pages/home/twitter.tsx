import { Helmet } from 'react-helmet-async';
// sections
import TwitterView from 'src/sections/twitter/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Home: Twitter</title>
      </Helmet>

      <TwitterView />
    </>
  );
}
