import React from 'react'
import { UserLayout } from '../../components/layout/UserLayout'
import { useSelector } from 'react-redux';

const BurrowHistory = () => {
  const { user } = useSelector((state) => state.adminInfo);
  return (
   user?.role === "admin" ? <UserLayout title ="Burrow History">
      Burrow History
    </UserLayout> : <h1>Unauthorized</h1>
  )
}

export default BurrowHistory
