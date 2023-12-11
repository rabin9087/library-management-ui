import { configureStore } from '@reduxjs/toolkit'
import userReducer from './pages/user_signup_login/userSlice'
import bookReducer from './pages/book/bookSlice';
const store = configureStore({
    reducer: {
        adminInfo: userReducer,
        bookInfo: bookReducer,
    }
})

export default store;