import { useState, useEffect } from "react";
import db from "../db/db";
import { useLiveQuery } from "dexie-react-hooks";
import useNetwork from "./useNetwork";
import { sync } from "../db/sync";

const useSync = () => {
  const [status, setStatus] = useState({
    synced: false,
    syncing: false,
  });
  const syncTable = useLiveQuery(() => db.sync.toArray());
  const network = useNetwork();
  const syncCount = useLiveQuery(() => db.sync.count());

  useEffect(() => {
    setStatus({ ...status, synced: syncCount === 0 });
  }, [syncCount]);

  useEffect(() => {
    sync(syncTable, network);
  }, [syncTable, network]);

  return status;
};

export default useSync;
