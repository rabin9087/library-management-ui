import { toast } from "react-toastify"
import { getBook, postBook } from "../../helper/axiosHelper"
import { setBooks } from "./bookSlice"
import { useDispatch } from "react-redux"

export const getAllBooksAction = () => async(dispatch) => {
    const {status, message, books} = await getBook()
    if(status === "success"){
        dispatch(setBooks(books))
    }
}

export const postNewBookAction = (bookObj) => async(dispatch) => {
    const pending = postBook(bookObj)
    const {status, message} = await pending
    toast.promise(pending, {
        pending: "Pease wait ...."
    })
    toast[status](message)

    if(status === "success"){
        //call the function that fatchs all the books and updates the store
        dispatch(getAllBooksAction())
    }
}