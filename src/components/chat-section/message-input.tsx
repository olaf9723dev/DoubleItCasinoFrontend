import { useRef, useState, useCallback } from 'react';
// @mui
import { Stack, InputBase, IconButton } from '@mui/material';
// emoji
import Picker, { EmojiClickData } from "emoji-picker-react";
import InputEmoji from 'react-input-emoji'

// hooks
import useSocket from 'src/hooks/use-socket';

// components
import Iconify from 'src/components/iconify';
// types
import { useSelector } from 'src/store';
import { enqueueSnackbar } from 'notistack';
import { SOCKET_PATH } from 'src/config-global';

type Props = {
  disabled: boolean;
};

export default function ChatMessageInput({ disabled }: Props) {
  const { connected, send } = useSocket();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [text, setText] = useState('')
  console.log(text);
  const fileRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState('');

  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleChangeMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }, []);

  const handleSendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // typing
  };

  const sendMsg = () => {
    if (!isLoggedIn || !connected)
      return enqueueSnackbar('Need Login to chat', { variant: 'error' });
    if (message) {
      const data = { content: message };
      send(SOCKET_PATH.CHAT, data);
      setMessage('');
    }
    return null;
  };

  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setMessage(message + emojiData.emoji);
    // const data = { content: emojiData.emoji, type: 'emoji' };
    // send(SOCKET_PATH.CHAT, data);
    // console.log(emojiData);
    // console.log(emojiData.getImageUrl());
    // setInputStr((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);
  };

  const handleOnEnter = (val: string) => {
    console.log(val);
  }
  return (
    <Stack
      sx={{
        padding: 3,
        borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      {/* <InputEmoji
        fontSize={13}
        value={text}
        onChange={setText}
        cleanOnEnter
        onEnter={handleOnEnter}
        placeholder="Send a message..." shouldReturn={false} shouldConvertEmojiToImage={false} /> */}
      <InputBase
        onKeyDown={(e) => {
          if (e.code === 'Enter' || e.code === 'NumpadEnter') sendMsg();
        }}
        value={message}
        onKeyUp={handleSendMessage}
        onChange={handleChangeMessage}
        placeholder="Send a message..."
        disabled={disabled}
        inputProps={{
          maxLength: 200,
        }}
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton onClick={() => setShowPicker((val) => !val)}>
              <Iconify icon="ri:emotion-line" />
            </IconButton>
            <IconButton onClick={sendMsg}>
              <Iconify icon="prime:send" />
            </IconButton>
          </Stack>
        }
        sx={{
          padding: 3,
          height: 56,
          flexShrink: 0,
          borderRadius: `15px`,
          background: `rgba(255, 255, 255, 0.05)`,
          // borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />
      {showPicker && (
        <Picker onEmojiClick={onEmojiClick} style={{ width: 'calc(100% - 1px)' }} />
      )}
      <input type="file" ref={fileRef} style={{ display: 'none' }} />
    </Stack>
  );
}
