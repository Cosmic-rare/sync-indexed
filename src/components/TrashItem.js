import React from "react";
import { cleanTrash, u } from "../db/task";

const TrashItem = (props) => {
  const { task } = props;

  if (!task._deleted) return;

  return (
    <li>
      <span
        style={{ marginRight: 6, cursor: "pointer" }}
        onClick={() => cleanTrash(task)}
      >
        {"🗑️"}
      </span>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => u(task, "_deleted", false)}
      >
        {"🔙"}{" "}
      </span>
      <span style={task.done ? { textDecoration: "line-through" } : {}}>
        {task.title}
      </span>
    </li>
  );
};

export default TrashItem;
