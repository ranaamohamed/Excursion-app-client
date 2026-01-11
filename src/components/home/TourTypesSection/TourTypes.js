import React, { useState, useEffect } from "react";
import { useTranslation, getLanguage } from "react-multi-lang";
import LoadingPage from "../../Loader/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { Container, Card } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GetTripCategories } from "../../../redux/slices/TripsSlice";
import "./TourTypes.scss";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as IO5Icons from "react-icons/io5";
import * as Fa6Icons from "react-icons/fa6";
const allIcons = { ...FaIcons, ...IO5Icons, ...FiIcons, ...Fa6Icons };
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
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
function TourTypes() {
  const t = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, TripsCats } = useSelector(
    (state) => state.exertrips
  );

  useEffect(() => {
    dispatch(GetTripCategories());
    return () => {};
  }, [dispatch]);
  return (
    <motion.section
      className="centerSection types_section"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <Container>
        <div className="d-lg-flex justify-content-between align-items-center header_title">
          <div className="header_title_center">
            <h2 className="fw-bold">{t("Home.TourTypesTitle")}</h2>
          </div>
        </div>
        <div className="trips_lst">
          <Carousel responsive={responsive}>
            {TripsCats &&
              TripsCats.map((category, index) => {
                //console.log("category?.type_icon ", category?.type_icon);
                const IconComponent =
                  category?.type_icon != null
                    ? allIcons[category?.type_icon]
                    : allIcons["FaShip"];
                return (
                  <div key={index} className="carousel_item">
                    {" "}
                    <Link
                      to={`/trips`}
                      state={{ trip_types: [category.id] }}
                      className="w-100 h-100 card_link"
                    >
                      {" "}
                      <Card className="category-card h-100">
                        <Card.Body className="d-flex flex-column">
                          {IconComponent && (
                            <IconComponent className={`icon mb-3`} />
                          )}{" "}
                          <Card.Title>
                            <h5>{category.type_name}</h5>
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
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

export default TourTypes;
