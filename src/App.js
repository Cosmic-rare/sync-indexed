import React from "react"
import db from "./db"
import { useLiveQuery } from "dexie-react-hooks"
import Inputs from "./components/Inputs"
import TaskItem from "./components/TaskItem"


const App = () => {
  const tasks = useLiveQuery(
    () => db.tasks.orderBy("_createdAt").toArray()
  )

  return (
    <div>
      <Inputs />
      <ul style={{ listStyle: "none" }}>
        {tasks
          ? tasks.map((val, index) => {
            return (<TaskItem task={val} key={val._id} />)
          })
          : null}
      </ul>
    </div >
  )
}

export default App
