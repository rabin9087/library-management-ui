import React from "react";
import CustomInput from "../../components/custome-input/CustomInput";
import { Form, Button } from "react-bootstrap";

const AdminSignup = () => {
  const inputs = [
    {
      label: "First Name",
      name: "fName",
      placeholder: "Jhon",
      type: "text",
      required: true,
    },
   
    {
      label: "Last Name",
      name: "lName",
      placeholder: "Smith",
      type: "text",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "jhon@smith.com",
      type: "email",
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      placeholder: "04xx xxx xxx",
      type: "text",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "*********",
      type: "password",
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      placeholder: "*********",
      type: "password",
      required: true,
    },
  ];
  return (
    <div className="bg-dark p-3 text-light">
      <Form className="form-center border shaow-lg p-4">
        <h2>Create New Admin</h2>
        <hr />
        {inputs.map((item, i) => (
          <CustomInput key={i} {...item}/>
        ))}
        
        <div className="d-grid mt-2">
          <Button className="primary" type="submit">Create New Admin</Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminSignup;
