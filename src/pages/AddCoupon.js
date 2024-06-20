// import React, { useEffect } from "react";
// import CustomInput from "../components/Custominput";
// import * as Yup from "yup";
// import { useFormik } from "formik";
// import {
//   createCoupon,
//   getACoupon,
//   getAllCoupons,
//   resetState,
//   updateACoupon,
// } from "../features/coupon/couponSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { useLocation } from "react-router-dom";

// let schema = Yup.object().shape({
//   name: Yup.string().required("Coupon Name is Required"),
//   expiry: Yup.date().required("Expiry Date is Required"),
//   discount: Yup.number().required("Discount Percentage is Required"),
// });

// const AddCoupon = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const couponId = location.pathname.split("/")[3];

//   console.log(couponId);

//   useEffect(() => {
//     dispatch(getAllCoupons());
//   }, []);

//   useEffect(() => {
//     if (couponId) {
//       dispatch(getACoupon(couponId));
//     } else {
//       dispatch(resetState());
//     }
//   }, [couponId]);

//   const newCoupon = useSelector((state) => state.coupon);
//   const {
//     isSuccess,
//     isError,
//     isLoading,
//     createdCoupon,
//     couponName,
//     couponExpiry,
//     couponDiscount,
//   } = newCoupon;

//   console.log(couponExpiry);
//   console.log(newCoupon);

//   const changeDateFormat = (date) => {
//     const newDate = new Date(date).toLocaleDateString();
//     const [month, day, year] = newDate.split("/");
//     return [year, month, day].join("-");
//   };

//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       name: couponName || "",
//       // expiry: changeDateFormat(couponExpiry) || "",
//       expiry: couponExpiry || "",
//       discount: couponDiscount || "",
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       if (couponId !== undefined) {
//         const data = { id: couponId, couponData: values };
//         dispatch(updateACoupon(data));
//       } else {
//         dispatch(createCoupon(values));
//       }

//       formik.resetForm();
//       notification();
//     },
//   });

//   const notification = () => {
//     if (isSuccess && createdCoupon) {
//       toast.success("Coupon Added Successfully!");
//       // setTimeout(() => {
//       //   dispatch(resetState());
//       //   // navigate("/admin/list-brand");
//       // }, 3000);
//     }
//     if (isError) {
//       toast.error("Something Went Wrong!");
//     }
//   };

//   return (
//     <div>
//       <h3>Add Coupon</h3>
//       <div>
//         <form action="" onSubmit={formik.handleSubmit}>
//           <CustomInput
//             type="text"
//             name="name"
//             onChng={formik.handleChange("name")}
//             onBlr={formik.handleBlur("name")}
//             val={formik.values.name}
//             label="Enter Coupon Name"
//             id="name"
//           />
//           <div className="error">
//             {formik.touched.name && formik.errors.name}
//           </div>
//           <CustomInput
//             type="date"
//             name="expiry"
//             onChng={formik.handleChange("expiry")}
//             onBlr={formik.handleBlur("expiry")}
//             val={formik.values.expiry}
//             label="Enter Expiry Date"
//             id="date"
//           />
//           <div className="error">
//             {formik.touched.expiry && formik.errors.expiry}
//           </div>
//           <CustomInput
//             type="number"
//             name="discount"
//             onChng={formik.handleChange("discount")}
//             onBlr={formik.handleBlur("discount")}
//             val={formik.values.discount}
//             label="Enter Discount"
//             id="discount"
//           />
//           <div className="error">
//             {formik.touched.discount && formik.errors.discount}
//           </div>
//           <button
//             className="btn btn-success border-0 rounded-3 my-5"
//             type="submit"
//           >
//             Add Coupon
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCoupon;

import React, { useEffect } from "react";
import CustomInput from "../components/Custominput";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  createCoupon,
  getACoupon,
  getAllCoupons,
  resetState,
  updateACoupon,
} from "../features/coupon/couponSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  name: Yup.string().required("Coupon Name is Required"),
  expiry: Yup.date().required("Expiry Date is Required"),
  discount: Yup.number().required("Discount Percentage is Required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const couponId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  useEffect(() => {
    if (couponId) {
      dispatch(getACoupon(couponId));
    } else {
      dispatch(resetState());
    }
  }, [couponId, dispatch]);

  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    createdCoupon,
    couponName,
    couponExpiry,
    couponDiscount,
    updatedCoupon,
  } = newCoupon;

  const changeDateFormat = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: couponExpiry ? changeDateFormat(couponExpiry) : "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (couponId !== undefined) {
        const data = { id: couponId, couponData: values };
        dispatch(updateACoupon(data));

        setTimeout(() => {
          navigate("/admin/list-coupon")
        },1000)
      } else {
        dispatch(createCoupon(values));
      }

      formik.resetForm();
      notification();
    },
  });

  const notification = () => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfully!");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div>
      <h3>Add Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
            label="Enter Coupon Name"
            id="name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            name="expiry"
            onChng={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            label="Enter Expiry Date"
            id="date"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            name="discount"
            onChng={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            val={formik.values.discount}
            label="Enter Discount"
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
