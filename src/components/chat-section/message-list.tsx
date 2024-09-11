import { m } from 'framer-motion';
// @mui
import { Box, Stack, Avatar, Typography } from '@mui/material';
// components
import Scrollbar from 'src/components/scrollbar';

// utils
import { fDateTime } from 'src/utils/format-time';

// hooks
import { Event, IChatParticipant, IChatMessage } from 'src/types';
import useSocketEvents from 'src/hooks/use-socket-events';
import { SOCKET_PATH } from 'src/config-global';
import { useMessagesScroll } from './hooks';

// types
import { MotionContainer, varSlide } from '../animate';

type Props = {
  messageList: IChatMessage[];
  participants: IChatParticipant[];
  setMessageList: (data: any) => void;
};

export default function ChatMessageList({ messageList = [], setMessageList, participants }: Props) {
  const { messagesEndRef } = useMessagesScroll(messageList);

  const onUpdateHiistory = (data: IChatMessage) => {
    setMessageList((pre: IChatMessage[]) => [...pre, { ...data }]);
  };

  const events: Event[] = [
    {
      name: SOCKET_PATH.CHAT,
      handler: onUpdateHiistory
    }
  ];

  useSocketEvents(events);

  return (
    <>
      <Scrollbar
        ref={messagesEndRef}
        sx={{
          height: 1,
          padding: 2,
          overflowX: 'hidden',
          '& .simplebar-content-wrapper': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: messageList.length < 6 ? 'end' : 'unset'
          }
        }}
      >
        <Stack gap={2}>
          <MotionContainer>
            {messageList.length > 0 &&
              messageList.map((data: IChatMessage, index: number) => (
                <Stack
                  key={index}
                  component={m.div}
                  variants={varSlide().inRight}
                  sx={{
                    mt: 1.25,
                    flexDirection: 'row',
                    gap: 1.25
                  }}
                >
                  <Avatar
                    src={data.sender.avatar}
                    alt={data.sender.userName}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: `100%`,
                      background: '#32366a !important'
                    }}
                  >
                    {data.sender.userName.charAt(0).toUpperCase()}
                  </Avatar>
                  <Stack gap={0.25} sx={{ overflow: 'hidden', wordWrap: 'break-word' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 500 }}>
                        {data.sender.userName}
                      </Typography>
                      <Typography sx={{ fontSize: 11, fontWeight: 500 }}>
                        {fDateTime(data.createdAt, 'p dd/mm/yyyy')}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        padding: 1,
                        maxWidth: 'min-content',
                        background: `linear-gradient(180deg, #1c1c35 0%, #1d1d37 100%)`,
                        borderRadius: `8px`,
                        boxShadow: `0px 10px 40px 0px rgba(0, 0, 0, 0.15)`
                      }}
                    >
                      <Typography sx={{ fontSize: 13, fontWeight: 300, whiteSpace: 'nowrap' }}>
                        {data.content}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              ))}
          </MotionContainer>
        </Stack>
      </Scrollbar>
      <Box
        sx={{
          position: 'absolute',
          height: '25%',
          width: '100%',
          background: `linear-gradient(180deg, #100F1C 0%, rgba(16, 15, 28, 0.00) 100%)`,
          boxShadow: `-5px 0px 75px 0px rgba(0, 0, 0, 0.10)`
        }}
      />
    </>
  );
}
