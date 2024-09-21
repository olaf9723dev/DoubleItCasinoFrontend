import { useCallback, useEffect, useState } from 'react';
// @mui
import { Box, Stack, Drawer, IconButton } from '@mui/material';

// components
import useApi from 'src/hooks/use-api';
import { useResponsive } from 'src/hooks/use-responsive';
import { ChatMessageList, ChatMessageInput } from 'src/components/chat-section';
import Iconify from 'src/components/iconify';
import { HEADER, CHAT } from '../config-layout';

type Props = {
  openNav?: boolean;
  onCloseNav?: VoidFunction;
};

export default function ChatWrapper({ openNav, onCloseNav }: Props) {
  const { getChatHistory } = useApi();
  const lgUp = useResponsive('up', 'lg');

  const [messageList, setMessageList] = useState<any>([]);
  const [mobileState, setMobileState] = useState(false);

  const getData = useCallback(async () => {
    const res = await getChatHistory();
    if (!res?.data) return;
    setMessageList(res.data);
  }, [getChatHistory]);

  useEffect(() => {
    getData();
  }, [getData]);

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden'
      }}
    >
      <ChatMessageList
        messageList={messageList}
        setMessageList={setMessageList}
        participants={[]}
      />

      <ChatMessageInput disabled={false} />
    </Stack>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: CHAT.W_DESKTOP },
        height: { lg: `calc(100% - ${HEADER.H_DESKTOP + 1}px)` }
      }}
    >
      {lgUp ? (
        <Stack
          sx={{
            top: HEADER.H_DESKTOP,
            height: `calc(100% - ${HEADER.H_DESKTOP + 1}px)`,
            // height: 1,
            position: 'fixed',
            width: CHAT.W_DESKTOP,
            borderLeft: (theme) => `1px solid ${theme.palette.secondary.dark}`
          }}
        >
          {renderMessages}
        </Stack>
      ) : (
        <>
          {!mobileState && (
            <IconButton
              onClick={() => {
                setMobileState(true);
              }}
              sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 2099999,
                borderRadius: '100%',
                background: `linear-gradient(90deg, #663399 0%, #6c56f5 100%)`
              }}
            >
              <Iconify icon="mdi:chat" width={35} height={35} sx={{ color: 'white' }} />
            </IconButton>
          )}
          {mobileState && (
            <Stack
              className="chat_div"
              sx={{
                top: HEADER.H_DESKTOP,
                height: `calc(100% - ${HEADER.H_DESKTOP + 1}px)`,
                // height: 1,
                position: 'fixed',
                width: CHAT.W_DESKTOP,
                right: 0,
                zIndex: 2099999,
                background:
                  'radial-gradient(91.15% 56.56% at 21.54% -0.84%, rgba(88, 105, 255, 0.11) 0%, rgba(0, 0, 0, 0.00) 100%),radial-gradient(81.52% 52.52% at 75.96% 76.81%, rgba(112, 88, 255, 0.04) 0%, rgba(0, 0, 0, 0.00) 100%),linear-gradient(69deg, #151727 0%, #141122 100%)',
                borderLeft: (theme) => `1px solid ${theme.palette.secondary.dark}`
              }}
            >
              <IconButton
                onClick={() => {
                  setMobileState(false);
                }}
                sx={{
                  cursor: 'pointer',
                  ml: '-18px',
                  position: 'fixed',
                  bottom: 88,
                  borderRadius: '100%',
                  background: `linear-gradient(90deg, #663399 0%, #6c56f5 100%)`
                }}
              >
                <Iconify icon="mdi:arrow-right" width={15} height={15} sx={{ color: 'white' }} />
              </IconButton>

              {renderMessages}
            </Stack>
          )}
        </>
        // <Drawer
        //   open={openNav}
        //   onClose={onCloseNav}
        //   PaperProps={{
        //     sx: {
        //       width: CHAT.W_MOBILE,
        //       top: HEADER.H_MOBILE,
        //       height: `calc(100% - ${HEADER.H_MOBILE + 1}px)`,
        //     },
        //   }}
        // >
        //   {renderMessages}
        // </Drawer>
      )}
    </Box>
  );
}
