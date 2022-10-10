import db from "./db";
import { v4 as uuidv4 } from "uuid";

export const syncTable = (op, content) => {
  db.sync.add({ type: op, sync_id: uuidv4(), status: 0, task: content });
};
