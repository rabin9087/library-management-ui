import { toast } from "react-toastify"
import { deleteBook, deleteReview, fetchReview, getBook, postBook, postReview, updateBook, updateReview } from "../../helper/axiosHelper"
import { setBooks, setABook, setReviews } from "./bookSlice"
import { useDispatch } from "react-redux"
import { setShowModal } from "../../system-state/systemSlice"
import { fetchBurrowsAction } from "../burrow-history/burrowActions"

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

//======Review Actions====

export const postNewReviewAction = (reviewObj) => async (dispatch) => {
    const pending = postReview(reviewObj)
    const { status, message } = await pending
    toast.promise(pending, {
        pending: "Pease wait ...."
    })
    toast[status](message)

    if (status === "success") {
        dispatch(setShowModal(false))

        //call the function that fatchs all the reviews and updates the store
        dispatch(fetchBurrowsAction())
    }
}

export const fetchReviewsAction = () => async (dispatch) => {  
    const { status, message, reviews } = await fetchReview()
    if (status === "success") {

        dispatch(setReviews(reviews))
    }
}

export const updateReviewAction = (reviewObj) => async (dispatch) => {
    const pending = updateReview(reviewObj)
    const { status, message } = await pending
    toast.promise(pending, {
        pending: "Pease wait ...."
    })
    toast[status](message)

    if (status === "success") {

        //call the function that fatchs all the reviews and updates the store
        dispatch(fetchReviewsAction())
    }
}

export const deleteReviewAction = (_id) => async (dispatch) => {
    const pending = deleteReview(_id)
    const { status, message } = await pending
    toast.promise(pending, {
        pending: "Pease wait ...."
    })
    toast[status](message)

    if (status === "success") {

        //call the function that fatchs all the reviews and updates the store
        dispatch(fetchReviewsAction())
    }
}