import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";


const userDefaultState = {
    _id: null,
    firstname: null,
    lastname: null,
    email: null,
    mobile: null,
    token:null,
};



const initialState = {
    user: userDefaultState,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

