import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";

export const getBlogs = createAsyncThunk("blogs/get-blogs", async (thunkAPI) => {
  try {
    return await blogService.getBlogs();
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

export const createBlogs = createAsyncThunk(
    "blogs/create-blogs",
    async (blogData, thunkAPI) => {
        try {
            return await blogService.createBlog(blogData);
        } catch (error) {
            return thunkAPI.rejectWithValue({
                message: error.response?.data?.message || error.message,
                status: error.response?.status,
            });
        }
    }
);

export const resetState = createAction("Reset_all");

const initialState = {
    blogs: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message:"",
}


 export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBlogs.pending, (state) => {
            state.isLoading = true;
        }).addCase(getBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogs = action.payload;
        }).addCase(getBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createBlogs.pending, (state) => {
            state.isLoading = true;
        }).addCase(createBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdBlog = action.payload;
        }).addCase(createBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
  },
    
});


export default blogSlice.reducer;