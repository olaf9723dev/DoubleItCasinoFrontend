import { useEffect } from 'react';
import { dispatch } from 'src/store';
import { setbalance } from 'src/store/reducers/auth';
import { sockets } from './socket';

const EventHandler = () => {
  useEffect(() => {
    const updateBalance = (amount: number) => {
      dispatch(setbalance(amount));
    };

    sockets.forEach((socket) => {
      socket.on('update-balance', updateBalance);
    });

    return () => {
      sockets.forEach((socket, index) => {
        socket.off('update-balance', updateBalance);
      });
    };
    // eslint-disable-next-line
  }, [setbalance]);
  return null;
};

export default EventHandler;
