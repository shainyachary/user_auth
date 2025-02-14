import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../api";
import { Link, useNavigate } from "react-router-dom";

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
        firstName: Yup.string().required("Field can't be empty"),
        lastName: Yup.string().required("Field can't be empty"),
        gender: Yup.string()
          .oneOf(["Male", "Female", "Other"], "Select a valid gender")
          .required("Gender is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Field can't be empty"),
        password: Yup.string()
          .min(6, "At least 6 characters")
          .required("Field can't be empty"),
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
        <div className="flex min-h-screen justify-center items-center w-full">
          <Form className="border border-gray-500 rounded-[.2rem] py-5 px-6 bg-white w-80 md:w-md m-3 shadow-lg">
            <h2 className="text-3xl font-semibold tracking-[1px] text-center mb-7">
              Sign Up
            </h2>
            <div className="mb-4">
              <Field
                name="firstName"
                type="text"
                placeholder="First Name"
                className="block w-full border border-gray-300 rounded-[.1rem] py-3 px-4 text-base outline-0 text-gray-600"
              />
              <ErrorMessage
                name="firstName"
                component="p"
                className="text-red-600 text-[14px] tracking-[1px] pl-[4px]"
              />
            </div>
            <div className="mb-4">
              <Field
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="block w-full border border-gray-300 rounded-[.1rem] py-3 px-4 text-base outline-0 text-gray-600"
              />
              <ErrorMessage
                name="lastName"
                component="p"
                className="text-red-600 text-[14px] tracking-[1px] pl-[4px]"
              />
            </div>
            <div className="mb-4">
              <Field
                as="select"
                name="gender"
                className="block w-full border border-gray-300 rounded-[.1rem] py-3 px-4 text-base outline-0 text-gray-600"
              >
                <option value="" className="text-gray-100">
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="p"
                className="text-red-600 text-[14px] tracking-[1px] pl-[4px]"
              />
            </div>
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
            <input
              type="file"
              onChange={(e) => setFieldValue("profileImage", e.target.files[0])}
              className="block w-full border border-gray-300 rounded-[.1rem] py-2 px-2 text-base outline-0 text-gray-600 mb-4 file:mr-4 file:rounded-full file:border-0 file:bg-teal-600 file:px-5 file:py-2 file:text-sm file:font-semibold file:text-white-700 hover:file:bg-teal-100 dark:file:bg-teal-800 dark:file:text-white dark:hover:file:bg-teal-500"
            />
            <button
              type="submit"
              className="bg-teal-800 rounded-[.5rem] text-white font-bold w-full py-3 mt-2 uppercase tracking-[2px] hover:bg-teal-600"
            >
              Sign Up
            </button>
            <p className="text-center p-2 mb-3 text-gray-700 tracking-[1px] font-medium">
              Already have an account ?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold underline"
              >
                Login
              </Link>{" "}
              here
            </p>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Register;
