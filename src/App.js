import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/user_signup_login/Login';
import Signup from './pages/user_signup_login/Signup';
import AdminSignup from './pages/admin_signup/AdminSignup';
import Home from './pages/home/Home';
import { ToastContainer } from "react-toastify";
import Dashboard from './pages/dashboard/Dashboard';
import Books from './pages/book/Books';
import Student from './pages/student/Student';
import BurrowHistory from './pages/burrow-history/BurrowHistory';
import MyProfile from './pages/profile/MyProfile';
import { AdminePrivateRouter, PrivateRouter } from './components/private-router/PrivateRouter';
import MyBook from './pages/my-books/MyBook';
import NewBook from './pages/book/NewBook';
import { useEffect } from 'react';
import { getAllBooksAction } from './pages/book/bookAction';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(getAllBooksAction())
  }, [])
  
  return (
    <div className="">
      <Routes>
        {/* public pages  */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* private pages  */}
        <Route path='/admin-signup' element={<AdminePrivateRouter><AdminSignup /></AdminePrivateRouter>} />
        <Route path='/dashboard' element={<PrivateRouter><Dashboard /></PrivateRouter>} />
        <Route path='/books' element={<AdminePrivateRouter><Books /></AdminePrivateRouter>} />
        <Route path='/newBook' element={<AdminePrivateRouter><NewBook /></AdminePrivateRouter>} />
        <Route path='/my-books' element={<PrivateRouter><MyBook /></PrivateRouter>} />
        <Route path='/students' element={<AdminePrivateRouter><Student /></AdminePrivateRouter>} />
        <Route path='/burrow-history' element={<AdminePrivateRouter><BurrowHistory /></AdminePrivateRouter>} />
        <Route path='/myProfile' element={<PrivateRouter><MyProfile /></PrivateRouter>} />
      </Routes>

      <ToastContainer position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
    </div>
  );
}

export default App;
