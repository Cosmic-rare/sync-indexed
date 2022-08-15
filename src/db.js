import Dexie from "dexie";
import { v4 as uuidv4 } from 'uuid'
import md5 from "md5";

const db = new Dexie('t-tree-db')

db.version(2).stores({
  tasks: '_id, title, done, _hash, _rev, _deleted'
})

export default db

export const create = (title) => {
  const content = {
    _id: uuidv4(),
    _rev: 0,
    _deleted: false,
    title: title,
    done: false,
  }

  const hash = { _hash: md5(JSON.stringify(content)) }

  Object.assign(content, hash)

  db.tasks.add(content)
}

export const update = (updatedTask) => {
  const content = updatedTask

  delete content._hash
  content._rev++

  const hash = { _hash: md5(JSON.stringify(content)) }

  Object.assign(content, hash)

  db.tasks.update(content._id, content)
}

export const del = (task) => {
  if (task._deleted) return;

  const content = task

  delete content._hash
  content._rev++
  task._deleted = true

  const hash = { _hash: md5(JSON.stringify(content)) }

  Object.assign(content, hash)

  db.tasks.update(content._id, content)
}