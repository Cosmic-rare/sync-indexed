import React from "react";

const TrashItem = (props) => {
  const { task } = props;

  if (!task._deleted) return;

  return (
    <li>
      <span
        style={{ marginRight: 6, cursor: "pointer" }}
        onClick={() => console.log("復元")}
      >
        {"🔙"}
      </span>
      <span style={task.done ? { textDecoration: "line-through" } : {}}>
        {task.title}
      </span>
    </li>
  );
};

export default TrashItem;
