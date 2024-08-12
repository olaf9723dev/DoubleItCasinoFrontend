import { useCallback, useEffect, useRef } from 'react';

// ----------------------------------------------------------------------

export default function useMessagesScroll(list: string[]) {
  const listEndRef = useRef<HTMLDivElement>(null);

  const scrollListToBottom = useCallback(() => {
    if (!list) {
      return;
    }

    if (!listEndRef.current) {
      return;
    }

    if (listEndRef.current) {
      listEndRef.current.scrollTop = listEndRef.current.scrollHeight;
    }
  }, [list]);

  useEffect(
    () => {
      setTimeout(scrollListToBottom, 100);
      // scrollListToBottom();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [list]
  );

  return {
    listEndRef,
  };
}
