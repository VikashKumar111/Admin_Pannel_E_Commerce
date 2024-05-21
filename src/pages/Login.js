import React from "react";
import CustomInput from "../components/Custominput";
const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <CustomInput type="text" label="Email" id="email" />
        <CustomInput type="text" label="Password" id="pass" />
      </div>
    </div>
  );
};

export default Login;
