import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
}

const userSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
})

const { reducer, actions } = userSlice;

export const { setUser } = actions
export default reducer;