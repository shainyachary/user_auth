import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../api";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await loginUser(values);
          localStorage.setItem("token", response.data.token);
          onLogin(response.data.token);
          navigate("/dashboard");
        } catch (error) {
          alert(error.response?.data?.message || "Login failed");
        }
        setSubmitting(false);
      }}
    >
      <div className="flex min-h-screen justify-center items-center w-full">
        <Form className="border border-gray-500 rounded-[.2rem] py-5 px-6 bg-white w-80 md:w-md m-3 shadow-lg">
          <h2 className="text-3xl font-semibold tracking-[1px] text-center mb-7">
            Login
          </h2>
          <div className="mb-4">
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="block w-full border border-gray-300 rounded-[.1rem] py-3 px-4 text-base outline-0 text-gray-600"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-600 text-[14px] tracking-[1px] pl-[4px]"
            />
          </div>
          <div className="mb-4">
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="block w-full border border-gray-300 rounded-[.1rem] py-3 px-4 text-base outline-0 text-gray-600"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-600 text-[14px] tracking-[1px] pl-[4px]"
            />
          </div>
          <button
            type="submit"
            className="bg-teal-800 rounded-[.5rem] text-white font-bold w-full py-3 mt-2 uppercase tracking-[2px] hover:bg-teal-600"
          >
            Login
          </button>
          <p className="text-center py-2 text-gray-700 tracking-[1px] font-medium">
            Don't have an account ?{" "}
            <Link to="/" className="text-blue-600 font-semibold underline">
              Sign Up
            </Link>{" "}
            here
          </p>
          <p className="text-center py-1 mb-2 text-gray-700 tracking-[1px] font-medium">
            <Link
              to="/forgot-password"
              className="text-blue-600 font-semibold underline"
            >
              {" "}
              Forgot Password
            </Link>
          </p>
        </Form>
      </div>
    </Formik>
  );
};

export default Login;
