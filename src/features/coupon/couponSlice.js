import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import couponService from "./couponservice";

export const getAllCoupon = createAsyncThunk(
  "coupons/get-coupons",
  async (thunkAPI) => {
    try {
      return await couponService.getCoupons();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupons/create-coupon",
  async (couponData, thunkAPI) => {
    try {
      return await couponService.createCoupons(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
    coupons: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const couponSlice = createSlice({
    name: "coupons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCoupon.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllCoupon.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.coupons = action.payload;
        }).addCase(getAllCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})
