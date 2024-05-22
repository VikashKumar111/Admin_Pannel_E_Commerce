import React from "react";
import CustomInput from "../components/Custominput";
const Resetpassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <div className="my-5  bg-white rounded-3 mx-auto p-4" style={{ width: "32%" }}>
        <h3 className="text-center">Forgot Password</h3>
        <p className="text-center">Please Enter your registered Email to get reset password mail</p>
        <form action="">
          <CustomInput type="text" label="Email" id="email" />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >Send Link</button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
