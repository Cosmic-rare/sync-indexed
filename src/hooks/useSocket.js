import React, { useState, useEffect, useRef } from "react";
import { Manager } from "socket.io-client";
import useSync from "./useSync";

const useSocket = () => {
  const managerRef = useRef(null);
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [reconnection, setReconnection] = useState(false);
  const { network } = useSync();

  useEffect(() => {
    managerRef.current = new Manager("ws://localhost:4000", {
      reconnection: navigator.onLine,
      reconnectionDelay: 10,
    });

    socketRef.current = managerRef.current.socket("/");

    socketRef.current.on("connect", () => {
      setConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      setConnected(false);
    });

    window.addEventListener("online", () => {
      socketRef.current.connect();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    managerRef.current.reconnection(network);
    setReconnection(managerRef.current.reconnection());
  }, [network]);

  return [socketRef, connected, reconnection];
};

export default useSocket;
