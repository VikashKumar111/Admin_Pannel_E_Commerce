import React, { useEffect } from "react";
import CustomInput from "../components/Custominput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getABlogCategory, newBlogCategory, resetState, updateABlogCategory } from "../features/bcategory/bcategorySlice";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Category is Required"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();

  const newBlogCat = useSelector((state) => state.bCategory);
  const { isSuccess, isError, createdBlogCategory, blogCategoryName ,updatedBlogCategory} = newBlogCat;
    

  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getABlogCategory(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId]);
    
    
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCategoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // console.log("Submitting form with values:", values);
      if (getBlogCatId !== undefined) {
        const data = { id: getBlogCatId, blogCategoryData: values };
        dispatch(updateABlogCategory(data));
        setTimeout(() => {
          navigate("/admin/blog-category-list")
        },1000)
      } else {
         dispatch(newBlogCategory(values));
      }
      
     
      formik.resetForm();
      notification();
    },
  });

    const notification = () => {
      if (isSuccess && createdBlogCategory) {
        toast.success("Blog Category Added Successfully!");
        setTimeout(() => {
         
           dispatch(resetState());
        }, 500);
      }
      
      if (isSuccess && updatedBlogCategory) {
        toast.success("Blog Category Updated Successfully!");
      }

      if (isError) {
        toast.error("Something Went Wrong!");
      }
    };

  return (
    <div>
      <h3 className="mb-4 title">{getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</h3>
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
            {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};
export default Addblogcat;




