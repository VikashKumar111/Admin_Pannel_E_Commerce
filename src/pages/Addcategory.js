import React, { useEffect } from "react";
import CustomInput from "../components/Custominput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getACategory,
  getCategories,
  newProdCategory,
  resetState,
  updateACategory,
} from "../features/pcategory/pcategorySlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Category is Required"),
});

const Addcategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getProdCatId = location.pathname.split("/")[3];

  const navigate = useNavigate();

  const newProdCat = useSelector((state) => state.pcategory);
  const { isSuccess, isError, isLoading, createdCategory, categoryName, updatedCategory} =
    newProdCat;

  useEffect(() => {
    if (getProdCatId !== undefined) {
      dispatch(getACategory(getProdCatId));
    } else {
      dispatch(resetState());
    }
  }, [getProdCatId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      //   console.log("Submitting form with values:", values);
      if (getProdCatId !== undefined) {
        const data = { id: getProdCatId, categoryData: values };
        dispatch(updateACategory(data));

        // dispatch(getCategories());
        // setTimeout(() => {
        //   navigate("/admin/list-category");
        //   dispatch(resetState());
        // },[2000])
      } else {
         dispatch(newProdCategory(values));
      }

      formik.resetForm();
      setTimeout(() => {
            notification();
       },[2000])
     
    },
  });

  const notification = () => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfully!");
      // setTimeout(() => {
      //    dispatch(resetState());
      //   // navigate("/admin/list-category");
      // }, 3000);
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
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
