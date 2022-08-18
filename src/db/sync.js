import db from "./db";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const syncAdd = (content) => {
  Object.assign(content, { type: "create", id: uuidv4() });
  db.sync.add(content);
};

export const syncUpdate = (content) => {
  Object.assign(content, { type: "update", id: uuidv4() });
  db.sync.add(content);
};

export const syncDelete = (content) => {
  Object.assign(content, { type: "delete", id: uuidv4() });
  db.sync.add(content);
};

export const sync = (syncTable, network) => {
  if (syncTable && network) {
    if (syncTable.length !== 0) {
      syncTable.map((val) => {
        console.log("sync:", val._id);
        axios
          .post("http://localhost:4000", {
            type: val.type,
            data: val,
          })
          .then(() => {
            db.sync.delete(val.id);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log("sucsess:", val._id);
      });
    }
  }
};
