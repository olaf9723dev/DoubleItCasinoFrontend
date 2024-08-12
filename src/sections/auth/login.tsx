import { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Dialog,
  Checkbox,
  TextField,
  IconButton,
  Typography,
  DialogContent,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

import useApi from 'src/hooks/use-api';
import { useDispatch } from 'src/store';
import { signin } from 'src/store/reducers/auth';
import { authenticateSockets } from 'src/utils/socket';
import { useTheme } from '@mui/material/styles';

import { LoginDialogProps, ActiveProps } from './types';

export default function LoginDialog({ open, onClose }: LoginDialogProps) {
  const dispatch = useDispatch();
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const { getUserId, confirmPhrase } = useApi();

  const theme = useTheme();
  const mediaDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [active, setActive] = useState<ActiveProps>('username');
  const [username, setUsername] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [phrase, setPhrase] = useState([]);
  const [checked, setChecked] = useState(false);
  const [loading, setloading] = useState(false);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const ConfirmPhrase = async () => {
    setloading(true);
    const res = await confirmPhrase(userId);
    setloading(false);
    if (!res?.data) return;
    enqueueSnackbar('Verified successfly!', { variant: 'success' });
    authenticateSockets(res.data.token);
    dispatch(signin(res.data));
    window.location.reload();
  };

  const verifyUserName = async () => {
    if (active !== 'username' || !username) return;

    setloading(true);
    const res = await getUserId(username);
    setloading(false);
    if (!res?.data) return;

    const { userInfo, words } = res.data;
    setPhrase(words);
    setUserId(userInfo[0].id);
    setActive('verify');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="adopt-me-dialog-title"
      aria-describedby="adopt-me-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          maxWidth: 920,
          // [theme.breakpoints.down('lg')]: {
          //   maxWidth: `95%`,
          // },
          // [theme.breakpoints.down('md')]: {
          //   maxWidth: `95%`,
          // },
          width: `100%`,
          border: '2px solid #32366a',
          position: `relative`,
          background: `linear-gradient(180deg, #191B35 0%, #1F203C 100%)`,
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
        }}
      >
        <IconButton
          sx={{ position: 'absolute', top: 10, right: 10, zIndex: 2, color: 'white' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Stack
          sx={{
            p: mediaDown ? '0 0 0 0%' : '0 0 0 48%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            background: mediaDown
              ? 'transparent'
              : 'url("/assets/login.png") -33px -49px no-repeat',
          }}
        >
          <Stack
            sx={{
              p: 5.7,
              gap: 3,
              width: '100%',
            }}
          >
            <Box>
              <Typography sx={{ fontSize: 19 }}>Login</Typography>
              <Typography sx={{ fontSize: 22 }}>Locate Your Account</Typography>
            </Box>
            <Stack
              sx={{
                pb: 3.8,
                gap: 2.8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: '1px solid #33355F',
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  py: 1.5,
                  width: '50%',
                  borderRadius: 0.5,
                  bgcolor: active === 'username' ? '#303158' : 'transparent',
                }}
              >
                1. Username
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  py: 1.5,
                  width: '50%',
                  borderRadius: 0.5,
                  bgcolor: active === 'verify' ? '#303158' : 'transparent',
                }}
              >
                2. Verify Account
              </Button>
            </Stack>
            <Stack>
              {active === 'username' && (
                <>
                  <Stack>
                    <Typography sx={{ fontSize: 15 }}>USERNAME *</Typography>
                    <TextField
                      value={username}
                      onChange={handleChangeName}
                      placeholder="Enter your roblox username"
                      sx={{
                        width: '100%',
                        borderRadius: 1.25,
                        background: '#17182E',
                      }}
                      onKeyDown={(e) => {
                        if (e.code === 'Enter' || e.code === 'NumpadEnter') verifyUserName();
                      }}
                    />
                    <Typography sx={{ mt: 2.1, fontSize: 12 }}>
                      By logging in you acknowledge that you are at least 18 years of age, that any
                      items you wager are not stolen, and that you agree with our Terms of Service
                      and our Privacy Policy.
                    </Typography>
                  </Stack>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={verifyUserName}
                    disabled={!username || loading}
                    sx={{
                      py: 2,
                      mt: 20.3,
                      borderRadius: 0.5,
                    }}
                  >
                    Continue
                  </Button>
                </>
              )}

              {active === 'verify' && (
                <Stack
                  sx={{ gap: 0.8 }}
                  onKeyDown={(e) => {
                    if (e.code === 'Enter' || e.code === 'NumpadEnter') ConfirmPhrase();
                  }}
                >
                  <Typography sx={{ fontSize: 14 }}>
                    To verify your account, please put this phrase in your Roblox about me.
                  </Typography>
                  <Typography
                    sx={{
                      py: 2.6,
                      px: 1.8,
                      fontSize: 15,
                      borderRadius: 1.25,
                      bgcolor: '#33355F',
                    }}
                  >
                    {phrase.length > 0
                      ? phrase.map((word: string, k: number) => {
                          if (k === phrase.length) {
                            return word;
                          }
                          // eslint-disable-next-line
                          else return `${word} `;
                        })
                      : ''}
                  </Typography>
                  <Stack
                    sx={{
                      alignItems: 'flex-end',
                    }}
                  >
                    <Button
                      onClick={() => {
                        copy(phrase.join(' '));
                        enqueueSnackbar('Copied!');
                      }}
                      variant="contained"
                      color="primary"
                      sx={{
                        px: mediaDown ? 1 : 6,
                        width: mediaDown ? '100%' : 'auto',
                      }}
                    >
                      Copy
                    </Button>
                  </Stack>

                  <Stack sx={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                    <Checkbox
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                      sx={{ p: 0 }}
                    />
                    <Typography sx={{ fontSize: 12 }}>
                      I read and accept the Terms of Service.
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontSize: 12 }}>
                    By logging in you acknowledge that you are at least 18 years of age, that any
                    items you wager are not stolen, and that you agree with our Terms of conditions
                    and our Privacy Policy.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={ConfirmPhrase}
                    disabled={!username || loading || !checked}
                    sx={{
                      py: 2,
                      borderRadius: 0.5,
                    }}
                  >
                    Continue
                  </Button>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
