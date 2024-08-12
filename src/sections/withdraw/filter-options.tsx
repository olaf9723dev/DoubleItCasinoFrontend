import { useState } from 'react';
// @mui
import { Stack, Typography, TextField, InputAdornment, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// components
// import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

type Props = {
  onFilterItems: (item: string, sort: boolean) => void;
};


export default function FilterOptions({ onFilterItems }: Props) {
  // const settings = useSettingsContext();

  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterItems(e.target.value, sortOpen);
    setSearchValue(e.target.value);
  };

  const handleChangeSelect = () => {
    onFilterItems(searchValue, !sortOpen);
    setSortOpen(!sortOpen);
  };

  return (
    <Stack
      className='filter_content'
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
      }}
    >
      <TextField
        fullWidth
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search for items"
        className='search_input'
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Stack className='sort_content' sx={{ gap: 2, flexDirection: 'row', alignItems: 'center' }}>
                <Typography className='sort_by_text' sx={{ fontSize: 15 }}>Sort By:</Typography>
                <Button
                  color="secondary"
                  variant="contained"
                  className='sort_btn'
                  endIcon={sortOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  onClick={handleChangeSelect}
                  sx={{
                    background: `linear-gradient(179deg, #272A47 0.61%, #22243E 100.27%)`,
                    py: 0.8,
                    px: 2,
                    fontSize: 13,
                    borderRadius: 1.25,
                  }}
                >
                  Highest To Lowest
                </Button>
                {/* <Button
                  color="secondary"
                  variant="contained"
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleChangeSelect}
                  sx={{
                    background: `linear-gradient(179deg, #272A47 0.61%, #22243E 100.27%)`,
                    py: 0.8,
                    px: 2,
                    fontSize: 13,
                    borderRadius: 1.25,
                  }}
                >
                  Game
                </Button> */}
              </Stack>
            </InputAdornment>
          ),
        }}
        sx={{
          background: `rgba(0, 0, 0, 0.20)`,
          '& input': {
            px: 3.5,
            py: 1.5,
            fontSize: 17,
          },
        }}
      />
    </Stack>
  );
}
