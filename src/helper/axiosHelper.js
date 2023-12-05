import axios from 'axios'
const rootEP = process.env.REACT_APP_ROOTAPI;
const userEP = rootEP + "/users";


const getAccessJWT = () => {
    return sessionStorage.getItem("accessJWT")
}

const getRefreshJWT = () => {
    return localStorage.getItem("refreshJWT")
}

const axiosProcessor = async (obj) => {
    const { isPrivate, refreshToken } = obj
    if (isPrivate) {
        obj.headers = {
            Authorization: refreshToken ? getRefreshJWT() : getAccessJWT(),
        }
    }

    try {
        const resp = await axios(obj)
        return resp.data;
    } catch (error) {
        const erroMsg = error?.response?.data?.message

        if (erroMsg.includes("jwt expired")) {
            //get new access token
            const { accessJWT } = await getNewAccessJwt()
            console.log((accessJWT))
            if (accessJWT) {
                sessionStorage.setItem("accessJWT", accessJWT)

                //continue with perivous request
                return axiosProcessor(obj)
            } 
        }
        return {
            status: "error",
            message: error.message
        }
    }
}

export const postAdminUser = async (data) => {

    return axiosProcessor({
        method: 'post',
        url: userEP + "/admin-user",
        data,
    })
}

export const loginUser = async (data) => {
    return axiosProcessor({
        method: 'post',
        url: userEP + "/login",
        data,
    })
}

export const LogoutUser = async (data) => {
    return axiosProcessor({
        method: 'post',
        url: userEP + "/logout",
        data,
    })
}
export const getUser = async () => {
    return axiosProcessor({
        method: 'get',
        url: userEP,
        isPrivate: true
    })
}

export const getNewAccessJwt = async () => {
    return axiosProcessor({
        method: 'get',
        url: userEP + "/get-accessjwt",
        isPrivate: true,
        refreshToken: true
    })
}