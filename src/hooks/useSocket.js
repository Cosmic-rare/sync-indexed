import { useState, useEffect, useRef } from "react";
import { Manager } from "socket.io-client";
import db from "../db/db";
import { addTaskSocket, delTaskSocket } from "../db/task";
import useNetwork from "./useNetwork";

const useSocket = () => {
  const managerRef = useRef(null);
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [reconnection, setReconnection] = useState(false);
  const [clientId, setClientId] = useState("");
  const network = useNetwork();

  useEffect(() => {
    managerRef.current = new Manager("ws://localhost:4000", {
      reconnection: navigator.onLine,
      reconnectionDelay: 10,
    });

    socketRef.current = managerRef.current.socket("/");

    socketRef.current.on("connect", () => {
      setConnected(true);
      setClientId(socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      setConnected(false);
    });

    window.addEventListener("online", () => {
      socketRef.current.connect();
    });

    socketRef.current.on("CU_task", async (task, client_id) => {
      const isAlready = await db.tasks
        .where("_hash")
        .equals(task._hash)
        .toArray();
      if (isAlready.length === 0 && clientId !== client_id) {
        task._id = task._uid;
        delete task._uid;
        addTaskSocket(task);
      }
    });

    socketRef.current.on("D_task", async (deleteId, client_id) => {
      if (clientId !== client_id) {
        delTaskSocket(deleteId);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    managerRef.current.reconnection(network);
    setReconnection(managerRef.current.reconnection());
  }, [network]);

  return [socketRef, connected, reconnection, clientId];
};

export default useSocket;
