import { useEffect } from 'react';
import { Event } from 'src/types';
import useSocket from './use-socket';
/* eslint-disable */
export default function useSocketEvents(events: Event[], ...other: any[]) {
    const { connected, socket } = useSocket();
    useEffect(() => {
        if (!connected) return;

        for (const event of events) {
            socket.on(event.name, event.handler);
        }

        return function () {
            for (const event of events) {
                socket.off(event.name);
            }
        };
    }, [connected, ...other]);
}