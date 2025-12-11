import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import api from "../../api/axios";
const BASE_URL_AUTH = process.env.REACT_APP_AUTH_API_URL;
const NonAuthHeaders = () => {
  let lang = localStorage.getItem("lang");
  return {
    "Accept-Language": lang,
  };
};
const token = localStorage.getItem("token");

const initialState = {
  user: null,
  token: token || null,
  //status: "idle",
  loading: false,
  error: null,
  success: null,
  message: null,
};
// Helper to extract error message from different response formats
const getErrorMessage = (error) => {
  if (error.response?.data?.success === false) {
    return error.response.data.errors || "Operation failed";
  }
  if (error.response?.data?.errors) {
    return error.response.data.errors;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return "An error occurred";
};

//verify email
export const ConfirmOTP = createAsyncThunk(
  "ConfirmOTP",
  async (payload, thunkAPI) => {
    var response = await api
      .post(BASE_URL_AUTH + "/ConfirmOTP", payload, { skipAuth: true })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
        //return error.response.data;
      });
    return response;
  }
);
///normal register && gmail Register (different on API path & payload)
export const RegisterUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    var response = await api
      .post(BASE_URL_AUTH + data.path, data.payload, { skipAuth: true })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
        // return error.response.data;
      });
    return response;
  }
);

//normal login & gmail Login (different on API path & payload)
export const LoginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    var response = await api
      .post(BASE_URL_AUTH + data.path, data.payload, { skipAuth: true })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
        //return error.response.data;
      });
    return response;
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(ConfirmOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      });

    builder
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.loading = false;
        state.success = action.payload.isSuccessed;
        localStorage.setItem("token", action.payload?.user?.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload?.user));
        state.message = action.payload?.message;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.loading = false;
        state.success = action.payload.isSuccessed;
        localStorage.setItem("token", action.payload?.user?.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload?.user));
        state.message = action.payload?.message;
      })
      .addCase(ConfirmOTP.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.loading = false;
        state.success = action.payload.isSuccessed;
        localStorage.setItem("token", action.payload?.user?.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload?.user));
        state.message = action.payload?.message;
      });
    // Handle rejected state for all async actions
    builder
      .addCase(RegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = action.payload;
      })
      .addCase(ConfirmOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = action.payload;
      });
    // .addMatcher(
    //   (action) => action.type.endsWith("/pending"),
    //   (state) => {
    //     //state.status = "loading";
    //     state.loading = true;
    //   }
    // )
    // .addMatcher(
    //   (action) => action.type.endsWith("/fulfilled"),
    //   (state) => {
    //     state.loading = false;
    //   }
    // )
    // .addMatcher(
    //   (action) => action.type.endsWith("/rejected"),
    //   (state, action) => {
    //     //state.status = "failed";
    //     state.error = action.payload;
    //     state.message = action.payload;
    //     state.success = false;
    //     state.loading = false;
    //   }
    // );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
