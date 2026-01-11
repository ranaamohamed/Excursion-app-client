import React, { useState, useEffect } from "react";
import { useTranslation, getLanguage } from "react-multi-lang";
import LoadingPage from "../Loader/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import { motion } from "framer-motion";
import {
  getExerTrips,
  getExerTripsCategory,
} from "../../redux/slices/TripsSlice";
import TripCard from "../Shared/TripCard/TripCard";
import { useNavigate } from "react-router-dom";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
function TopTripSection() {
  const t = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success, ExerTrips, ExerTripsCats } = useSelector(
    (state) => state.exertrips
  );
  useEffect(() => {
    getTripData();
    return () => {};
  }, [dispatch]);

  const getTripData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let formData = {
      destination_id: 0,
      lang_code: localStorage.getItem("lang") || getLanguage(),
      show_in_top: true,
      show_in_slider: false,
      currency_code: localStorage.getItem("currency") || "eur",
      client_id: user ? user.id : 0,
      trip_type: 0,
      trip_types: [],
      min_price: 10,
      max_price: 1000,
    };
    dispatch(getExerTrips(formData));
  };
  // console.log("loading ", loading);
  return (
    <motion.section
      className="centerSection"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <Container>
        <div className="d-lg-flex justify-content-between align-items-center header_title">
          <div className="header_title_left">
            <h2 className="fw-bold">{t("Home.RecommendedActivities")}</h2>
          </div>

          <Button
            className="transBtn SmallWidthBtn roundedBtn"
            onClick={() => navigate("/trips")}
          >
            <span className="ms-2">{t("Home.ExploreAll")}</span>
          </Button>
        </div>
        <div className="trips_lst">
          <Carousel responsive={responsive}>
            {ExerTrips.map((trip, index) => {
              return (
                <div key={index} className="carousel_item">
                  {" "}
                  <TripCard trip={trip} refreshTrips={getTripData} />
                </div>
              );
            })}
          </Carousel>
          ;
        </div>
      </Container>
      {loading && <LoadingPage />}
    </motion.section>
  );
}

export default TopTripSection;
