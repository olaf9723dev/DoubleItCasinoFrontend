import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components

const icon = (name: string) => <img alt={name} src={`/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  crash: icon('ic_crash'),
  coinflip: icon('ic_coinflip'),
  limbo: icon('ic_limbo'),
  discord: icon('ic_discord'),
  twitter: icon('ic_twitter')
};
// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: '',
        items: [
          { title: 'Home', path: paths.home.root, icon: ICONS.dashboard, type: 'desktop' },
          { title: 'Crash', path: paths.home.crash, icon: ICONS.crash, type: 'desktop' },
          { title: 'Coinflip', path: paths.home.coinflip, icon: ICONS.coinflip, type: 'desktop' },
          { title: 'Limbo', path: paths.home.limbo, icon: ICONS.crash, type: 'desktop' },
          { title: 'Mine', path: paths.home.mine, icon: ICONS.coinflip, type: 'desktop' },
          { title: 'Roulette', path: paths.home.roulette, icon: ICONS.coinflip, type: 'desktop' },
          { title: 'Withdraw', path: paths.home.withdraw, type: 'mobile' },
          { title: 'FAQ', path: paths.home.faq, type: 'mobile' },
          { title: 'Terms of Service', path: paths.home.terms, type: 'mobile' }
          // {
          //   title: 'Discord',
          //   path: paths.home.discord,
          //   icon: ICONS.discord,
          // },
          // {
          //   title: 'Twitter',
          //   path: paths.home.twitter,
          //   icon: ICONS.twitter,
          // },
        ]
      }
    ],
    []
  );

  return data;
}
