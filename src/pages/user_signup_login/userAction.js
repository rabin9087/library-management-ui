import { LogoutUser, getNewAccessJwt, getUser } from "../../helper/axiosHelper";
import { setUser } from './userSlice'

export const getUserAction = () => async (dispatch) => {
    const { status, message, user } = await getUser();
    if (status === "success") {
        //send user to the store
        dispatch(setUser(user))
    }
}

export const autoLogin = () => async (dispatch) => {
    //check if we  have accessJWT, if so use, get user and mount in the state

    const accessJWT = sessionStorage.getItem("accessJWT")
    const refreshJWT = localStorage.getItem("refreshJWT")
    if (!accessJWT && refreshJWT) {
        const response = await getNewAccessJwt()
        if (response?.accessJWT) {
            sessionStorage.setItem("accessJWT", response.accessJWT)
            dispatch(getUserAction())
        }
    }
    dispatch(getUserAction());
}

export const logOutUser = (email) => async (dispatch) => {
    //clear the user state
    dispatch(setUser({}))
    const accessJWT = sessionStorage.getItem("accessJWT")
    sessionStorage.removeItem("accessJWT")
    localStorage.removeItem("refreshJWT")

    //delete both jwts from server - both table
    await LogoutUser({ email, accessJWT })
    //clear browser storage



    //redirect to home page
}