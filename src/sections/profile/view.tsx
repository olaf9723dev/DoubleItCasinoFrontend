import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Stack,
  Dialog,
  Avatar,
  TextField,
  IconButton,
  Typography,
  DialogContent,
  Autocomplete
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Image from 'src/components/image';

import { useSelector } from 'src/store';
import useApi from 'src/hooks/use-api';
import { ProfileDialogProps } from './types';

const COLUMNS = [
  {
    id: 'bet',
    label: 'Total Bet',
    format: 'G _val_ T'
  },
  {
    id: 'profit',
    label: 'Total Profit',
    format: 'G _val_ T',
    color: '#F59696'
  },
  {
    id: 'deposited',
    label: 'G Deposit',
    format: 'G _val_ T'
  },
  {
    id: 'games',
    label: 'Total Games'
  },
  {
    id: 'won',
    label: 'Games Won'
  },
  {
    id: 'lost',
    label: 'Games Lost'
  }
];

export default function ProfileDialog({ open, onClose }: ProfileDialogProps) {
  const { getUsers } = useApi();

  const { user, avatar } = useSelector((state: any) => state.auth);
  const [userList, setUserList] = useState<{ label: any; id: any; avatar: any }[]>([]);
  const [curuser, setCuruser] = useState<any>(null);

  const formatedValue = (val: number, format?: string) =>
    format ? format.replace('_val_', val.toString()) : val;

  const getAllUserList = async () => {
    const res = await getUsers();
    if (!res?.data) return;
    const users = res.data.map((e: any) => ({
      ...e,
      label: e.name,
      id: e.userId,
      avatar: e.avatar
    }));
    setUserList(users);
    const me = users.find((e: any) => e._id === user._id);
    if (me) setCuruser(me);
  };

  useEffect(() => {
    getAllUserList();
    // eslint-disable-next-line
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="adopt-me-dialog-title"
      aria-describedby="adopt-me-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          maxWidth: { xm: '100%', sm: '100%', md: `680px` },
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
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '2px dashed #32366a'
          }}
        >
          <Image
            src="/assets/profile.png"
            alt="profile"
            sx={{
              '& img': {
                width: '114%',
                ml: '-7%',
                maxWidth: '114%'
              }
            }}
          />
          <Stack
            sx={{
              mt: 3,
              gap: 3,
              width: '70%',
              textAlign: 'center',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={userList}
              fullWidth
              onChange={async (e, data) => {
                if (data) {
                  setCuruser(data);
                } else {
                  setCuruser(null);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search for a user"
                  sx={{
                    width: '100%',
                    borderRadius: 1.25,
                    background: 'rgba(0, 0, 0, 0.50)',
                    boxShadow:
                      '0px 15px 45px 0px rgba(0, 0, 0, 0.30), 0px 13px 40px 0px rgba(0, 0, 0, 0.25)'
                  }}
                />
              )}
            /> */}

            <Avatar
              src={avatar}
              alt={avatar}
              sx={{
                width: 126,
                height: 126,
                boxShadow:
                  '0px 23px 125px 0px rgba(100, 80, 255, 0.55), -1px 14px 15px 0px rgba(255, 255, 255, 0.33) inset'
              }}
            >
              {`${user?.firstName?.charAt(0).toUpperCase()}${user?.lastName
                ?.charAt(0)
                .toUpperCase()}` || ''}
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                {curuser ? curuser.name : user.name}
              </Typography>
              <Typography sx={{ fontSize: 11, fontWeight: 300 }}>
                {curuser ? curuser.userId : user.userId}
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <Stack
          sx={{
            px: 8,
            py: 5,
            gap: 1.5
          }}
        >
          <Grid container spacing={3}>
            {user &&
              COLUMNS.map((row) => (
                <Grid key={row.id} item xs={4} md={4}>
                  <Stack
                    sx={{
                      p: 1.6,
                      borderRadius: 0.6,
                      background:
                        'linear-gradient(180deg, rgb(255 255 255 / 0%) 0%, rgb(0 0 0 / 28%) 100%)',
                      boxShadow:
                        '0px 37px 40px 0px rgb(0 0 0 / 21%), -1px 1px 7px 0px rgb(255 255 255 / 7%) inset'
                    }}
                  >
                    <Typography sx={{ fontSize: 10 }}>{row.label}</Typography>
                    <Typography sx={{ color: row.color }}>
                      {row.id === 'games'
                        ? user.won + user.lost
                        : formatedValue(Number(user[row.id].toFixed(3)), row.format)}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
          </Grid>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
