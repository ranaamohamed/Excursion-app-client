import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { createAuthError } from "../../utils/authError";
// Base URL for API calls from environment variables
const BASE_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;
  const userId = user?.id;
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
};

//save booking
export const SaveClientBooking = createAsyncThunk(
  "booking/SaveClientBooking",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/Booking/SaveClientBooking`, formData);
      return response.data;
    } catch (error) {
      console.log("catchhhhhhhh ");
      return rejectWithValue(error.response?.data);
    }
  }
);

//calculate price
export const CalculateBookingPrice = createAsyncThunk(
  "booking/CalculateBookingPrice",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/TravelClient/CalculateBookingPrice`,
        formData,
        { skipAuth: true }
        // getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//get booking summary data
export const GetBookingSummary = createAsyncThunk(
  "booking/GetBookingSummary",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/Booking/GetBookingSummary`,
        formData
        //getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.log("catch err ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const ConfirmBooking = createAsyncThunk(
  "booking/ConfirmBooking",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/Booking/ConfirmBookingLst`,
        formData
        // getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const DeleteBooking = createAsyncThunk(
  "booking/DeleteBooking",
  async (booking_id, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/Booking/DeleteBooking?booking_id=` + booking_id
        // getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//cancel booking
export const CancelBooking = createAsyncThunk(
  "booking/CancelBooking",
  async (booking_id, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/Booking/CancelBooking?booking_id=` + booking_id
        // getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//get my booking except cancel
export const GetMyBooking = createAsyncThunk(
  "booking/GetMyBooking",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/Booking/GetMyBooking?booking_code=` + formData.booking_code,
        formData
        // getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk for fetching wishlist count
export const fetchBookingCount = createAsyncThunk(
  "booking/GetMyBookingCount",
  async (clientId, { rejectWithValue }) => {
    if (!clientId) {
      return 0;
    }

    try {
      const response = await api.post(
        `${BASE_URL}/TravelClient/GetMyBookingCount?clientId=` + clientId,
        {},
        { skipAuth: true }
      );

      // Assuming the API returns a simple number like in your example
      return response.data;
    } catch (error) {
      console.error("Error fetching booking count:", error);
      // Return 0 on error but don't show error to user for count
      return 0;
    }
  }
);
const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    error: null,
    success: null,
    BookingData: [],
    MyBookingData: [],
    BookingCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SaveClientBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SaveClientBooking.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(SaveClientBooking.rejected, (state, action) => {
        console.log("reject save booking");
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(CalculateBookingPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CalculateBookingPrice.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(CalculateBookingPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GetBookingSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBookingSummary.fulfilled, (state, action) => {
        console.log("full state");
        state.loading = false;
        state.BookingData = action.payload;
      })
      .addCase(GetBookingSummary.rejected, (state, action) => {
        console.log("reject state");
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(ConfirmBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ConfirmBooking.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(ConfirmBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(DeleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteBooking.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(DeleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GetMyBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetMyBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.MyBookingData = action.payload;
      })
      .addCase(GetMyBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(CancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CancelBooking.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(CancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookingCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingCount.fulfilled, (state, action) => {
        state.loading = false;
        state.BookingCount = action.payload;
      })
      .addCase(fetchBookingCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
