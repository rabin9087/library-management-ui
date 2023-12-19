import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    burrows: [],
    selectedBurrows: {}
}
const burrowSlice = createSlice({
    name: "burrow",
    initialState,
    reducers: {
        setBurrows: (state, { payload }) => {
            state.burrows = payload
        },
        setABurrow: (state, { payload }) => {
            state.selectedBurrows = payload
        }
    }
})

const { reducer, actions } = burrowSlice
export const { setBurrows, setABurrow } = actions
export default reducer