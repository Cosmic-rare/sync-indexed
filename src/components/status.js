import React, { useEffect } from "react";
import useSync from "../hooks/useSync";

const Status = (props) => {
  const { connected, reconnection } = props;
  const { network, synced, syncing } = useSync();

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
      <p>Connect: {connected ? "Connected" : "Disconnected"}</p>
      <p>Reconnection: {reconnection ? "enable(true)" : "disable(false)"}</p>
    </div>
  );
};

export default Status;
