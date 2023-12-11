import { toast } from "react-toastify"
import { deleteBook, getBook, postBook, updateBook } from "../../helper/axiosHelper"
import { setBooks, setABook } from "./bookSlice"
import { useDispatch } from "react-redux"

export const getAllBooksAction = () => async (dispatch) => {
    const { status, message, books } = await getBook()
    if (status === "success") {
        dispatch(setBooks(books))
    }
}

export const getABookAction = (_id) => async (dispatch) => {
    const { status, message, books } = await getBook(_id)
    if (status === "success") {
        dispatch(setABook(books))
    }
}

export const postNewBookAction = (bookObj) => async (dispatch) => {
    const pending = postBook(bookObj)
    const { status, message } = await pending
    toast.promise(pending, {
        pending: "Pease wait ...."
    })
    toast[status](message)

    if (status === "success") {
        //call the function that fatchs all the books and updates the store
        dispatch(getAllBooksAction())
    }
}

export const updateBookAction = (bookObj) => async (dispatch) => {
    const pending = updateBook(bookObj)
    const { status, message } = await pending
    toast.promise(pending, {
        pending: "Pease wait ...."
    })
    toast[status](message)

    if (status === "success") {
        //call the function that fatchs all the books and updates the store
        dispatch(getAllBooksAction())
        dispatch(setABook({}))
    }
}

export const deleteBookAction = (_id) => async (dispatch) => {
    const pending = deleteBook(_id)
    const { status, message } = await pending
    toast.promise(pending, {
        pending: "Pease wait ...."
    })
    toast[status](message)

    if (status === "success") {
        //call the function that fatchs all the books and updates the store
        dispatch(getAllBooksAction());
        return true;
    }
}