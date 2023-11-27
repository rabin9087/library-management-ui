import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/user_signup_login/Login';
import Signup from './pages/user_signup_login/Signup';
import AdminSignup from './pages/admin_signup/AdminSignup';
import Home from './pages/home/Home';

function App() {
  return (
    <div className="">
      <Routes>
        {/* public pages  */}
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>

         {/* private pages  */}
         <Route path='/admin-signup' element={<AdminSignup/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
