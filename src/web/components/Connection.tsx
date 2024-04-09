import { useEffect, useState } from "react";

import { socket } from "../socket";

export default function Connection() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div>
      <span className={`${connected ? "text-green-400" : "text-red-500"} font-bold`}>
        {connected ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
}
