import React from "react";
import CustomInput from "../components/Custominput";
const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <div className="my-5 bg-white rounded-3 mx-auto p-4" style={{ width: "28%" }}>
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <form action="">
          <CustomInput type="text" label="Email" id="email" />
          <CustomInput type="text" label="Password" id="pass" />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
