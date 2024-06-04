import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brands/brandSlice";
import pcategoryReducer from "../features/pcategory/pcategorySlice";
import blogReducer from "../features/blogs/blogSlice";
import bCategoryReducer from "../features/bcategory/bcategorySlice";
import colorReducer from "../features/color/colorSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pcategory: pcategoryReducer,
    blogs: blogReducer,
    bCategory: bCategoryReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
