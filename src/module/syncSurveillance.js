import axios from "axios";
import db from "../db/db";

export const sync = (syncTable, network, clientId) => {
  console.log(syncTable);
  if (syncTable && network) {
    axios
      .post(`${process.env.API_URI}`, {
        error_messages: true,
        datas: syncTable,
        clientId: clientId,
      })
      .then((res) => {
        console.log(res);
        res.data.sucsess.map((val) => {
          db.sync.delete(val);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
