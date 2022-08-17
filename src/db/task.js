import db from "./db";
import { v4 as uuidv4 } from "uuid";
import md5 from "md5";
import { syncAdd, syncUpdate } from "./sync";

export const create = (title) => {
  const content = {
    _id: uuidv4(),
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
  syncAdd(content);
};

export const update = async (updatedTask) => {
  const content = await db.tasks.get(updatedTask._id);

  content.title = updatedTask.title;
  content.done = updatedTask.done;
  content._rev++;
  content._updatedAt = Date.now();
  content._hash = md5(JSON.stringify(content));

  await db.tasks.update(content._id, content);
  syncUpdate(content);
};

export const del = async (task) => {
  if (task._deleted) return;

  const content = await db.tasks.get(task._id);

  content._deleted = true;
  content._rev++;
  content._updatedAt = Date.now();
  content._hash = md5(JSON.stringify(content));

  db.tasks.update(content._id, content);
  syncUpdate(content);
};
