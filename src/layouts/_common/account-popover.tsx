import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  alpha,
  Box,
  Button,
  Stack,
  Avatar,
  Divider,
  MenuItem,
  Typography,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { enqueueSnackbar } from 'notistack';
// routes
import { useRouter } from 'src/routes/hooks';
// hooks
import useSocketEvents from 'src/hooks/use-socket-events';
// components
import { signout } from 'src/store/reducers/auth';
import { dispatch, useSelector } from 'src/store';
import ProfileDialog from 'src/sections/profile/view';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { SOCKET_PATH } from 'src/config-global';
import { Event } from 'src/types';

const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/'
  },
  {
    label: 'Profile',
    linkTo: '/#1',
    modal: 'profile'
  }
];

export default function AccountPopover() {
  const theme1 = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme1.breakpoints.down('sm'));

  const { user, avatar } = useSelector((state: any) => state.auth);

  const popover = usePopover();

  const [open, setOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      dispatch(signout());
      popover.onClose();
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickItem = (option: any) => {
    popover.onClose();
    if (!option.modal) router.push(option.linkTo);
    else setOpen(true);
  };

  const events: Event[] = [
    {
      name: SOCKET_PATH.SIGNOUT,
      handler: (msg) => {
        enqueueSnackbar(msg, { variant: 'error' });
        handleLogout();
      }
    },
    {
      name: SOCKET_PATH.ALERT,
      handler: ({ msg, type }) => {
        enqueueSnackbar(msg, { variant: type });
      }
    }
  ];

  useSocketEvents(events);

  return (
    <>
      <Button
        onClick={popover.onOpen}
        sx={{
          borderRadius: '5px',
          padding: '10px',
          maxHeight: '40px',
          background: (theme) =>
            `linear-gradient(180deg, ${alpha(theme.palette.grey[700], 0.51)} 0%,${alpha(
              theme.palette.grey[700],
              0.65
            )}  100%)`,
          boxShadow: (theme) =>
            `0px 0px 33px 0px rgba(163, 148, 255, 0.09), 0px 6px 0px -4px ${alpha(
              theme.palette.grey[800],
              1
            )}`,
          gap: 2.45
        }}
        color="secondary"
      >
        <Avatar
          src={avatar}
          alt={avatar}
          sx={{
            width: 32,
            height: 32,
            borderRadius: '100%',
            fontSize: '14px'
          }}
        >
          {`${user?.firstName?.charAt(0).toUpperCase()}${user?.lastName
            ?.charAt(0)
            .toUpperCase()}` || ''}
        </Avatar>
        {!isMobile && (
          <>
            <Box sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{user?.userName}</Typography>
            </Box>
            <ExpandMoreIcon sx={{ ml: 1 }} />
          </>
        )}
      </Button>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${user?.firstName} ${user?.lastName} (${user?.userName})`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', borderColor: 'text.secondary' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', borderColor: 'text.secondary' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
      <ProfileDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
