import React, { useState, useEffect } from "react";
import { useTranslation, getLanguage } from "react-multi-lang";
import LoadingPage from "../Loader/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import { GetDestinations } from "../../redux/slices/destinationSlice";
import DestinationCard from "../Shared/DestinationCard/DestinationCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
function TopDestSection() {
  const t = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, DestinationList } = useSelector(
    (state) => state.destinations
  );
  useEffect(() => {
    let formData = {
      country_code: "",
      lang_code: localStorage.getItem("lang") || getLanguage(),
      currency_code: "",
      leaf: true,
    };
    dispatch(GetDestinations(formData));
    return () => {};
  }, [dispatch]);
  // console.log("loading ", loading);
  return (
    <section className="centerSection">
      <Container>
        <div className="d-flex justify-content-between align-items-center header_title">
          <div className="header_title_left">
            {" "}
            <h2 className="fw-bold">{t("Home.TopDestinations")}</h2>
          </div>

          <Button
            className="transBtn SmallWidthBtn roundedBtn"
            onClick={() => navigate("/destinations")}
          >
            <span className="ms-2">{t("Home.ExploreAll")}</span>
          </Button>
        </div>
        <div className="dest_lst">
          <Carousel responsive={responsive}>
            {DestinationList.map((dest, index) => {
              return (
                <div key={index} className="carousel_item">
                  {" "}
                  <Link
                    to={`/trips`}
                    state={{ destination_lst: [dest.destination_id] }}
                    className="w-100 h-100 card_link"
                  >
                    <DestinationCard dest={dest} />
                  </Link>
                </div>
              );
            })}
          </Carousel>
          ;
        </div>
      </Container>
      {loading && <LoadingPage />}
    </section>
  );
}

export default TopDestSection;
