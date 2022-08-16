import React, { useState } from "react";
import db from "./db";
import { useLiveQuery } from "dexie-react-hooks";
import Inputs from "./components/Inputs";
import TaskItem from "./components/TaskItem";
import Order from "./components/Order";

const App = () => {
  const [order, setOrder] = useState("create+");
  const tasks = useLiveQuery(
    () =>
      order.slice(-1) === "-"
        ? db.tasks
            .orderBy(
              order.slice(0, -1) === "update" ? "_updatedAt" : "_createdAt"
            )
            .toArray()
        : db.tasks
            .orderBy(
              order.slice(0, -1) === "update" ? "_updatedAt" : "_createdAt"
            )
            .reverse()
            .toArray(),
    [order]
  );

  return (
    <div>
      <Inputs />
      <Order order={order} setOrder={setOrder} />
      <ul style={{ listStyle: "none" }}>
        {tasks
          ? tasks.map((val, index) => {
              return <TaskItem task={val} key={val._id} />;
            })
          : null}
      </ul>
    </div>
  );
};

export default App;
