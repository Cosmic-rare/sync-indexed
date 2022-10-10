import React, { useEffect, useState } from "react";
import { u, complete } from "../db/task";

const TaskItem = (props) => {
  const { task } = props;
  const [editting, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  useEffect(() => {
    setTitle(task.title);
  }, [task, editting]);

  if (task._deleted) return;
  return (
    <li>
      <span
        style={{ marginRight: 6, cursor: "pointer" }}
        onClick={() => u(task, "_deleted", true)}
      >
        {"🗑️"}
      </span>
      <span
        style={{ marginRight: 6, cursor: "pointer" }}
        onClick={() => setEditing(true)}
      >
        {"🖊️"}
      </span>
      <span
        onClick={() => {
          complete(task.task_id);
        }}
        style={{
          cursor: "pointer",
        }}
      >
        {task && task.done ? "👌" : "👋"}{" "}
      </span>
      {!editting ? (
        <span style={task.done ? { textDecoration: "line-through" } : {}}>
          {task.title}
        </span>
      ) : (
        <div style={{ display: "inline" }}>
          <input
            style={{ display: "inline", width: 200 }}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                if (!(title.trim() === "")) {
                  u(task, "title", title);
                }
                setEditing(false);
              }
            }}
          />
          <button
            style={{ display: "inline" }}
            onClick={() => {
              setEditing(false);
              setTitle(task.title);
            }}
          >
            Cancel
          </button>
          <button
            style={{ display: "inline" }}
            onClick={() => {
              if (!(title.trim() === "")) {
                u(task, "title", title);
              }
              setEditing(false);
            }}
          >
            Save
          </button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
