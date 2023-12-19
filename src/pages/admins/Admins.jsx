import React, { useEffect } from 'react'
import { UserLayout } from '../../components/layout/UserLayout'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserAction } from '../user_signup_login/userAction';
import { UsersTable } from '../../components/users/UsersTable';

const Admins = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    user?.role === "admin" && dispatch(getAllUserAction())
  }, [user?.role, dispatch])

  return (
   user?.role === "admin" ? <UserLayout title ="Admins">
      <UsersTable role="admin"/>
    </UserLayout> : <h1>Unauthorized</h1>
  )
}

export default Admins
