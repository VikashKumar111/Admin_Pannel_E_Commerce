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


