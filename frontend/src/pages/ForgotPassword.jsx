import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../api";

const ForgotPassword = () => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await forgotPassword(values);
          alert("Password reset link sent!");
        } catch (error) {
          alert(error.response?.data?.message || "Error sending reset link");
        }
        setSubmitting(false);
      }}
    >
      <Form>
        <h2>Forgot Password</h2>
        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" component="p" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default ForgotPassword;
