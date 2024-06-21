// import React, { useEffect, useState } from "react";
// import CustomInput from "../components/Custominput";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { getBrands } from "../features/brands/brandSlice";
// import { getCategories } from "../features/pcategory/pcategorySlice";
// import { getColors } from "../features/color/colorSlice";
// import { Select } from "antd";
// import Dropzone from "react-dropzone";
// import { dltImg, uploadImg } from "../features/upload/uploadSlice";
// import {
//   createProducts,
//   getAProduct,
//   resetState,
// } from "../features/product/productSlice";
// // import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useLocation } from "react-router-dom";

// let schema = Yup.object().shape({
//   title: Yup.string().required("Title is Required"),
//   description: Yup.string().required("Description is Required"),
//   price: Yup.number().required("Price is Required"),
//   brand: Yup.string().required("Brand is Required"),
//   category: Yup.string().required("Category is Required"),
//   tags: Yup.string().required("Tag is Required"),
//   // color: Yup.array().required("Colors are required"),
//   color: Yup.array()
//     .min(1, "Pick at least one color")
//     .required("Color is Required"),
//   quantity: Yup.number().required("Quantity is Required"),
// });

// const Addproduct = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const [colorr, setColorr] = useState([]);
//   const productId = location.pathname.split("/")[3];

//   // const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(getBrands());
//     dispatch(getCategories());
//     dispatch(getColors());
//     // formik.values.color = color;
//   }, []);

//   useEffect(() => {
//     if (productId) {
//       dispatch(getAProduct(productId));
//     } else {
//       dispatch(resetState());
//     }
//   }, [productId]);

//   const brandState = useSelector((state) => state.brand.brands);
//   const catState = useSelector((state) => state.pcategory.pCategories);
//   const colorState = useSelector((state) => state.color.colors);
//   const imgState = useSelector((state) => state.upload.images);
//   const newProduct = useSelector((state) => state.product);
//   // console.log(newProduct);
//   const {
//     isSuccess,
//     isLoading,
//     isError,
//     createdProduct,
//     productName,
//     description,
//     price,
//     brand,
//     category,
//     tags,
//     color,
//     quantity,
//     images,
//   } = newProduct;

//   // useEffect(() => {
//   //   if (isSuccess && createdProduct) {
//   //     toast.success("Product Added Successfully!");
//   //   }
//   //   if (isError) {
//   //     toast.error("Something Went Wrong!");
//   //   }
//   // }, [isSuccess, isLoading, isError]);

//   // useEffect(() => {
//   //   if (isSuccess && createdProduct) {
//   //     toast.success("Product Added Successfully!");
//   //     setTimeout(() => {
//   //       navigate("/admin/list-product");
//   //     }, 3000);
//   //   }
//   //   if (isError) {
//   //     toast.error("Something Went Wrong!");
//   //   }
//   // }, [isSuccess, isError, navigate]);

//   const imge = imgState.map(({ public_id: id, url }) => ({
//     id,
//     url,
//   }));

//   // console.log(colorState);
//   // const coloropt = [];
//   // colorState.forEach((i) => {
//   //   coloropt.push({
//   //     _id: i._id,
//   //     color: i.title,
//   //   });
//   // });

//   const coloropt = colorState.map((i) => ({
//     // _id: i._id,
//     // color: i.title,

//     label: i.title,
//     value: i._id,
//   }));

//   // console.log(coloropt);

//   const img = [];
//   imgState.forEach((i) => {
//     img.push({
//       public_id: i.public_id,
//       url: i.url,
//     });
//   });

//   useEffect(() => {
//     formik.values.color = colorr ? colorr : " ";
//     formik.values.images = img;
//   }, [colorr, img]);

//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       title: productName || "",
//       description: description || "",
//       price: price || "",
//       brand: brand || "",
//       category: category || "",
//       tags: tags || "",
//       color: color || [],
//       quantity: quantity || "",
//       images: images || "",
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       dispatch(createProducts(values));
//       formik.resetForm();
//       setColorr(null);
//       dispatch(dltImg(imge.id));
//       notification();
//       // setTimeout(() => {
//       //   navigate("/admin/list-product");
//       // }, 3000);
//     },
//   });

//   // const handleColors = (e) => {
//   //   console.log(color);
//   //   setColor(e);
//   //   console.log(color);
//   // };

//   const handleColors = (selectedColors) => {
//     setColorr(selectedColors);
//     formik.setFieldValue("color", selectedColors);
//     // console.log(color);
//   };

//   const notification = () => {
//     if (isSuccess && createdProduct) {
//       toast.success("Product Added Successfully!");
//       // setTimeout(() => {
//       //     dispatch(resetState());
//       //   // navigate("/admin/list-product");
//       // }, 3000);
//     }
//     if (isError) {
//       toast.error("Something Went Wrong!");
//     }
//   };

//   return (
//     <div>
//       <h3 className="mb-4 title">Add Product</h3>
//       <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
//         <CustomInput
//           type="text"
//           label="Enter Product Title"
//           name="title"
//           onChng={formik.handleChange("title")}
//           onBlr={formik.handleBlur("title")}
//           val={formik.values.title}
//         />
//         <div className="error">
//           {formik.touched.title && formik.errors.title}
//         </div>
//         <div className="">
//           <ReactQuill
//             theme="snow"
//             name="description"
//             onChange={formik.handleChange("description")}
//             value={formik.values.description}
//           />
//         </div>
//         <div className="error">
//           {formik.touched.description && formik.errors.description}
//         </div>
//         <CustomInput
//           type="number"
//           label="Enter Product Price"
//           name="price"
//           onChng={formik.handleChange("price")}
//           onBlr={formik.handleBlur("price")}
//           val={formik.values.price}
//         />
//         <div className="error">
//           {formik.touched.price && formik.errors.price}
//         </div>
//         <select
//           name="brand"
//           onChange={formik.handleChange("brand")}
//           onBlur={formik.handleBlur("brand")}
//           value={formik.values.brand}
//           className="form-control py-3 mb-3"
//           id=""
//         >
//           <option value="">Select Brand</option>
//           {brandState.map((i, j) => {
//             return (
//               <option key={j} value={i.title}>
//                 {i.title}
//               </option>
//             );
//           })}
//         </select>
//         <div className="error">
//           {formik.touched.brand && formik.errors.brand}
//         </div>
//         <select
//           name="category"
//           onChange={formik.handleChange("category")}
//           onBlur={formik.handleBlur("category")}
//           value={formik.values.category}
//           className="form-control py-3 mb-3"
//           id=""
//         >
//           <option value="">Select Category</option>
//           {catState.map((i, j) => {
//             return (
//               <option key={j} value={i.title}>
//                 {i.title}
//               </option>
//             );
//           })}
//         </select>
//         <div className="error">
//           {formik.touched.category && formik.errors.category}
//         </div>

//         <select
//           name="tags"
//           onChange={formik.handleChange("tags")}
//           onBlur={formik.handleBlur("tags")}
//           value={formik.values.tags}
//           className="form-control py-3 mb-3"
//           id=""
//         >
//           <option value="" disabled>
//             Select Tag
//           </option>
//           <option value="featured">Featured</option>
//           <option value="popular">Popular</option>
//           <option value="special">Special</option>
//         </select>
//         <div className="error">{formik.touched.tags && formik.errors.tags}</div>

//         <Select
//           mode="multiple"
//           allowClear
//           className="w-100"
//           placeholder="Select colors"
//           value={colorr}
//           onChange={(e) => handleColors(e)}
//           options={coloropt}
//         />

//         <div className="error">
//           {formik.touched.color && formik.errors.color}
//         </div>
//         <CustomInput
//           type="number"
//           label="Enter Quantity"
//           name="quantity"
//           onChng={formik.handleChange("quantity")}
//           onBlr={formik.handleBlur("quantity")}
//           val={formik.values.quantity}
//         />
//         <div className="error">
//           {formik.touched.quantity && formik.errors.quantity}
//         </div>

//         <div className="bg-white border-1 p-5 text-center">
//           <Dropzone
//             onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
//           >
//             {({ getRootProps, getInputProps }) => (
//               <section>
//                 <div {...getRootProps()}>
//                   <input {...getInputProps()} />
//                   <p>Drag 'n' drop some files here, or click to select files</p>
//                 </div>
//               </section>
//             )}
//           </Dropzone>
//         </div>

//         <div className="showimages d-flex flex-wrap gap-3">
//           {imgState.map((i, j) => {
//             return (
//               <div key={j} className="position-relative">
//                 <button
//                   type="button"
//                   onClick={() => dispatch(dltImg(i.public_id))}
//                   className="btn-close position-absolute"
//                   style={{ top: "10px", right: "10px" }}
//                 ></button>
//                 <img src={i.url} alt="" width={200} height={200} />
//               </div>
//             );
//           })}
//         </div>
//         <button
//           className="btn btn-success border-0 rounded-3 my-5"
//           type="submit"
//         >
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Addproduct;

import React, { useState, useEffect } from "react";
import CustomInput from "../components/Custominput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brands/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { dltImg, uploadImg } from "../features/upload/uploadSlice";
import {
  createProducts,
  getAProduct,
  resetState,
  updateAProduct,
} from "../features/product/productSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  tags: Yup.string().required("Tag is Required"),
  color: Yup.array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: Yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [colorr, setColorr] = useState([]);
  const productId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  useEffect(() => {
    if (productId) {
      dispatch(getAProduct(productId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, productId]);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pcategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, createdProduct } = newProduct;

  // const selectedColors = newProduct?.color
  //   ?.map((colorId) => colorState.find((color) => color._id === colorId))
  //   .filter(Boolean);

  // console.log(selectedColors);

  // const selectedImages = newProduct?.images?.map(image =>

  //   // imgState.find(img => img.public_id === image.public_id)
  //     formik.setFieldValue("images", image)
  // ).filter(Boolean);

  // console.log(selectedImages);

  const coloropt = colorState.map((i) => ({
    label: i.title,
    value: i._id,
  }));

  const img = imgState.map((i) => ({
    public_id: i.public_id,
    url: i.url,
  }));

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: newProduct.productName || "",
      description: newProduct.description || "",
      price: newProduct.price || "",
      brand: newProduct.brand || "",
      category: newProduct.category || "",
      tags: newProduct.tags || "",
      color: newProduct?.color || [],
      quantity: newProduct.quantity || "",
      images: newProduct?.images || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (productId !== undefined) {
        const data = { id: productId, productData: values };
        dispatch(updateAProduct(data));
      } else {
        dispatch(createProducts(values));

        if (img.length > 0) {
          // Check if there are images to delete
          dispatch(dltImg(img.map((image) => image.public_id)));
        }
        // dispatch(dltImg(img.map((image) => image.public_id)));

        setColorr([]);
      }

      formik.resetForm();
      notification();
    },
  });

  const handleColors = (selectedColors) => {
    setColorr(selectedColors);
    formik.setFieldValue("color", selectedColors);
  };

  const handleImages = (acceptedFiles) => {
    dispatch(uploadImg(acceptedFiles)).then((response) => {
      formik.setFieldValue("images", response.payload);
    });
  };

  const notification = () => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {" "}
        <h3>{productId !== undefined ? "Edit" : "Add"} Product</h3>
      </h3>
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
          {brandState.map((i, j) => (
            <option key={j} value={i.title}>
              {i.title}
            </option>
          ))}
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
          {catState.map((i, j) => (
            <option key={j} value={i.title}>
              {i.title}
            </option>
          ))}
        </select>
        <div className="error">
          {formik.touched.category && formik.errors.category}
        </div>
        <select
          name="tags"
          onChange={formik.handleChange("tags")}
          onBlur={formik.handleBlur("tags")}
          value={formik.values.tags}
          className="form-control py-3 mb-3"
          id=""
        >
          <option value="" disabled>
            Select Tag
          </option>
          <option value="featured">Featured</option>
          <option value="popular">Popular</option>
          <option value="special">Special</option>
        </select>
        <div className="error">{formik.touched.tags && formik.errors.tags}</div>
        {/* <Select
          mode="multiple"
          allowClear
          className="w-100"
          placeholder="Select colors"
          value={colorr}
          onChange={handleColors}
          options={coloropt}
        /> */}
        {newProduct?.color ? (
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            value={newProduct.color}
            onChange={handleColors}
            options={coloropt}
          />
        ) : (
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            value={colorr}
            onChange={handleColors}
            options={coloropt}
          />
        )}
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
          <Dropzone onDrop={handleImages}>
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
        {/* <div className="showimages d-flex flex-wrap gap-3">
          {img.map((i, j) => (
            <div key={j} className="position-relative">
              <button
                type="button"
                onClick={() => dispatch(dltImg(i.public_id))}
                className="btn-close position-absolute"
                style={{ top: "10px", right: "10px" }}
              ></button>
              <img src={i.url} alt="" width={200} height={200} />
            </div>
          ))}
        </div> */}
        {newProduct?.images ? (
           <div className="showimages d-flex flex-wrap gap-3">
          {newProduct.images.map((i, j) => (
            <div key={j} className="position-relative">
              <button
                type="button"
                onClick={() => dispatch(dltImg(i.public_id))}
                className="btn-close position-absolute"
                style={{ top: "10px", right: "10px" }}
              ></button>
              <img src={i.url} alt="" width={200} height={200} />
            </div>
          ))}
        </div>
        ) : (
           <div className="showimages d-flex flex-wrap gap-3">
          {img.map((i, j) => (
            <div key={j} className="position-relative">
              <button
                type="button"
                onClick={() => dispatch(dltImg(i.public_id))}
                className="btn-close position-absolute"
                style={{ top: "10px", right: "10px" }}
              ></button>
              <img src={i.url} alt="" width={200} height={200} />
            </div>
          ))}
        </div>
        )}
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {productId !== undefined ? "Edit" : "Add"} Product
        </button>
      </form>
    </div>
  );
};

export default Addproduct;
