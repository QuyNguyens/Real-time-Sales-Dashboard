let socket: WebSocket | null = null;

type MessageHandler = (data: any) => void;

export function connectWebSocket(onMessage: MessageHandler) {
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";

  const url = `${protocol}://localhost:3001`;
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("✅ WebSocket connected");
  };

  socket.onmessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (err) {
      console.error("❌ Error parsing WebSocket message:", err);
    }
  };

  socket.onclose = () => {
    console.warn("⚠️ WebSocket disconnected");
  };

  socket.onerror = (err) => {
    console.error("❌ WebSocket error:", err);
  };
}

export function disconnectWebSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
}
