import React, { useState } from "react";
import CustomInput from "../components/Custominput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";



let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
});


const Addproduct = () => {
  const [desc, setDesc] = useState();

    const formik = useFormik({
    initialValues: {
       title: "",
       description: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
      // alert(JSON.stringify(values, null, 2));
    },
  });


  const handleChange = (e) => {
    setDesc(e);
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput type="text" label="Enter Product Title" name="title" onChng={formik.handleChange("title")} onBlr={formik.handleBlur("title")} />
        <div className="mb-3">
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={(evt) => {
              handleChange(evt);
            }}
          />
        </div>

        <CustomInput type="number" label="Enter Product Price" />
        <select name="" className="form-control py-3 mb-3" id="">
          <option value="">Select Brand</option>
        </select>
        <select name="" className="form-control py-3 mb-3" id="">
          <option value="">Select Category</option>
        </select>
        <select name="" className="form-control py-3 mb-3" id="">
          <option value="">Select Color</option>
        </select>
        <CustomInput type="number" label="Enter Quantity" />

        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Addproduct;
