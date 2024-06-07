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
import Dropzone from 'react-dropzone';

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  color: Yup.array().required("Colors are required"),
  quantity: Yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);

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
      brand: "",
      category: "",
      color: [],
      quantity: "",
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
        <select
          name="brand"
          onChange={formik.handleChange("brand")}
          onBlur={formik.handleBlur("brand")}
          value={formik.values.brand}
          className="form-control py-3 mb-3"
          id=""
        >
          <option value="">Select Brand</option>
          {brandState.map((i, j) => {
            return (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            );
          })}
        </select>
        <div className="error">
          {formik.touched.brand && formik.errors.brand}
        </div>
        <select
          name="category"
          onChange={formik.handleChange("category")}
          onBlur={formik.handleBlur("category")}
          value={formik.values.category}
          className="form-control py-3 mb-3"
          id=""
        >
          <option value="">Select Category</option>
          {catState.map((i, j) => {
            return (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            );
          })}
        </select>
        <div className="error">
          {formik.touched.category && formik.errors.category}
        </div>
        <Multiselect
          name="color"
          dataKey="id"
          textField="color"
          data={colors}
          value={formik.values.color}
          onChange={(value) => formik.setFieldValue("color", value)}
        />
        <div className="error">
          {formik.touched.color && formik.errors.color}
        </div>
        <CustomInput
          type="number"
          label="Enter Quantity"
          name="quantity"
          onChng={formik.handleChange("quantity")}
          onBlr={formik.handleBlur("quantity")}
          val={formik.values.quantity}
        />
        <div className="error">
          {formik.touched.quantity && formik.errors.quantity}
        </div>

        <div className="bg-white border-1 p-5 text-center">
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        </div>

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
