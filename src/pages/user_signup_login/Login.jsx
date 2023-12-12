import React, { useEffect, useRef } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../components/custome-input/CustomInput";
import { toast } from "react-toastify";
import { loginUser } from "../../helper/axiosHelper";
import { autoLogin, getUserAction } from "./userAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { user } = useSelector((state) => state.userInfo);

  const fromLoaction =
    location?.state?.from?.location?.pathname || "/dashboard";

  const handelOnSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);

    if (!email || !password) {
      toast.error("Please insert both email and password");
    }

    const { status, message, jwts } = await loginUser({ email, password });

    if (status === "success") {
      const { accessJWT, refreshJWT } = jwts;
      sessionStorage.setItem("accessJWT", accessJWT);
      localStorage.setItem("refreshJWT", refreshJWT);

      //fetch user infor and redirect to dashboard
      dispatch(getUserAction());

      return;
    }
    toast[status](message);
  };

  useEffect(() => {
    //redirect to Dashboard
    user?._id && navigate(fromLoaction);
    dispatch(autoLogin());
  }, [user?._id, navigate, dispatch, fromLoaction]);

  const inputs = [
    {
      label: "Email",
      name: "email",
      placeholder: "jhon@smith.com",
      type: "email",
      passRef: emailRef,
      autoComplete: "new-email",
      required: true,
    },

    {
      label: "Password",
      name: "password",
      placeholder: "*********",
      type: "password",
      passRef: passwordRef,
      autoComplete: "new-password",
      required: true,
    },
  ];
  return (
    <MainLayout>
      <div className="p-3">
        <Form
          onSubmit={handelOnSubmit}
          className="form-center border shaow-lg p-4"
        >
          <h2>Welcome Admin Login Area</h2>
          <hr />
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} />
          ))}

          <div className="d-grid mt-2">
            <Button className="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </MainLayout>
  );
};

export default Login;
