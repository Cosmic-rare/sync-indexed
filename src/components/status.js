import React from "react";
import useSync from "../hooks/useSync";
import useNetwork from "../hooks/useNetwork";

const Status = (props) => {
  const { connected, reconnection, syncCount, clientId } = props;
  const { synced, syncing } = useSync(clientId);
  const network = useNetwork();

  return (
    <div
      style={{
        marginTop: 15,
        marginLeft: 40,
      }}
    >
      <p>NetWork: {network ? "Online" : "Offline"}</p>
      <p>
        Sync: {synced ? "Synced" : "Not Synced"} {syncing ? "Syncing" : ""}
      </p>
      <p>SyncTable: {syncCount}</p>
      <p>Connect: {connected ? "Connected" : "Disconnected"}</p>
      <p>Reconnection: {reconnection ? "enable(true)" : "disable(false)"}</p>
      <p>ENV(AA): {process.env.AA}</p>
    </div>
  );
};

export default Status;
