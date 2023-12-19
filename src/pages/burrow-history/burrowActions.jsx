import { toast } from "react-toastify"
import { fetchBurrows, postBurrow, returnBurrowedBook } from "../../helper/axiosHelper"
import { getABookAction } from "../book/bookAction"
import { setBurrows } from "./burrowSlice"

export const postBurrowAction = (obj) => async(dispatch) => {
    const pending = postBurrow(obj)
    toast.promise(pending, {
        pending: "Please wait....."
    })
    const {status, message} = await pending
    toast[status](message)

    if(status === "success"){
        //refeatch the selected boo and update the page
        dispatch(getABookAction(obj.boookId))
    }
}

export const fetchBurrowsAction = () => async(dispatch) => {
  
    const {status, message, burrows} = await fetchBurrows()

    if(status === "success"){
        //refeatch the selected boo and update the page
        dispatch(setBurrows(burrows))
    }
}

export const returnBurrowedBookAction = (_id) => async(dispatch) => {
    const pending = returnBurrowedBook(_id)
    toast.promise(pending, {
        pending: "Please wait....."
    })
    const {status, message} = await pending
    // toast[status](message)

    if(status === "success"){
        //refeatch all the books - check first
        //refetch all the book
        dispatch(fetchBurrowsAction())
    }
}