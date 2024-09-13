import { useState } from 'react';
import { Stack, Button } from '@mui/material';
import LoginDialog from 'src/sections/auth/login';

export default function LoginButton() {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  return (
    <Stack flexDirection="row" sx={{ gap: '20px', borderColor: '#282644' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowLogin(true)}
        sx={{
          maxHeight: '40px !important',
          borderRadius: 0.5,
          background: `linear-gradient(90deg, #663399 0%, #6c56f5 100%)`,
          '&:hover': {
            background: `linear-gradient(180deg, #663399 0%, #6c56f5 100%)`
          }
        }}
      >
        Login
      </Button>

      <LoginDialog open={showLogin} onClose={() => setShowLogin(false)} />
    </Stack>
  );
}
