import db from "./db";

export const syncAdd = (content) => {
  Object.assign(content, { type: "create" });
  db.sync.add(content);
};

export const syncUpdate = (content) => {
  Object.assign(content, { type: "update" });
  db.sync.add(content);
};
