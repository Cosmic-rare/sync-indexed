import React, { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "./db/db";
import useSocket from "./hooks/useSocket";
import Inputs from "./components/Inputs";
import TaskItem from "./components/TaskItem";
import Order from "./components/Order";
import Status from "./components/status";
import TrashItem from "./components/TrashItem";
import CategoryTitle from "./components/CategoryTitle";
import axios from "axios";
import useNetwork from "./hooks/useNetwork";
import { sync } from "./module/syncSurveillance";

const App = () => {
  const [syncStatus, setSyncStatus] = useState(0);
  const [order, setOrder] = useState("create+");
  const tasks = useLiveQuery(() => {
    const task = db.tasks.orderBy(
      order.slice(0, -1) === "update" ? "_updatedAt" : "_createdAt"
    );
    return order.slice(-1) === "-" ? task.reverse().toArray() : task.toArray();
  }, [order]);
  const [, connected, reconnection, clientId] = useSocket();
  const syncCount = useLiveQuery(() => db.sync.count());
  const syncTable = useLiveQuery(() => db.sync.toArray());
  const network = useNetwork();

  useEffect(() => {
    axios.get(`${process.env.API_URI}/pull`).then((res) => {
      db.tasks.clear();
      db.tasks.bulkPut(res.data.tasks);
      setSyncStatus(1);
      console.log("pull");
    });
  }, []);

  useEffect(() => {
    if (syncCount && syncStatus === 1) {
      sync(syncTable, network, clientId);
      console.log("push");
    }
    console.log(syncTable);
  }, [syncTable, syncStatus]);

  return (
    <div>
      <Inputs />
      <Order order={order} setOrder={setOrder} />
      <Status
        connected={connected}
        reconnection={reconnection}
        syncCount={syncCount}
      />

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
