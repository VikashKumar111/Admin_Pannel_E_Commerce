import React, { useEffect, useState } from "react";
import CustomInput from "../components/Custominput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brands/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import "react-widgets/styles.css";
import Multiselect from "react-widgets/Multiselect";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.string().required("Price is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  console.log(color);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
    formik.values.color = color;
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pcategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);

  const colors = [];
  colorState.forEach((i) => {
    colors.push({
      _id: i._id,
      color: i.title,
    });
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
        <CustomInput
          type="text"
          label="Enter Product Title"
          name="title"
          onChng={formik.handleChange("title")}
          onBlr={formik.handleBlur("title")}
          val={formik.values.title}
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <div className="">
          <ReactQuill
            theme="snow"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
        </div>
        <div className="error">
          {formik.touched.description && formik.errors.description}
        </div>
        <CustomInput
          type="number"
          label="Enter Product Price"
          name="price"
          onChng={formik.handleChange("price")}
          onBlr={formik.handleBlur("price")}
          val={formik.values.price}
        />
        <div className="error">
          {formik.touched.price && formik.errors.price}
        </div>
        <select name="" className="form-control py-3 mb-3" id="">
          <option value="">Select Brand</option>
          {brandState.map((i, j) => {
            return (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            );
          })}
        </select>
        <select name="" className="form-control py-3 mb-3" id="">
          <option value="">Select Category</option>
          {catState.map((i, j) => {
            return (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            );
          })}
        </select>
        <Multiselect
          dataKey="id"
          textField="color"
          data={colors}
          onChange={(e)=> setColor(e)}
        />
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
