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


const initialState = {
  pCategories: [],
  isLoading:false,
  isError: false,
  isSuccess: false,
  message:"",
}


const pcategorySlice = createSlice({
  name: "pCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    }).addCase(getCategories.fulfilled, (state,action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.pCategories = action.payload;
    }).addCase(getCategories.rejected, (state,action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
  }
})

export default pcategorySlice.reducer;