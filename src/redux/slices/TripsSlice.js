import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthError } from "../../utils/authError";
// Base URL for API calls from environment variables
import api from "../../api/axios";
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

//get exercusion trips
export const getExerTrips = createAsyncThunk(
  "trips/getAll",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/TravelClient/GetTripsAll`,
        formData,
        { skipAuth: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get exercusion trip details
export const getExerTripsDetails = createAsyncThunk(
  "trips/GetTripDetails",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/TravelClient/GetTripDetails`,
        formData,
        { skipAuth: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//get exercusion trips
export const GetTripCategories = createAsyncThunk(
  "trips/getCatAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/TravelClient/GetTripCategories`,
        {},
        { skipAuth: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get trips' reviews
export const GetClientsReviews = createAsyncThunk(
  "trips/GetClientsReviews",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/TravelClient/GetClientsReviews`,
        formData,
        { skipAuth: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get trips' pickups
export const GetPickupsForTrip = createAsyncThunk(
  "trips/GetPickupsForTrip",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/TravelClient/GetPickupsForTrip`,
        formData,
        { skipAuth: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const TripsSlice = createSlice({
  name: "exertrips",
  initialState: {
    loading: false,
    error: null,
    success: null,
    ExerTrips: [],
    TripsCats: [],
    TripDetails: {},
    Reviews: [],
    TripPickups: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExerTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExerTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.ExerTrips = action.payload;
      })
      .addCase(getExerTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch trips";
      })
      .addCase(GetTripCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTripCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.TripsCats = action.payload;
      })
      .addCase(GetTripCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch trips";
      })
      .addCase(getExerTripsDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExerTripsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.TripDetails = action.payload;
      })
      .addCase(getExerTripsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GetClientsReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetClientsReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.Reviews = action.payload;
      })
      .addCase(GetClientsReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GetPickupsForTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPickupsForTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.TripPickups = action.payload;
      })
      .addCase(GetPickupsForTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default TripsSlice.reducer;
