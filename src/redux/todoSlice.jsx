import { createSlice } from "@reduxjs/toolkit"

export const todoSlice = createSlice({
    name: "todo",
    initialState: [],
    reducers: {
        add: (state, action) => {
          let id = state[state.length-1].id+1
          action.payload.id=id
          state.push(action.payload)
        },
        toggle: (state, action) => {
            let id = action.payload
            state.forEach(e => {
                if(e.id===id){
                    e.status = !e.status
                }
            });
        },
        start:(state, action) =>{
            action.payload.forEach(e =>{
                state.push(e)
            })
        }
    }
})

export const { add, toggle, start } = todoSlice.actions
export default todoSlice.reducer