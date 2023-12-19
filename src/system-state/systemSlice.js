import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal : false
}
const SystemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {
        setShowModal: (state, { payload }) => {
            state.showModal = payload
        },
      
    }
})

const { reducer, actions } = SystemSlice
export const { setShowModal } = actions
export default reducer