// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  HOME: '/home',
  WITHDRAW: '/withdraw',
  FAQ: '/faq',
  TERMS_OF_SERVICE: '/terms'
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: '/home',
  // HOME
  home: {
    root: ROOTS.HOME,
    crash: `${ROOTS.HOME}/crash`,
    coinflip: `${ROOTS.HOME}/coinflip`,
    limbo: `${ROOTS.HOME}/limbo`,
    withdraw: `${ROOTS.WITHDRAW}`,
    faq: `${ROOTS.FAQ}`,
    terms: `${ROOTS.TERMS_OF_SERVICE}`,
    discord: `${ROOTS.HOME}/discord`,
    twitter: `${ROOTS.HOME}/twitter`
  },
  // WITHDRAW
  withdraw: {
    root: ROOTS.WITHDRAW
  },
  // FAQ
  faq: {
    root: ROOTS.FAQ
  },
  // TERMS_OF_SERVICE
  terms: {
    root: ROOTS.TERMS_OF_SERVICE
  }
};
