import { useParams } from "react-router-dom";
import { getExerTripsDetails } from "../../../redux/slices/TripsSlice";
import React, { useState, useEffect } from "react";
import { useTranslation, getLanguage } from "react-multi-lang";
import LoadingPage from "../../Loader/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import TripGallery from "../TripGallery";
import { Container, Breadcrumb, Row, Col } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import { Rating } from "../../../helper/TripHelper";
import parse from "html-react-parser";
import "./Single_Trip.scss";
import TripsReviews from "./TripsReviews";
import BookingFormHorizon from "../../Booking/Form/BookingFormHorizon";
import WishListButton from "../../Shared/wishButton/WishListButton";

function SingleTrip() {
  const { name } = useParams();
  const { state } = useLocation();
  const t = useTranslation();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [trip_id, setTrip_id] = useState(state?.trip_id || 0);
  const [TripReq, setTripReq] = useState({
    trip_id: state?.trip_id || 0,
    lang_code: localStorage.getItem("lang") || getLanguage(),
    currency_code: localStorage.getItem("currency") || "eur",
    client_id: user ? user.id : 0,
    trip_type: 0,
  });
  const { loading, error, success, TripDetails } = useSelector(
    (state) => state.exertrips
  );
  const trip_info_variables = [
    { title: t("Trips.CancelationPolicy"), value: "cancelation_policy" },
    { title: t("Trips.Includes"), value: "trip_includes" },
    { title: t("Trips.NotIncludes"), value: "trip_not_includes" },
    { title: t("Trips.HighLights"), value: "trip_highlight" },
    { title: t("Trips.ImportantInfo"), value: "important_info" },
  ];
  const renderHtmlContent = (htmlString) => {
    if (!htmlString) return null;
    return parse(htmlString);
  };
  useEffect(() => {
    dispatch(getExerTripsDetails(TripReq));
    return () => {};
  }, [trip_id]);

  const refreshSingleTrip = () => {
    dispatch(getExerTripsDetails(TripReq));
  };
  return (
    <section className="centerSection">
      {loading && <LoadingPage />}
      <Container>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item href="/">{t("Navbar.Home")}</Breadcrumb.Item>
            <Breadcrumb.Item href="/trips">{t("Trips.Trips")}</Breadcrumb.Item>
            <Breadcrumb.Item href="/">{TripDetails.dest_route}</Breadcrumb.Item>
            <Breadcrumb.Item active>{TripDetails.trip_name}</Breadcrumb.Item>
            {/* <Breadcrumb.Item active>{t("Trips.Trips")}</Breadcrumb.Item> */}
          </Breadcrumb>
        </div>
        <div className="trip_details">
          <div className="d-flex justify-content-between">
            <h2>{TripDetails?.trip_name}</h2>
            <WishListButton
              trip={TripDetails}
              refreshTrips={refreshSingleTrip}
              withBorder={true}
            />
          </div>

          <TripGallery images={TripDetails?.imgs} />
          <Row>
            <Col md={8} xs={12}>
              {" "}
              <div className="trip_main_feature">
                <div className=" d-flex justify-content-between w-100 align-items-center">
                  <p>
                    <FaRegClock className="icon" />
                    {t("Trips.Duration")} : {TripDetails?.trip_duration}
                  </p>
                  <div>
                    {Rating(TripDetails?.review_rate)}
                    {TripDetails?.review_rate}/5{" "}
                    <span style={{ textDecoration: "underline" }}>
                      {TripDetails?.total_reviews} {t("Trips.Reviews")}
                    </span>
                  </div>
                </div>
                <p>
                  <FaMoneyBillWave className="icon" />
                  {t("Trips.PaymentInfo")}
                </p>
              </div>
              <hr className="divider" />
              <p>{renderHtmlContent(TripDetails?.trip_description)}</p>
              <p>{renderHtmlContent(TripDetails?.trip_details)}</p>
              <hr className="divider" />
              {trip_info_variables.map((item, index) => {
                return TripDetails[item.value] != null &&
                  TripDetails[item.value] !== "" ? (
                  <div className="trip_items" key={index}>
                    <h3 className="item_header">{item.title}</h3>
                    <p>{renderHtmlContent(TripDetails[item.value])}</p>
                  </div>
                ) : null;
              })}
              <hr className="divider" />
              <div className="reviews_section">
                <h3 className="item_header">{t("Trips.ReviewsHeader")}</h3>
                <TripsReviews trip_id={trip_id} />
              </div>
            </Col>
            <Col md={4} xs={12}>
              <BookingFormHorizon trip_id={trip_id} trip={TripDetails} />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}

export default SingleTrip;
