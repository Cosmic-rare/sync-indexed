import db from "./db";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const syncAdd = (content) => {
  Object.assign(content, {
    type: "create",
    sync_id: uuidv4(),
  });
  db.sync.add(content);
};

export const syncUpdate = (content) => {
  Object.assign(content, {
    type: "update",
    sync_id: uuidv4(),
  });
  db.sync.add(content);
};

export const syncDelete = (content) => {
  Object.assign(content, {
    type: "delete",
    sync_id: uuidv4(),
  });
  db.sync.add(content);
};

export const sync = (syncTable, network, clientId) => {
  if (syncTable && network) {
    if (syncTable.length !== 0) {
      axios
        .post("http://localhost:4000", {
          error_messages: false,
          datas: syncTable,
          clientId: clientId,
        })
        .then((res) => {
          res.data.sucsess.map((val) => {
            db.sync.delete(val);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
