import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

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
      <Form>
        <h2>Login</h2>
        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" component="p" />
        <Field name="password" type="password" placeholder="Password" />
        <ErrorMessage name="password" component="p" />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default Login;
