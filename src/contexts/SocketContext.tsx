import { io, Socket } from 'socket.io-client';
import { useSelector } from 'src/store';
import { createContext, useCallback, useEffect, useState } from 'react';
import { SOCKET_URL } from 'src/config-global';
import { SocketContextType } from 'src/types';

const SocketContext = createContext<SocketContextType | null>(null);
/* eslint-disable */
export const SocketProvider = ({ children }: { children: React.ReactElement }) => {
  const { token } = useSelector((state: any) => state.auth);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  const init = useCallback(() => {
    const _socket = io(SOCKET_URL, { auth: { token: token } });
    setSocket(_socket);
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Server connected...');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('server disconnected from client');
      setConnected(false);
    });

    return () => {
      socket.close();
    };
  }, [socket]);

  const send = async (url: string, data: any) => {
    try {
      if (!socket) return;
      socket.emit(url, data);
    } catch (err) {
      console.error('socket sending error :', err);
    }
  };

  useEffect(() => {
    init();
  }, [token]);

  return (
    <SocketContext.Provider
      value={{
        connected,
        socket,
        send,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
