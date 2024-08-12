import { useCallback, useEffect, useRef } from 'react';
// types
import { IChatMessage } from 'src/types';

// ----------------------------------------------------------------------

export const useMessagesScroll = (messages: IChatMessage[]) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollMessagesToBottom = useCallback(() => {
        if (!messages) {
            return;
        }

        if (!messagesEndRef.current) {
            return;
        }

        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(
        () => {
            scrollMessagesToBottom();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [messages]
    );

    return {
        messagesEndRef,
    };
}
