import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const useSocket = () => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socketRef.current = io("ws://localhost:4000", {
      reconnection: true,
      reconnectionDelay: 10,
    });

    socketRef.current.on("connect", () => {
      setConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return [socketRef, connected];
};

export default useSocket;
