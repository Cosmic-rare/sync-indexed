import db from "./db";
import { v4 as uuidv4 } from "uuid";

export const syncAdd = (content) => {
  db.sync.add({ type: "create", sync_id: uuidv4(), status: 0, task: content });
};

export const syncUpdate = (content) => {
  db.sync.add({ type: "update", sync_id: uuidv4(), status: 0, task: content });
};

export const syncDelete = (content) => {
  db.sync.add({ type: "delete", sync_id: uuidv4(), status: 0, task: content });
};
