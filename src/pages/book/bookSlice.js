import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: [],
    selectedBook: {},
    reviews: []
}
const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBooks: (state, { payload }) => {
            state.books = payload
        },
        setABook: (state, { payload }) => {
            state.selectedBook = payload
        },
        setReviews: (state, { payload }) => {
            state.reviews = payload
        },
    }
})

const { reducer, actions } = bookSlice
export const { setBooks, setABook, setReviews } = actions
export default reducer