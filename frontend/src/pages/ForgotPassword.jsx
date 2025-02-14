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
      <div className="flex min-h-screen justify-center items-center w-full">
        <Form className="border border-gray-500 rounded-[.2rem] py-5 px-6 bg-white w-80 md:w-md m-3 shadow-lg">
          <h2 className="text-3xl font-semibold tracking-[1px] text-center mb-7">
            Forgot Password
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
          <button
            type="submit"
            className="bg-teal-800 rounded-[.5rem] text-white font-bold w-full py-3 mt-2 mb-3 uppercase tracking-[2px] hover:bg-teal-600"
          >
            Submit
          </button>
        </Form>
      </div>
    </Formik>
  );
};

export default ForgotPassword;
