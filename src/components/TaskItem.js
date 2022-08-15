import React, { useState } from 'react'
import { del, update } from '../db';

const TaskItem = (props) => {
  const { task } = props;
  const [editting, setEditing] = useState(false)
  const [edittingTask, setEdittingTask] = useState(task)

  if (task._deleted) return;
  return (
    <li>
      <span
        style={{ marginRight: 6, cursor: "pointer" }}
        onClick={() => del(task)}
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
          update({ ...task, done: !task.done })
        }}
        style={{
          cursor: "pointer",
        }}
      >
        {task && task.done ? "👌" : "👋"}{" "}
      </span>
      {!editting ?
        <span
          style={
            task.done ? { textDecoration: "line-through" } : {}
          }
        >
          {task.title}
        </span>
        :
        <div style={{ display: 'inline' }}>
          <input
            style={{ display: 'inline', width: 200 }}
            value={edittingTask.title}
            onChange={(e) => {
              setEdittingTask({ ...edittingTask, title: e.target.value })
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                update(edittingTask)
                setEditing(false)
              }
            }}
          />
          <button
            style={{ display: 'inline' }}
            onClick={() => {
              setEditing(false)
              setEdittingTask(task)
            }}
          >
            Cancel
          </button>
          <button
            style={{ display: 'inline' }}
            onClick={() => {
              update(edittingTask)
              setEditing(false)
            }}
          >
            Save
          </button>
        </div>
      }
    </li>
  );
};

export default TaskItem;
