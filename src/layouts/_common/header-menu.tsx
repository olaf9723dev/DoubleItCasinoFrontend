import { useState, useCallback, useEffect } from 'react';
import { useNavigate, matchPath } from 'react-router-dom';
// @mui
import { Tabs, Tab } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';
// components
import { useResponsive } from 'src/hooks/use-responsive';
import { HEADER } from '../config-layout';

const TABS = [
  {
    value: 'home',
    label: 'Home',
    path: paths.home.root,
    hasChildren: true,
  },
  {
    value: 'withdraw',
    label: 'Withdraw',
    path: paths.withdraw.root,
  },
  {
    value: 'faq',
    label: 'FAQ',
    path: paths.faq.root,
  },
  {
    value: 'terms',
    label: 'Terms of Service',
    path: paths.terms.root,
  },
];

// ----------------------------------------------------------------------

export default function HeaderMenu() {
  const lgUp = useResponsive('up', 'lg');
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('home');

  const pathname = usePathname();

  const detectPath = () => {
    TABS.forEach((tab) => {
      const active = tab.path
        ? !!matchPath({ path: tab.path, end: !tab.hasChildren }, pathname)
        : false;
      if (active) setCurrentTab(tab.value);
    });
  };

  useEffect(detectPath, [pathname]);

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Tabs
      className='header_tab'
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        ml: { xs: 0, sm: 0, md: 0, lg: 8 },
        ...(lgUp && {
          height: HEADER.H_DESKTOP,
        }),
        '& .MuiTabs-flexContainer': {
          height: '100%',
        },
        '& .MuiTabs-indicator': {
          bgcolor: '#7058ff',
        },
      }}
    >
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          label={tab.label}
          value={tab.value}
          onClick={() => {
            navigate(tab.path);
          }}
        />
      ))}
    </Tabs>
  );
}
