import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  AddTripToWishList,
  fetchWishlistCount,
} from "../../../redux/slices/wishListSlice";
import Swal from "sweetalert2";
import { useTranslation } from "react-multi-lang";
import "./WishListButton.scss";
function WishListButton({ trip, refreshTrips, withBorder }) {
  const t = useTranslation();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.wishList);

  const AddOrRemoveToWish = (e) => {
    e.preventDefault(); // stop navigation
    e.stopPropagation();
    const user = JSON.parse(localStorage.getItem("user"));

    const wishlistData = {
      id: trip?.wish_id,
      trip_id: trip?.trip_id,
      client_id: user ? user.id : 0,
      created_at: null,
      trip_type: trip?.trip_type,
      delete: trip?.isfavourite, // true to remove, false to add
    };
    dispatch(AddTripToWishList(wishlistData)).then((result) => {
      if (result.payload && result.payload.success == true) {
        dispatch(fetchWishlistCount(user ? user.id : 0));
        refreshTrips();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result?.payload?.errors,
        });
      }
    });
  };
  return (
    <OverlayTrigger
      placement="left"
      overlay={
        <Tooltip>
          {trip?.isfavourite
            ? t("Trips.removeFromWishlist")
            : t("Trips.addedToWishlist")}
        </Tooltip>
      }
    >
      <Button
        className="card-icon"
        onClick={AddOrRemoveToWish}
        aria-label={
          trip?.isfavourite
            ? t("Trips.removeFromWishlist")
            : t("Trips.addToWishlist")
        }
      >
        <FaHeart
          className={
            withBorder
              ? `heart-icon-border ${trip?.isfavourite ? "liked" : ""}`
              : `heart-icon-white ${trip?.isfavourite ? "liked" : ""}`
          }
        />
      </Button>
    </OverlayTrigger>
  );
}

export default WishListButton;
