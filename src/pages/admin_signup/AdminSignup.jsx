import React, { useState } from "react";
import CustomInput from "../../components/custome-input/CustomInput";
import { Form, Button } from "react-bootstrap";
import { postAdminUser, postUser } from "../../helper/axiosHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserLayout } from "../../components/layout/UserLayout";
import { useSelector } from "react-redux";

const initialState = {
  fName: "",
  lName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AdminSignup = () => {
  const [form, setForm] = useState(initialState);
  const [isPending, setIsPending] = useState(false);
  const navigateAdminLogin = useNavigate();

  const { user } = useSelector((state) => state.userInfo);
  const role = user.role;

  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      return alert("Password do not match!");
    }
    setIsPending(true);
    const pending = postUser(rest, role);

    toast.promise(pending, {
      pending: "Please wait",
    });

    const { status, message } = await pending;
    setIsPending(false);
    toast[status](message);
    if (status === "success") {
      navigateAdminLogin("/login");
    }

    //toast.success() toast.error()
    // setForm(initialState);
  };

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
      type: "number",
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
    <UserLayout>
      <div className=" p-3 ">
        <Form
          onSubmit={handelOnSubmit}
          className="form-center border shaow-lg p-4"
        >
          <h2>Create New Admin</h2>
          <hr />
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handelOnChange} />
          ))}

          <div className="d-grid mt-2">
            <Button className="primary" type="submit" disabled={isPending}>
              Create New Admin
            </Button>
          </div>
        </Form>
      </div>
    </UserLayout>
  );
};

export default AdminSignup;
