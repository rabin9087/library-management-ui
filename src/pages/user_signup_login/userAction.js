import { getUser } from "../../helper/axiosHelper";
import { setUser } from './userSlice'

export const getUserAction =()=> async (dispatch) => {
    const { status, message, user } = await getUser();
    if (status === "success") {
        //send user to the store
        dispatch(setUser(user))
    }
} 