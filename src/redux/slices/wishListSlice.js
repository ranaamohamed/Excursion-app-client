import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthError } from "../../utils/authError";
// Base URL for API calls from environment variables
import api from "../../api/axios";
const BASE_URL = process.env.REACT_APP_API_URL;

//get client's wishlist
export const GetClientWishList = createAsyncThunk(
  "wishlist/GetClientWishList",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/Booking/GetClientWishList`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const AddTripToWishList = createAsyncThunk(
  "wishlist/AddTripToWishList",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/Booking/AddTripToWishList`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching wishlist count
export const fetchWishlistCount = createAsyncThunk(
  "wishlist/fetchWishlistCount",
  async (clientId, { rejectWithValue }) => {
    if (!clientId) {
      return 0;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/TravelClient/GetWishListCount?clientId=` + clientId,
        {},
        { skipAuth: true }
      );

      // Assuming the API returns a simple number like in your example
      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist count:", error);
      // Return 0 on error but don't show error to user for count
      return 0;
    }
  }
);
const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    loading: false,
    error: null,
    success: null,
    MyWishList: [],
    WishListCount: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetClientWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetClientWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.MyWishList = action.payload;
      })
      .addCase(GetClientWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(AddTripToWishList.pending, (state) => {
        //state.loading = true;
        state.error = null;
      })
      .addCase(AddTripToWishList.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.loading = false;
      })
      .addCase(AddTripToWishList.rejected, (state, action) => {
        console.log("reject add");
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWishlistCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistCount.fulfilled, (state, action) => {
        state.loading = false;
        state.WishListCount = action.payload;
      })
      .addCase(fetchWishlistCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishListSlice.reducer;
