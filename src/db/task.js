import db from "./db";
import { v4 as uuidv4 } from "uuid";
import md5 from "md5";
import { syncTable } from "./sync";

export const addTaskSocket = async (task) => {
  db.tasks.put(task);
};

export const delTaskSocket = (id) => {
  db.tasks.delete(id);
};

export const create = (title) => {
  if (!(title.trim() === "")) {
    const content = {
      task_id: uuidv4(),
      _rev: 0,
      _deleted: false,
      title: title,
      done: false,
      _createdAt: Date.now(),
      _updatedAt: Date.now(),
    };

    const hash = { _hash: md5(JSON.stringify(content)) };

    Object.assign(content, hash);

    db.tasks.add(content);
    syncTable("create", content);
  }
};

export const update = async (task, key, value) => {
  const content = await db.tasks.get(task.task_id);

  content[key] = value;
  content._rev++;
  content._updatedAt = Date.now();
  content._hash = md5(JSON.stringify(content));

  await db.tasks.put(content);
  syncTable("update", content);
};

export const cleanTrash = async (task) => {
  if (!task._deleted) return;

  db.tasks.delete(task.task_id);
  syncTable("delete", task);
};
