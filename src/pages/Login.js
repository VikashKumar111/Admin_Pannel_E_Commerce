import React from "react";
import CustomInput from "../components/Custominput";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

let schema = Yup.object().shape({
  email: Yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});



const Login = () => {

   const formik = useFormik({
     initialValues: {
       email: '',
       password:'',
     },
     validationSchema:schema,
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });
  
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <div
        className="my-5 bg-white rounded-3 mx-auto p-4"
        style={{ width: "30%" }}
      >
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            label="Email Address"
            id="email"
            onCh={formik.handleChange("email")}
            val={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div> 
       ) : null}
          <CustomInput
            type="text"
            name="password"
            label="Password"
            id="pass"
            onCh={formik.handleChange("password")}
            val={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
         <div>{formik.errors.password}</div>
       ) : null}
          <div className="mb-3 text-end">
            <Link to="forgot-password" className="">
              Forgot Password?
            </Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
