import React, { useEffect } from "react";
import CustomInput from "../components/Custominput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createColor, getAColor, resetState } from "../features/color/colorSlice";
import { useLocation } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Color is Required"),
});

const Addcolor = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];

  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor ,colorName } = newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      //   console.log("Submitting form with values:", values);
      dispatch(createColor(values));
      formik.resetForm();
      notification();
    },
  });

  const notification = () => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfully!");
      // setTimeout(() => {
      //   dispatch(resetState());
      //   // navigate("/admin/list-color");
      // }, 3000);
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Product Color"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error mt-3">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
