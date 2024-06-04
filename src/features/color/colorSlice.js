import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColors = createAsyncThunk(
    "colors/get-colors", async (thunkAPI) => {
        try {
            return await colorService.getColors();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


const initialState = {
    colors: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message:"",
}


export const colorSlice = createSlice({
    name: "colors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getColors.pending, (state) => {
            state.isLoading = true;
        }).addCase(getColors.fulfilled, (state,action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = true;
            state.colors = action.payload;
        }).addCase(getColors.rejected, (state, action) => {
            state.isLoading = true;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});


export default colorSlice.reducer;
