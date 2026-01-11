import React from "react";
import { useTranslation } from "react-multi-lang";
import { Rating } from "../../../helper/TripHelper";
import {
  FaEuroSign,
  FaDollarSign,
  // FaRegSquareCheck,
  // FaStar,
  // FaStarHalf,
  // FaHeart,
  // FaRegStar,
  // FaBasketShopping,
  // FaCircleInfo,
} from "react-icons/fa6";
// import Swal from "sweetalert2";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./TripCard.scss";
// import {
//   AddTripToWishList,
//   fetchWishlistCount,
// } from "../../redux/slices/wishListSlice";
import WishListButton from "../wishButton/WishListButton";
function TripCard({ trip, refreshTrips }) {
  const t = useTranslation();
  const dispatch = useDispatch();
  // const { loading, error, success } = useSelector((state) => state.wishList);
  // const AddOrRemoveToWish = (e) => {
  //   e.preventDefault(); // stop navigation
  //   e.stopPropagation();
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   const wishlistData = {
  //     id: trip?.wish_id,
  //     trip_id: trip?.trip_id,
  //     client_id: user ? user.id : 0,
  //     created_at: null,
  //     trip_type: trip?.trip_type,
  //     delete: trip?.isfavourite, // true to remove, false to add
  //   };
  //   dispatch(AddTripToWishList(wishlistData)).then((result) => {
  //     if (result.payload && result.payload.success == true) {
  //       dispatch(fetchWishlistCount(user ? user.id : 0));
  //       refreshTrips();
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: result?.payload?.errors,
  //       });
  //     }
  //   });
  // };
  // console.log("loading ", loading);
  return (
    <Link
      to={`/trips/${trip.route}`}
      state={{ trip_id: trip.trip_id }}
      className="w-100 h-100 card_link"
    >
      {" "}
      <Card className="trip_card">
        <div className="img-wrapper">
          <Card.Img variant="top" src={trip.default_img} />
          <div className="img-overlay">
            <WishListButton trip={trip} refreshTrips={refreshTrips} />
            {/* <Button
              className="card-icon"
              onClick={AddOrRemoveToWish}
              aria-label={
                trip?.isfavourite
                  ? t("Trips.removeFromWishlist")
                  : t("Trips.addToWishlist")
              }
            >
              <FaHeart
                className={`heat-icon ${trip?.isfavourite ? "liked" : ""}`}
              />
            </Button> */}
            {/* <Button className="card-icon">
              <Link
                to={`/trips/${trip.route}`}
                state={{ trip_id: trip.trip_id }}
              >
                {" "}
                <FaCircleInfo className="book-icon" />
              </Link>
            </Button> */}
          </div>
        </div>

        <Card.Body>
          {/* Location */}
          <div className="location">
            <FaMapMarkerAlt />
            <span>{trip?.dest_name}</span>
          </div>
          <Card.Title>{trip.trip_name}</Card.Title>

          {/* <Card.Text>{trip.trip_description}</Card.Text> */}

          {/* <ul className="fac_list">
          {trip.facilities &&
            trip.facilities.map((fac, index) => {
              return (
                <li key={index}>
                  <FaRegSquareCheck className="icon" /> {fac.facility_name}
                </li>
              );
            })}
        </ul> */}
        </Card.Body>
        <Card.Footer>
          <div className="flex_div">
            <div>
              {Rating(trip.review_rate)}
              <span>
                ({trip.total_reviews} {t("Trips.Reviews")})
              </span>
            </div>
            <div className="price_item">
              <span style={{ fontSize: "12px" }}>From </span>

              <span className="price">
                {trip.trip_min_price}
                <small>
                  {trip.currency_code == "EUR" ? (
                    <FaEuroSign />
                  ) : (
                    <FaDollarSign />
                  )}
                </small>
              </span>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
}

export default TripCard;
