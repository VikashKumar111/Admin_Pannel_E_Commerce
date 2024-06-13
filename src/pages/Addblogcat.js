import React from "react";
import CustomInput from "../components/Custominput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { newBlogCategory } from "../features/bcategory/bcategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

let schema = Yup.object().shape({
  title: Yup.string().required("Category is Required"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newBlogCat = useSelector((state) => state.bCategory);
  const { isSuccess, isError, isLoading, createdBlogCategory } = newBlogCat;
    

   
    
    
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // console.log("Submitting form with values:", values);
      dispatch(newBlogCategory(values));
      formik.resetForm();
      notification();
    },
  });

    const notification = () => {
      if (isSuccess && createdBlogCategory) {
        toast.success("Blog Added Successfully!");
        setTimeout(() => {
          navigate("/admin/blog-category-list");
        }, 3000);
      }
      if (isError) {
        toast.error("Something Went Wrong!");
      }
    };

  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Blog Category"
            id="blogcat"
          />
          <div className="error mt-3">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};
export default Addblogcat;




