import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        password: "",
        profileImage: null,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        gender: Yup.string()
          .oneOf(["Male", "Female", "Other"], "Select a valid gender")
          .required("Gender is required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
          .min(6, "At least 6 characters")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => formData.append(key, values[key]));

        try {
          await registerUser(formData);
          navigate("/login");
        } catch (error) {
          alert(error.response?.data?.message || "Registration failed");
        }
        setSubmitting(false);
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <h2>Register</h2>
          <Field name="firstName" type="text" placeholder="First Name" />
          <ErrorMessage name="firstName" component="p" />
          <Field name="lastName" type="text" placeholder="Last Name" />
          <ErrorMessage name="lastName" component="p" />
          <div>
            <Field as="select" name="gender">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage name="gender" component="p" />
          </div>
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="p" />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="p" />
          <input
            type="file"
            onChange={(e) => setFieldValue("profileImage", e.target.files[0])}
          />
          <button type="submit">Register</button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
