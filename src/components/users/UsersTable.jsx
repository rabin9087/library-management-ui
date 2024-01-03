import { Alert, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Search from "../searchComponent/Search";
import { useState } from "react";

export const UsersTable = ({ role }) => {
  const { allUsers } = useSelector((state) => state.userInfo);
  const users = allUsers.filter((item) => item.role === role);
  const [tempUsers, setTempUsers] = useState(users);
  return (
    <div className="m-3">
      <div className="text-end mb-4">
        <Link to={"/admin-signup"}>
          <Button>Add New Admin</Button>
        </Link>
      </div>
      <p className="d-flex justify-content-between">
        <label htmlFor="">
          {" "}
          {tempUsers.length} {role + "s"} found!
        </label>

        {tempUsers.length === 0 && (
          <Alert variant="warning">No user found!</Alert>
        )}
        <div>
          <Search
            data={users}
            setSearchedData={setTempUsers}
            type={"users"}
            placeholder={"Search by email"}
          />
        </div>
      </p>

      <Table striped bordered hover className="">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>status</th>
            <th>Name</th>
            <th>Phone</th>
            <th>email</th>
            <th>Joined Date</th>
          </tr>
        </thead>
        <tbody>
          {tempUsers.map(
            ({ _id, status, fName, lName, email, phone, createdAt }, i) => (
              <tr key={_id}>
                <td>{1 + i}.</td>
                <td>{status}</td>
                <td>{fName + " " + lName}</td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>{createdAt.slice?.(0, 10)} </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};
