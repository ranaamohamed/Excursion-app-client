import React, { useEffect, useState } from "react";
import { useTranslation, getLanguage } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  GetMyBooking,
  CancelBooking,
} from "../../../redux/slices/bookingSlice";
import "./MyBooking.scss";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import SummaryBooking from "../SummaryBooking/SummaryBooking";
import LoadingPage from "../../Loader/LoadingPage";
function MyBooking() {
  const t = useTranslation();
  const dispatch = useDispatch();
  const [booking_code, setBooking_code] = useState("");
  const { loading, error, success, MyBookingData } = useSelector(
    (state) => state.booking
  );

  const GetMyBookingData = () => {
    let data = {
      currency_code: localStorage.getItem("currency") || "eur",
      lang_code: getLanguage() || "en",
      booking_code: booking_code,
    };
    dispatch(GetMyBooking(data));
  };
  const GetBookingByCode = (e) => {
    e.preventDefault();
    GetMyBookingData();
  };
  useEffect(() => {
    GetMyBookingData();
    return () => {};
  }, [dispatch]);

  const CancelTripBooking = (booking_id) => {
    dispatch(CancelBooking(booking_id)).then((result) => {
      if (result.payload && result.payload?.success) {
        GetMyBookingData();
      } else {
        Swal.fire({
          title: "Oops...",
          text: t("Messages.WrongMsg"),
          icon: "error",
        });
      }
    });
  };
  return (
    <section className="centerSection myBooking-section">
      <Container>
        {" "}
        {MyBookingData != null && MyBookingData.length > 0 ? (
          <div>
            <p>{t("Booking.MyBookingSubTitle")}</p>
            {/* <small>{t("Booking.MyBookingSubTitleInfo")}</small> */}
            <div className="filter_panel">
              <Form onSubmit={GetBookingByCode}>
                <Row>
                  <Col lg={8} xs={12}>
                    {" "}
                    <Form.Group>
                      {/* <Form.Label>{t("Booking.bookingRef")}*</Form.Label> */}
                      <Form.Control
                        type="text"
                        placeholder={t("Booking.bookingRef")}
                        className="input-rounded"
                        name="booking_code"
                        value={booking_code}
                        onChange={(e) => setBooking_code(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={12}>
                    {" "}
                    <Button
                      className="blueBtn roundedBtn w-100"
                      size="lg"
                      type="submit"
                      // onClick={() => GetMyBookingData()}
                    >
                      {t("Booking.ViewDetails")}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
            <hr />
            <div className="booking_list">
              <div class="header_title_center">
                {" "}
                <h2>{t("Booking.MyBookingTitle")}</h2>
              </div>

              {MyBookingData.map((data, index) => (
                <SummaryBooking
                  data={data}
                  key={index}
                  isConfirmed={true}
                  RemoveTripBooking={CancelTripBooking}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <img
              src="./images/empty_cart.jpg"
              loading="lazy"
              alt="booking_cart_empty"
              className="empty_cart"
            />
            <h3>
              {" "}
              {booking_code
                ? t("Booking.NoTicketsWithCode")
                : t("Booking.NoTickets")}
            </h3>
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

export default MyBooking;
