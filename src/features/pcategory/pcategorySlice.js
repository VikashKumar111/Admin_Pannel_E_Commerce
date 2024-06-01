import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pcategoryService from "../pcategory/pcategoryService";

export const getCategories = createAsyncThunk(
  "productCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await pcategoryService.getProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const initalState = {
  pCategories: [],
  isLoading:false,
  isError: false,
  isSuccess: false,
  message:"",
}