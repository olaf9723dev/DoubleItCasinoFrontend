import { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Dialog,
  TextField,
  IconButton,
  Typography,
  DialogContent,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import useApi from 'src/hooks/use-api';
import { useDispatch } from 'src/store';
import { signin } from 'src/store/reducers/auth';
import { emailValidator } from 'src/utils';
import { authenticateSockets } from 'src/utils/socket';
import { useTheme } from '@mui/material/styles';
import { LoginDialogProps, ActiveProps } from './types';

const initLoginForm = {
  emailOrUsername: {
    label: 'Email Or Username *',
    type: 'text',
    placeholder: 'Enter your email or username',
    value: 'demo@gmail.com',
    message: ''
  },
  password: {
    label: 'Password *',
    type: 'password',
    placeholder: 'Enter your password',
    value: 'demo',
    message: ''
  }
};
const initRegisterForm = {
  email: {
    label: 'Email *',
    type: 'email',
    placeholder: 'Enter your email',
    value: 'demo@gmail.com',
    message: ''
  },
  userName: {
    label: 'Username *',
    type: 'text',
    placeholder: 'Enter your username',
    value: 'demo',
    message: ''
  },
  password: {
    label: 'Password *',
    type: 'password',
    placeholder: 'Enter your password',
    value: 'demo',
    message: ''
  }
};

export default function LoginDialog({ open, onClose }: LoginDialogProps) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { login, register } = useApi();

  const theme = useTheme();
  const mediaDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [active, setActive] = useState<ActiveProps>('login');
  const [loading, setloading] = useState(false);

  const [loginForm, setLoginForm] = useState<{ [key: string]: any }>(initLoginForm);
  const [registerForm, setRegisterForm] = useState<{ [key: string]: any }>(initRegisterForm);

  const Login = async () => {
    try {
      const { emailOrUsername, password } = loginForm;

      if (!emailOrUsername.value) {
        enqueueSnackbar('Empty Email or Username!', { variant: 'warning' });
        return;
      }
      if (!password.value) {
        enqueueSnackbar('Empty Password!', { variant: 'warning' });
        return;
      }

      setloading(true);
      const res = await login(emailOrUsername.value, password.value);

      if (res && res.status === 200) {
        enqueueSnackbar(res.data.message, { variant: 'success' });
        authenticateSockets(res.data.token);
        dispatch(signin(res.data));
      }
      setloading(false);
    } catch (err: any) {
      enqueueSnackbar(`${err.response.data.message}!`, { variant: 'error' });
    }
  };

  const Register = async () => {
    try {
      const { email, userName, password } = registerForm;

      if (!email.value) {
        enqueueSnackbar('Empty Email!', { variant: 'warning' });
        return;
      }
      if (!emailValidator(email.value)) {
        enqueueSnackbar('Invalied Email!', { variant: 'warning' });
        return;
      }
      if (!userName.value) {
        enqueueSnackbar('Empty Username!', { variant: 'warning' });
        return;
      }
      if (!password.value) {
        enqueueSnackbar('Empty Password!', { variant: 'warning' });
        return;
      }

      setloading(true);
      const res = await register(email.value, userName.value, password.value);

      if (res && res.status === 201) {
        enqueueSnackbar(res.data, { variant: 'success' });
        setActive('login');
        setRegisterForm(initRegisterForm);
      }
      setloading(false);
    } catch (err: any) {
      enqueueSnackbar(`${err.response.data.message}!`, { variant: 'error' });
    }
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
          background: `linear-gradient(180deg, #191B35 0%, #1F203C 100%)`
        }
      }}
    >
      <DialogContent
        sx={{
          p: 0
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
            background: mediaDown ? 'transparent' : 'url("/assets/login.png") -33px -49px no-repeat'
          }}
        >
          <Stack
            sx={{
              p: 5.7,
              gap: 3,
              width: '100%'
            }}
          >
            <Box>
              <Typography sx={{ fontSize: 32 }}>
                {active === 'login' ? 'Login' : 'Register'}
              </Typography>
            </Box>
            <Stack
              sx={{
                pb: 3.8,
                gap: 2.8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: '1px solid #33355F'
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  py: 1.5,
                  width: '50%',
                  borderRadius: 0.5,
                  bgcolor: active === 'login' ? '#303158' : 'transparent'
                }}
                onClick={() => setActive('login')}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  py: 1.5,
                  width: '50%',
                  borderRadius: 0.5,
                  bgcolor: active === 'register' ? '#303158' : 'transparent'
                }}
                onClick={() => setActive('register')}
              >
                Register
              </Button>
            </Stack>
            <Stack>
              {active === 'login' && (
                <>
                  <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.keys(loginForm).map((key: any, ind: number) => (
                      <Stack key={ind}>
                        <Typography sx={{ fontSize: 15 }}>{loginForm[key].label}</Typography>
                        <TextField
                          sx={{
                            width: '100%',
                            borderRadius: 1.25,
                            background: '#17182E',
                            marginTop: 1.25
                          }}
                          type={loginForm[key].type}
                          value={loginForm[key].value}
                          placeholder={loginForm[key].placeholder}
                          onKeyDown={(e) => {
                            if (
                              key === 'password' &&
                              (e.code === 'Enter' || e.code === 'NumpadEnter')
                            )
                              Login();
                          }}
                          onChange={(e: any) =>
                            setLoginForm({
                              ...loginForm,
                              [key]: {
                                ...loginForm[key],
                                value: e.target.value
                              }
                            })
                          }
                        />
                      </Stack>
                    ))}
                    <Typography sx={{ fontSize: 12 }}>
                      By logging in you acknowledge that you are at least 18 years of age, that any
                      items you wager are not stolen, and that you agree with our Terms of Service
                      and our Privacy Policy.
                    </Typography>
                  </Stack>
                  <Button
                    sx={{
                      py: 2,
                      mt: 8,
                      borderRadius: 0.5
                    }}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    onClick={Login}
                  >
                    Login
                  </Button>
                </>
              )}
              {active === 'register' && (
                <>
                  <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.keys(registerForm).map((key: any, ind: number) => (
                      <Stack key={ind}>
                        <Typography sx={{ fontSize: 15 }}>{registerForm[key].label}</Typography>
                        <TextField
                          sx={{
                            width: '100%',
                            borderRadius: 1.25,
                            background: '#17182E',
                            marginTop: 1.25
                          }}
                          type={registerForm[key].type}
                          value={registerForm[key].value}
                          placeholder={registerForm[key].placeholder}
                          onKeyDown={(e) => {
                            if (
                              key === 'password' &&
                              (e.code === 'Enter' || e.code === 'NumpadEnter')
                            )
                              Register();
                          }}
                          onChange={(e: any) =>
                            setRegisterForm({
                              ...registerForm,
                              [key]: {
                                ...registerForm[key],
                                value: e.target.value
                              }
                            })
                          }
                        />
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    sx={{
                      py: 2,
                      mt: 4,
                      borderRadius: 0.5
                    }}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    onClick={Register}
                  >
                    Register
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
