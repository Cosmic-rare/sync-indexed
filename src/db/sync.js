import db from "./db";
import { v4 as uuidv4 } from "uuid";

export const syncTable = (op, content) => {
  db.sync.add({ type: op, sync_id: uuidv4(), status: 0, task: content });
};

export const cleanSynced = async () => {
  const syncedItems = [];
  await db.sync
    .where("status")
    .equals(1)
    .each((syncedItem) => {
      syncedItems.push(syncedItem.sync_id);
    });
  await db.sync.bulkDelete(syncedItems);
};
