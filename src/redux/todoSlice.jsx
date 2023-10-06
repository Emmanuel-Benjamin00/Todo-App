import { createSlice } from "@reduxjs/toolkit"

export const todoSlice = createSlice({
    name: "todo",
    initialState: [
        {
            task: "Learn React Redux",
            status: true
        },
        {
            task: "Implement React Redux",
            status: false
        }
    ],
    reducers: {
        add: (state, action) => {
           console.log(action)
        },
        toggle: (state, action) => {
            let i = action.payload
            state[i].status = !state[i].status
        }
    }
})

export const { add, toggle } = todoSlice.actions
export default todoSlice.reducer