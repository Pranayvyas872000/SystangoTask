import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const postsSlice = createSlice({
  name: "userdata",
  initialState: initialState,
  reducers: {
    setUserdata: (state, action) => {
      const  data  = action.payload; 
      state=data
      return {
        ...state,
        data
      }      
    },
  }
})

export const { setUserdata } = postsSlice.actions
export default postsSlice.reducer