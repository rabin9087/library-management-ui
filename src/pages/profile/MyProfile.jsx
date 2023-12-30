import React from 'react'
import { UserLayout } from '../../components/layout/UserLayout'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

const MyProfile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.userInfo);
  const {fName, lName, email, phone, role} = user
  return (
  <UserLayout title ="My Profile">
      <Container fluid>
        <Row>
            <h6> Full Name: {fName} {lName}</h6>
        </Row>
        <Row>
            <h6> Email: {email}</h6>
        </Row>
        <Row>
            <h6> Phone: {phone}</h6>
        </Row>
        <Row>
            <h6> Role: {role.slice(0,1).toUpperCase()}{role.slice(1)}</h6>
        </Row>
      </Container>
    </UserLayout>
  )
}

export default MyProfile
