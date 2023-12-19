import React, { useEffect } from 'react'
import { UserLayout } from '../../components/layout/UserLayout'
import { BurrowHistoryTable } from '../../components/burrow-history/BurrowHistoryTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBurrows } from '../../helper/axiosHelper'
import { fetchBurrowsAction } from '../burrow-history/burrowActions'

const MyBook = () => {
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.userInfo)
  useEffect(() => {
     dispatch(fetchBurrowsAction())
  }, [ dispatch])

  return (
    <UserLayout title ="My Books">
      <BurrowHistoryTable userId = {user?._id}/>
    </UserLayout>
  )
}

export default MyBook