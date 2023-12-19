import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    allUsers: []
}

const userSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAllUser: (state, action) => {
            state.allUsers = action.payload;
        },
    }
})

const { reducer, actions } = userSlice;

export const { setUser, setAllUser } = actions
export default reducer;