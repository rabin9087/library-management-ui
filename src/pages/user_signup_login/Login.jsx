import React, { useEffect, useRef, useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../components/custome-input/CustomInput";
import { toast } from "react-toastify";
import { loginUser } from "../../helper/axiosHelper";
import { autoLogin, getUserAction } from "./userAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa6";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { user } = useSelector((state) => state.userInfo);
  const [isPending, setIsPending] = useState(false);
  const fromLoaction =
    location?.state?.from?.location?.pathname || "/dashboard";
  const handelOnSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      toast.error("Please insert both email and password");
    }
    setIsPending(true);
    const pending = loginUser({ email, password });
    toast.promise(pending, {
      pending: "Please wait",
    });
    const { status, message, jwts } = await pending;
    setIsPending(false);
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

  const copyPassword = (password) => {
    return navigator.clipboard.writeText(password);
  };

  const copyEmail = (email) => {
    return navigator.clipboard.writeText(email);
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
          <h2>Welcome Back</h2>
          <hr />
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} />
          ))}

          <div className="flex align-items-center border shaow-lg p-2">
            <div className="d-flex align-items-center">
              Admin Email: test@admin.com
              <Button
                variant="secondry"
                onClick={() => copyEmail("test@admin.com")}
              >
                <FaRegCopy />
              </Button>
            </div>
            <div className="d-flex align-items-center">
              Admin Password: test@123
              <Button
                className=""
                variant="secondry"
                onClick={() => copyPassword("test@123")}
              >
                <FaRegCopy />
              </Button>
            </div>
            <br />
            <br />
          </div>

          <div className="d-grid mt-2 ">
            <Button className="primary" type="submit" disabled={isPending}>
              Login
            </Button>
          </div>
          <div className="text-end mt-2">
            New here? <a href="/signup">Sign Up Now</a>
          </div>
        </Form>
      </div>
    </MainLayout>
  );
};

export default Login;
