import { useState, useEffect } from "react";
import db from "../db/db";
import { useLiveQuery } from "dexie-react-hooks";

const useSync = () => {
  const [status, setStatus] = useState({
    synced: false,
    syncing: false,
  });

  const syncCount = useLiveQuery(() => db.sync.count());

  useEffect(() => {
    setStatus({ ...status, synced: syncCount === 0 });
  }, [syncCount]);

  return status;
};

export default useSync;
