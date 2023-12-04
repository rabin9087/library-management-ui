import { configureStore } from '@reduxjs/toolkit'
import userReducer from './pages/user_signup_login/userSlice'
const store = configureStore({
    reducer: {
        adminInfo: userReducer,
    }
})

export default store;