import axios from "axios";
import db from "../db/db";

const push = (syncTable, clientId) => {
  return new Promise((resolve) => {
    syncTable.map(async (val) => {
      db.sync.update(val.sync_id, { ...val, status: -1 });
      console.log(val.sync_id);
      await axios
        .post(`${process.env.API_URI}`, {
          type: val.type,
          sync_id: val.sync_id,
          task: val.task,
          clientId: clientId,
        })
        .then((res) => {
          db.sync.update(res.data.sync_id, { ...val, status: 1 });
          console.log(res.data.sync_id);
        });
    });

    resolve();
  });
};

export const sync = async (syncTable, network, clientId) => {
  if (syncTable && network) {
    console.log(syncTable);
    push(syncTable, clientId);
  }

  console.log("push to server");
};
