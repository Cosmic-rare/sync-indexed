import React from "react";
import { cleanSynced } from "../db/sync";

const CleanSyncTable = () => {
  return (
    <button
      onClick={cleanSynced}
      style={{
        marginTop: 15,
        marginLeft: 40,
      }}
    >
      Clean Sync Table
    </button>
  );
};

export default CleanSyncTable;
