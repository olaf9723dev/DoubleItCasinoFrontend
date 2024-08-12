import { useState } from 'react';
// @mui
import { Box, Container, Stack, Typography } from '@mui/material';

// components
import { _mock } from 'src/_mock/_mock';
import { useSettingsContext } from 'src/components/settings';

import WithdrawListComponent from './withdraw-list';
import FilterOptionsComponent from './filter-options';

// ----------------------------------------------------------------------

export default function WidrawView() {
  const settings = useSettingsContext();

  const [state, setState] = useState('');
  const [sort, setSort] = useState(false);


  return (
    <Stack sx={{ height: `100%` }}>
      <Stack
        sx={{
          paddingTop: "25px",
          paddingBottom: "25px",
          alignItems: 'center',
          borderBottom: `1px solid #272951`,
        }}
      >
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Stack
            className='withdraw_content' sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                textAlign: 'center',
                gap: 5,
              }}
            >
              <Typography sx={{ fontSize: 28, fontWeight: 400 }}>Withdraw</Typography>
            </Stack>
            <FilterOptionsComponent onFilterItems={(item: string, sortVal: boolean) => { setState(item); setSort(sortVal) }} />
          </Stack>
        </Container>
      </Stack>

      <Box
        sx={{
          mt: 4,
          px: 2,
          width: 1,
          height: '85%',
          borderRadius: 2,
          '& .simplebar-content-wrapper': {
            height: '100% !important',
          },
        }}
      >
        <WithdrawListComponent filterValue={state} sortValue={sort} />
      </Box>
    </Stack>
  );
}
