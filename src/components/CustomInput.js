import React from "react";

const CustomInput = ({ type, label, i_id, i_class }) => {
  return (
    <div class="form-floating mb-3">
      <input
        type={type}
        class={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
      />
      <label for={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
