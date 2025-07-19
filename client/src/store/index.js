import { configureStore, createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
    name:"image",
    initialState:{
        photo:''
    },
    reducers:{
        setPhoto:(state,action) => {
            state.photo = action.payload
        }
    }
})

export const {setPhoto} = imageSlice.actions

const store = configureStore({
    reducer: {
        image:imageSlice.reducer
    }
})

export default store