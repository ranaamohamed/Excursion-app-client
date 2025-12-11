import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import api from "../../api/axios";
const BASE_URL = process.env.REACT_APP_API_URL;

// Helper function to get authentication headers
const getAuthHeaders = (isForm) => {
  let accessToken = localStorage.getItem("token");
  if (isForm) {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
        "Accept-Language": "en",
      },
    };
  }
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Accept-Language": "en",
    },
  };
};
//Get Destination list with its translations
export const GetDestinations = createAsyncThunk(
  "destinations/getDestinations",
  async (formData, { rejectWithValue }) => {
    try {
      // const response = await axios.post(
      //   `${BASE_URL}/GetDestinationWithTranslations`,
      //   formData,
      //   getAuthHeaders(false)
      // );
      const response = await api.post(
        `/TravelClient/getDestinations`,
        formData,
        { skipAuth: true }
        //getAuthHeaders(false)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get destination tree
export const GetDestination_Tree = createAsyncThunk(
  "destinations/GetDestination_Tree",
  async (formData, { rejectWithValue }) => {
    try {
      // const response = await axios.post(
      //   `${BASE_URL}/GetDestinationWithTranslations`,
      //   formData,
      //   getAuthHeaders(false)
      // );
      const response = await api.post(
        `/TravelClient/GetDestination_Tree`,
        formData,
        { skipAuth: true }
        //getAuthHeaders(false)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const destinationSlice = createSlice({
  name: "destinations",
  initialState: {
    DestinationList: [],
    DestinationTreeList: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDestinations: (state, action) => {
      state.DestinationList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetDestinations.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(GetDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.DestinationList = action.payload;
      })
      .addCase(GetDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GetDestination_Tree.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(GetDestination_Tree.fulfilled, (state, action) => {
        state.loading = false;
        state.DestinationTreeList = action.payload;
      })
      .addCase(GetDestination_Tree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // .addMatcher(
    //   (action) => action.type.endsWith("/pending"),
    //   (state) => {
    //     //state.status = "loading";
    //     state.loading = true;
    //   }
    // )
    // .addMatcher(
    //   (action) => action.type.endsWith("/rejected"),
    //   (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   }
    // );
  },
});

export const { setDestinations } = destinationSlice.actions;
export default destinationSlice.reducer;
