import io from 'socket.io-client';
import { SOCKET_URL } from 'src/config-global';

// Export individual socket connections
export const crashSocket = io(`${SOCKET_URL}/crash`);

// Export all socket connections
export const sockets = [crashSocket];

// Authenticate websocket connections
export const authenticateSockets = (token: string) => {
  console.log('[WS] Authenticating...');

  // Emit auth event for all sockets
  sockets.forEach((socket) => socket.emit('auth', token));
};
