// src/hooks/useBroadcastChannel.ts
import { useEffect } from "react";

export function useBroadcastChannel(
  channelName: string,
  onMessage: (data: any) => void
) {
  useEffect(() => {
    const bc = new BroadcastChannel(channelName);

    const listener = (event: MessageEvent) => {
      onMessage(event.data);
    };

    bc.onmessage = listener;

    return () => {
      bc.close();
    };
  }, [channelName, onMessage]);
}
