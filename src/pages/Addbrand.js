import React, { useEffect } from "react";
import CustomInput from "../components/Custominput";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  createBrand,
  getABrand,
  getBrands,
  resetState,
  updateABrand,
} from "../features/brands/brandSlice";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Brand Name is Required"),
});

const Addbrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];

  // const navigate = useNavigate();
  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrand, brandName ,updatedBrand} = newBrand;

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
      // formik.values.title = brandName;
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      //   console.log("Submitting form with values:", values);
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateABrand(data));
       
        dispatch(getBrands());
        setTimeout(() => {
          navigate("/admin/list-brand");
          dispatch(resetState());
        },2000)
      } else {
        dispatch(createBrand(values));
      }

      formik.resetForm();
      notification();
    },
  });

  const notification = () => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully!");
      // setTimeout(() => {
      //    dispatch(resetState());
      //   // navigate("/admin/list-brand");
      // }, 3000);
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfully!");
      // setTimeout(() => {
      //    dispatch(resetState());
      //   // navigate("/admin/list-brand");
      // }, 3000);
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? "Edit" : "Add"} Brand
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Brand Name"
            id="brand"
          />
          <div className="error mt-3">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
             {getBrandId !== undefined ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
