import db from "./db";
import axios from "axios";

export const syncAdd = (content) => {
  Object.assign(content, { type: "create" });
  db.sync.add(content);
};

export const syncUpdate = (content) => {
  Object.assign(content, { type: "update" });
  db.sync.add(content);
};

export const sync = (syncTable, network) => {
  if (syncTable && network) {
    if (syncTable.length !== 0) {
      syncTable.map((val) => {
        axios
          .post("http://localhost:4000", {
            commands: [{ type: val.type, data: val }],
          })
          .then(() => {
            db.sync.delete(val.id);
          });
      });
    }
  }
};
