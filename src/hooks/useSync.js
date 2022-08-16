import React, { useState, useEffect } from "react";
import db from "../db/db";
import { useLiveQuery } from "dexie-react-hooks";

const useSync = (props) => {
  const [status, setStatus] = useState({
    network: false,
    synced: false,
    syncing: false,
  });

  const syncCount = useLiveQuery(() => db.sync.count());

  useEffect(() => {
    setStatus({ ...status, synced: syncCount === 0 });
  }, [syncCount]);

  useEffect(() => {
    setStatus({ ...status, network: navigator.onLine });
  }, []);

  window.addEventListener("online", () => {
    setStatus({ ...status, network: true });
  });

  window.addEventListener("offline", () => {
    setStatus({ ...status, network: false });
  });

  return status;
};

export default useSync;
