import React from 'react'
import { UserLayout } from '../../components/layout/UserLayout'
import { useSelector } from 'react-redux';

const Student = () => {
  const { user } = useSelector((state) => state.adminInfo);
  return (
   user?.role === "admin" ? <UserLayout title ="Students">
      Students
    </UserLayout> : <h1>Unauthorized</h1>
  )
}

export default Student
