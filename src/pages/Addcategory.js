import React from "react";
import CustomInput from "../components/Custominput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newProdCategory, resetState } from "../features/pcategory/pcategorySlice";
import { toast } from "react-toastify";


let schema = Yup.object().shape({
  title: Yup.string().required("Category is Required"),
});

const Addcategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newProdCat = useSelector((state) => state.pcategory);
  const { isSuccess, isError, isLoading, createdCategory } = newProdCat;

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
    //   console.log("Submitting form with values:", values);
      dispatch(newProdCategory(values));
      formik.resetForm();
      notification();
    },
  });

  const notification = () => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfully!");
      setTimeout(() => {
         dispatch(resetState());
        // navigate("/admin/list-category");
      }, 3000);
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
      <div>
        <form action=""  onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Product Category"
            id="prodcat"
          />

          <div className="error mt-3">
            {formik.touched.title && formik.errors.title}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcategory;
