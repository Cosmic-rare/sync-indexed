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

export const update = (updatedTask) => {
  const content = updatedTask;

  delete content._hash;
  content._rev++;
  content._updatedAt = Date.now();

  const hash = { _hash: md5(JSON.stringify(content)) };

  Object.assign(content, hash);

  db.tasks.update(content._id, content);
  syncUpdate(content);
};

export const del = (task) => {
  if (task._deleted) return;

  const content = task;

  delete content._hash;
  content._rev++;
  content._updatedAt = Date.now();
  task._deleted = true;

  const hash = { _hash: md5(JSON.stringify(content)) };

  Object.assign(content, hash);

  db.tasks.update(content._id, content);
  syncUpdate(content);
};
