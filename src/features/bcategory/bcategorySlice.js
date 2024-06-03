import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";

export const getCategories = createAsyncThunk(
  "blogCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const initialState = {
    bCategories: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};


const bcategorySlice = createSlice({
    name: "bCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase
    }
})
