import { useState } from 'react';
import { Stack, Button } from '@mui/material';
import LoginDialog from 'src/sections/auth/login';

export default function LoginButton() {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  return (
    <Stack flexDirection="row" sx={{ gap: '20px', paddingX: 3, borderColor: '#282644' }}>
      <Button variant="contained" color="primary" onClick={() => setShowLogin(true)}>
        Login
      </Button>

      <LoginDialog open={showLogin} onClose={() => setShowLogin(false)} />
    </Stack>
  );
}
