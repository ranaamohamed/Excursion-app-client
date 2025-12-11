import React, { useEffect, useState } from "react";
import { useTranslation, getLanguage } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  GetClientWishList,
  AddTripToWishList,
} from "../../redux/slices/wishListSlice";
import "./WishingCart.scss";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import TripCard from "../Shared/TripCard/TripCard";
import LoadingPage from "../Loader/LoadingPage";

function WishingCart() {
  const t = useTranslation();
  const dispatch = useDispatch();
  const [booking_code, setBooking_code] = useState("");
  const { loading, error, success, MyWishList } = useSelector(
    (state) => state.wishList
  );

  useEffect(() => {
    GetMyWishList();
    return () => {};
  }, [dispatch]);
  const GetMyWishList = () => {
    let data = {
      lang_code: localStorage.getItem("lang") || getLanguage(),
      currency_code: "",
      trip_type: 0,
      client_id: "",
    };
    dispatch(GetClientWishList(data));
  };
  return (
    <section className="centerSection mywish-section">
      <Container>
        {MyWishList && MyWishList.length > 0 ? (
          <div>
            <div class="header_title_center">
              <h2>{t("WishCart.MyWishTitle")}</h2>
            </div>

            <Row>
              {MyWishList.map((trip, index) => {
                return (
                  <Col key={index} md={4} xs={6}>
                    {" "}
                    <TripCard trip={trip} refreshTrips={GetMyWishList} />
                  </Col>
                );
              })}
            </Row>
          </div>
        ) : (
          <div>
            <img
              src="./images/empty_cart.jpg"
              loading="lazy"
              alt="wishing_cart_empty"
              className="empty_cart"
            />
            <h3>{t("WishCart.NoWishActivities")}</h3>
            <Link to="/">
              <Button className="SmallWidthBtn blueBtn roundedBtn">
                {t("Booking.ExploreActivities")}
              </Button>
            </Link>
          </div>
        )}
      </Container>
      {loading ? <LoadingPage /> : null}
    </section>
  );
}

export default WishingCart;
