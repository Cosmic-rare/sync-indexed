import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "./db/db";
import { sync } from "./db/sync";
import useSocket from "./hooks/useSocket";
import useNetwork from "./hooks/useNetwork";
import Inputs from "./components/Inputs";
import TaskItem from "./components/TaskItem";
import Order from "./components/Order";
import Status from "./components/status";
import ForceSync from "./components/ForceSync";
import TrashItem from "./components/TrashItem";
import CategoryTitle from "./components/CategoryTitle";

const App = () => {
  const [order, setOrder] = useState("create+");
  const tasks = useLiveQuery(() => {
    const task = db.tasks.orderBy(
      order.slice(0, -1) === "update" ? "_updatedAt" : "_createdAt"
    );
    return order.slice(-1) === "-" ? task.reverse().toArray() : task.toArray();
  }, [order]);
  const [, connected, reconnection] = useSocket();
  const syncTable = useLiveQuery(() => db.sync.orderBy("_changedAt").toArray());
  const network = useNetwork();
  const syncCount = useLiveQuery(() => db.sync.count());

  return (
    <div>
      <Inputs />
      <Order order={order} setOrder={setOrder} />
      <Status
        connected={connected}
        reconnection={reconnection}
        syncCount={syncCount}
      />
      <ForceSync onClick={() => sync(syncTable, network)} />

      <CategoryTitle title="Tasks" />
      <ul style={{ listStyle: "none" }}>
        {tasks
          ? tasks.map((val) => {
              return <TaskItem task={val} key={val._id} />;
            })
          : null}
      </ul>

      <CategoryTitle title="Trash" />
      <ul style={{ listStyle: "none" }}>
        {tasks
          ? tasks.map((val) => {
              return <TrashItem task={val} key={val._id} />;
            })
          : null}
      </ul>
    </div>
  );
};

export default App;
