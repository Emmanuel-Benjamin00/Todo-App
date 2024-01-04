import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { add, toggle, start } from "./redux/todoSlice"
import AxiosService from "./common/ApiService"

function App() {
  let todoData = useSelector((state) => state.todo)
  let [todo, setTodo] = useState("")
  let [page, setPage] = useState(0)
  let [filteredTodo, setFilteredTodo] = useState(todoData)
  let dispatch = useDispatch()
  let [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);

  let getTodos = async () => {
    try {
      let res = await AxiosService.get("/todo/get")
      if (res.status === 200) {
        console.log(...res.data.todos)
        dispatch(start(res.data.todos))
      }
    } catch (error) {
      console.log(error)
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  let postTodos = async () => {
    try {
      let res = await AxiosService.post("/todo/create", {
        todo
      })
      if (res.status === 201) {
        try {
          let res = await AxiosService.get("/todo/get")
          const index = res.data.todos.length - 1
          console.log(res.data.todos[index])
          dispatch(add(res.data.todos[index]))
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const toggleTask = (i) => {
    dispatch(toggle(i))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setTodo(" ")
      postTodos()
      event.target.blur()
    }
  };

  useEffect(() => {
    getTodos()
  }, [])

  useEffect(() => {
    if (page === 0) {
      setFilteredTodo(todoData)
    }
    else if (page === 1) {
      setFilteredTodo(todoData.filter((e) => !e.status))
    }
    else if (page === 2) {
      setFilteredTodo(todoData.filter((e) => e.status))
    }
  }, [page, todoData])

  return (
    <>
      <div className='bg-img'>
        <div className="container-fluid content">
          <h1 className="heading"> ToDo</h1>
          <div className="todo-wrapper">
            <div className='form-floating  mb-3 create-todo'>
              <input
                type="text"
                autocomplete="off"
                className='create-input form-control'
                id="floatingInput"
                value={todo}
                placeholder='Enter your TODO'
                onChange={(e) => { setTodo(e.target.value) }}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <label htmlFor="floatingInput">Enter your Todo</label>
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

                <h6>List of Todo..</h6>
                {
                  loading ?
                    <>
                      <div className='d-flex flex-column justify-content-center align-items-center text-black' style={{ width: "100%" }}>
                        <div className="spinner-border text-black" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="ms-2 mt-3">Loading...</p>
                      </div>
                    </>
                    : error ? (
                      <div className="alert alert-danger" role="alert" style={{ width: "80%" }}>
                        {error}
                      </div>
                    ) :  (
                        filteredTodo
                          .map((e) => {
                            return <li key={e._id} className={e.status ? "strikeout" : ""}>
                              <input type='checkbox' checked={e.status} onChange={() => toggleTask(e._id)} /> &nbsp; {e.todo}
                            </li>
                          })
                      )
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
