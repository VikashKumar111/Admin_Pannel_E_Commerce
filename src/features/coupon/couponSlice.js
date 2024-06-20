// import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
// import couponService from "./couponService";

// export const getAllCoupon = createAsyncThunk(
//   "coupons/get-coupons",
//   async (thunkAPI) => {
//     try {
//       return await couponService.getCoupons();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const createCoupon = createAsyncThunk(
//   "coupons/create-coupon",
//   async (couponData, thunkAPI) => {
//     try {
//       return await couponService.createCoupons(couponData);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const resetState = createAction("Reset_all");

// const initialState = {
//   coupons: [],
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: "",
// };

// export const couponSlice = createSlice({
//   name: "coupons",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllCoupon.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getAllCoupon.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.coupons = action.payload;
//         console.log(action.payload);
//       })
//       .addCase(getAllCoupon.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.error;
//       })
//       .addCase(createCoupon.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createCoupon.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.createdCoupon = action.payload;
//       })
//       .addCase(createCoupon.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.error;
//       })
//       .addCase(resetState, () => initialState);
//   },
// });

// export default couponSlice.reducer;




import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

// Thunk to fetch all coupons
export const getAllCoupons = createAsyncThunk(
  "coupons/getAllCoupons",
  async (_, thunkAPI) => {
    try {
      const response = await couponService.getCoupons();
      // console.log(response);
      return response;
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to create a coupon
export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (couponData, thunkAPI) => {
    try {
      const response = await couponService.createCoupons(couponData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateACoupon = createAsyncThunk(
  "coupon/update-coupon",
  async (coupon, thunkAPI) => {
    try {
      return await couponService.updateCoupon(coupon);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const getACoupon = createAsyncThunk(
  "coupon/get-coupon",
  async (id, thunkAPI) => {
    try {
      const response = await couponService.getCoupon(id);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const deleteACoupon = createAsyncThunk(
  "coupon/delete-coupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Action to reset state
export const resetState = createAction("coupons/resetState");

// Initial state
const initialState = {
  coupons: [],
  createdCoupon: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Slice definition
const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || 'Failed to fetch coupons';
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCoupon = action.payload;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || 'Failed to create coupon';
      })
      .addCase(getACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACoupon.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading= false;
        state.isError = false;
        state.isSuccess = true;
        state.couponName = action.payload.name;
        state.couponExpiry = action.payload.expiry;
        state.couponDiscount = action.payload.discount;
      })
      .addCase(getACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCoupon = action.payload;
      })
      .addCase(updateACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCoupon = action.payload;
      })
      .addCase(deleteACoupon.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
