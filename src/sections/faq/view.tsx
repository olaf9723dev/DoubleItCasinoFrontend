import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Collapse, Button } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// components
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';

export default function FAQView() {
  const settings = useSettingsContext();
  const [selected, setSelected] = useState<number>(0);

  const handleClick = (num: number) => {
    if (num === selected) setSelected(0);
    else setSelected(num);
  };

  return (
    <Stack sx={{ height: `100%` }}>
      <Stack
        sx={{
          height: `90px`,
          alignItems: 'center',
          borderBottom: `1px solid #272951`
        }}
      >
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Stack sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Stack
              sx={{
                height: `90px`,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottom: `1px solid #272951`,
                textAlign: 'center',
                gap: 5
              }}
            >
              <Typography sx={{ fontSize: 28, fontWeight: 400 }}>FAQ</Typography>
            </Stack>
            <Stack
              sx={{
                alignItems: 'center',
                flexDirection: 'row',
                gap: 5.8
              }}
            >
              <Typography>Provably Fair</Typography>
              <Typography>Terms Of Service</Typography>
            </Stack>
          </Stack>
        </Container>
      </Stack>

      <Scrollbar>
        <Stack
          sx={{
            mt: 2,
            p: 2,
            width: 1,
            height: '85%',
            borderRadius: 2,
            background: `linear-gradient(180deg, rgb(255 255 255 / 5%) 0%, rgb(255 255 255 / 12%) 100%)`,
            gap: 1
          }}
        >
          {[...Array(24)].map((_, index) => (
            <Stack key={index}>
              <Button
                onClick={() => handleClick(index + 1)}
                sx={{
                  p: '15px 21px',
                  borderRadius: 1,
                  bgcolor: '#19182f',
                  fontSize: 15,
                  justifyContent: 'space-between'
                }}
              >
                <Typography>{index + 1} question, enter a question here?</Typography>
                {index + 1 === selected ? <ExpandLess /> : <ExpandMore />}
              </Button>
              <Collapse in={index + 1 === selected} timeout="auto" unmountOnExit>
                <Stack
                  sx={{
                    borderRadius: 1,
                    bgcolor: '#19182f',
                    gap: 2,
                    p: 2.8,
                    mt: 1
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 15
                    }}
                  >
                    Second question, enter a question here?
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: 'rgba(234, 234, 234, 0.60)'
                    }}
                  >
                    Lorem ipsum dolor sit amet. Ex omnis placeat et vitae molestiae et doloremque
                    reprehenderit aut cupiditate eveniet. Ut blanditiis architecto est impedit rerum
                    et consequatur internos in voluptatum consequuntur est voluptas natus qui modi
                    omnis aut nostrum debitis.
                  </Typography>
                </Stack>
              </Collapse>
            </Stack>
          ))}
        </Stack>
      </Scrollbar>
    </Stack>
  );
}
