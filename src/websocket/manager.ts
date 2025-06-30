// src/websocket/manager.ts
let socket: WebSocket | null = null;

export function initWebSocket() {
  if (socket) return;

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const url = `${protocol}:${import.meta.env.VITE_API_HOST}`;

  socket = new WebSocket(url);

  const bc = new BroadcastChannel("realtime_channel");

  socket.onopen = () => {
    console.log("✅ WebSocket connected");
  };

  socket.onmessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      bc.postMessage(data); // gửi cho tất cả tab/component
    } catch (err) {
      console.error("❌ Failed to parse WS message", err);
    }
  };

  socket.onclose = () => {
    console.warn("⚠️ WebSocket disconnected");
    socket = null;
  };

  socket.onerror = (err) => {
    console.error("❌ WebSocket error:", err);
  };
}
