import React, { useEffect, useState } from "react";
import db from "./db/db";
import { useLiveQuery } from "dexie-react-hooks";
import Inputs from "./components/Inputs";
import TaskItem from "./components/TaskItem";
import Order from "./components/Order";
import Status from "./components/status";
import useSocket from "./hooks/useSocket";
import axios from "axios";
import useSync from "./hooks/useSync";

const App = () => {
  const [order, setOrder] = useState("create+");
  const tasks = useLiveQuery(() => {
    const task = db.tasks.orderBy(
      order.slice(0, -1) === "update" ? "_updatedAt" : "_createdAt"
    );
    return order.slice(-1) === "-" ? task.reverse().toArray() : task.toArray();
  }, [order]);
  const [, connected, reconnection] = useSocket();
  const syncTable = useLiveQuery(() => db.sync.toArray());
  const { network } = useSync();

  useEffect(() => {
    if (syncTable && network) {
      if (syncTable.length !== 0) {
        syncTable.map((val) => {
          axios
            .post("http://localhost:4000", {
              commands: [{ type: val.type, data: val }],
            })
            .then(() => {
              db.sync.delete(val.id);
            });
        });
      }
    }
  }, [syncTable, network]);

  return (
    <div>
      <Inputs />
      <Order order={order} setOrder={setOrder} />
      <Status connected={connected} reconnection={reconnection} />
      <ul style={{ listStyle: "none" }}>
        {tasks
          ? tasks.map((val) => {
              return <TaskItem task={val} key={val._id} />;
            })
          : null}
      </ul>
    </div>
  );
};

export default App;
