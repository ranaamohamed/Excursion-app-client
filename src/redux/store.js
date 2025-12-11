import { configureStore } from "@reduxjs/toolkit";
import ExerTripsReducer from "../redux/slices/TripsSlice";
import DestinationReducer from "../redux/slices/destinationSlice";
import AuthReducer from "../redux/slices/authSlice";
import BookingReducer from "../redux/slices/bookingSlice";
import WishListReducer from "../redux/slices/wishListSlice";
import GlobalSettingReducer from "../redux/slices/GlobalSettingSlice";
export const store = configureStore({
  reducer: {
    exertrips: ExerTripsReducer,
    destinations: DestinationReducer,
    auth: AuthReducer,
    booking: BookingReducer,
    GlobalSetting: GlobalSettingReducer,
    wishList: WishListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
