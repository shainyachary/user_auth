import React from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { resetPassword } from "../api";

const ResetPassword = () => {
  const { token } = useParams();

  return (
    <Formik
      initialValues={{ password: "" }}
      validationSchema={Yup.object({
        password: Yup.string()
          .min(6, "At least 6 characters")
          .required("Required"),
      })}
      onSubmit={async (values) => {
        try {
          await resetPassword(token, values);
          alert("Password reset successfully!");
        } catch (error) {
          alert(error.response?.data?.message || "Error resetting password");
        }
      }}
    >
      <Form>
        <h2>Reset Password</h2>
        <Field name="password" type="password" placeholder="New Password" />
        <ErrorMessage name="password" component="p" />
        <button type="submit">Reset Password</button>
      </Form>
    </Formik>
  );
};

export default ResetPassword;
