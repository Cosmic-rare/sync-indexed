import { useState, useEffect, useRef } from "react";
import { Manager } from "socket.io-client";
import db from "../db/db";
import { delTaskSocket } from "../db/task";
import useNetwork from "./useNetwork";

const useSocket = () => {
  const managerRef = useRef(null);
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [reconnection, setReconnection] = useState(false);
  const network = useNetwork();

  useEffect(() => {
    managerRef.current = new Manager(process.env.SOCKET_URI, {
      reconnection: navigator.onLine,
      reconnectionDelay: 10,
    });

    socketRef.current = managerRef.current.socket("/");

    socketRef.current.on("connect", async () => {
      setConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      setConnected(false);
    });

    window.addEventListener("online", () => {
      socketRef.current.connect();
    });

    socketRef.current.on("CU_task", async (task) => {
      // 送られてきたデータが古かったときの処理
      // 同じのが送られてきたときの処理
      // ../db/task.js に処理をまとめる
      const latestTask = await db.tasks.get(task.task_id);
      if (!(latestTask._rev === task._rev && latestTask._hash === task._hash)) {
        db.tasks.put(task);
      }
    });

    socketRef.current.on("D_task", async (deleteId) => {
      delTaskSocket(deleteId);
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
