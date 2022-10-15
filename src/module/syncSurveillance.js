import axios from "axios";
import db from "../db/db";

const push = (syncTable) => {
  return new Promise((resolve) => {
    syncTable.map(async (val) => {
      db.sync.update(val.sync_id, { ...val, status: -1 });
      await axios
        .post(`${process.env.API_URI}`, {
          type: val.type,
          sync_id: val.sync_id,
          task: val.task,
        })
        .then((res) => {
          console.log(`pushed ${res.data.sync_id}`);
          db.sync.update(res.data.sync_id, { ...val, status: 1 });
        });
      // 失敗したときにstatusを変更する(-2とか?)
    });

    resolve();
  });
};

export const sync = async (network) => {
  if (network) {
    const syncTable = await db.sync
      .where("status")
      .between(-1, 0, true, true)
      .toArray();
    console.log("start push", syncTable);
    push(syncTable);
  }

  console.log("push to server");
};
