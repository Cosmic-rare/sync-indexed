import React from "react";
import useSync from "../hooks/useSync";

const Status = () => {
  const syncStatus = useSync();

  return (
    <p
      style={{
        marginTop: 15,
        marginLeft: 40,
      }}
    >
      {syncStatus}
    </p>
  );
};

export default Status;
