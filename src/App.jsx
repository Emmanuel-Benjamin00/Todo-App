import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { add, toggle } from "./redux/todoSlice"

function App() {
  let todo = useSelector((state) => state.todo)
  let [page, setPage] = useState(0)
  let [task, setTask] = useState("")
  let dispatch = useDispatch()

  const createTask = () => {
    const payload = {
      task,
      status: false
    }
    dispatch(add(payload))
  }

  const toggleTask = (i) => {
    dispatch(toggle(i))
}

return (
  <>
    <div className="container-fluid">
      <h1 className="heading"> ToDo Items</h1>
      <div className="todo-wrapper">
        <div className='create-todo'>
          <input type="text" className='create-input' placeholder='Enter your TODO' onChange={(e) => { setTask(e.target.value) }} />
          <button className='btn btn-primary' onClick={() => createTask()}>Create</button>
        </div>
        <div className="todo-tabs">
          <ul>
            <li className={page === 0 ? "active" : ""} onClick={() => {
              setPage(0)
            }}>All</li>
            <li className={page === 1 ? "active" : ""} onClick={() => {
              setPage(1)
            }}>Pending</li>
            <li className={page === 2 ? "active" : ""} onClick={() => {
              setPage(2)
            }}>Completed</li>
          </ul>
        </div>
        <div className="todo-items">
          <ul>
            {
              todo
                .map((e, i) => {
                  return <li key={i} className={e.status ? "strikeout" : ""}>
                    <input type='checkbox' checked={e.status} onChange={() => toggleTask(i)} /> &nbsp; {e.task}
                  </li>
                })
            }
          </ul>
        </div>
      </div>
    </div>
  </>
)
}

export default App
