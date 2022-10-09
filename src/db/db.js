import Dexie from "dexie";

const db = new Dexie("t-tree-db");

db.version(6).stores({
  tasks: "task_id, title, done, _rev, _deleted, _createdAt, _updatedAt, _hash",
  sync: "sync_id, type, status, task",
});

export default db;
