import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Button,
  Col,
  Container,
  Accordion,
  Card,
  InputGroup,
} from "react-bootstrap";
import { useTranslation, getLanguage } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  GetBookingSummary,
  CalculateBookingPrice,
  DeleteBooking,
} from "../../../redux/slices/bookingSlice";
import LoadingPage from "../../Loader/LoadingPage";
import PopUp from "../../Shared/popup/PopUp";
import SummaryBooking from "../SummaryBooking/SummaryBooking";
import { FaShoppingBasket } from "react-icons/fa";
import "./BookingConfirmation.scss";
import PersonalDetailsForm from "./PersonalDetailsForm";
function BookingConfirmation() {
  const t = useTranslation();
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("");
  const [promoCode, setPromoCode] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("error");
  const [booking_ids, setbooking_ids] = useState(null);
  const { loading, error, success, BookingData } = useSelector(
    (state) => state.booking
  );
  const GetBookingData = () => {
    let data = {
      booking_status_id: 1,
      lang_code: getLanguage() || "en",
    };
    dispatch(GetBookingSummary(data));
  };
  useEffect(() => {
    GetBookingData();
    return () => {};
  }, [dispatch]);
  const handleToggle = (key) => {
    // toggle if same key clicked again
    setActiveKey(activeKey === key ? null : key);
  };
  // calculate total
  const total = BookingData?.reduce((sum, item) => sum + item.total_price, 0);
  const RemoveTripBooking = (booking_id) => {
    dispatch(DeleteBooking(booking_id)).then((result) => {
      if (result.payload && result.payload?.success) {
        GetBookingData();
      } else {
        setPopupMessage(result.payload?.message);
        setShowPopup(true);
      }
    });
  };
  useEffect(() => {
    if (BookingData != null) {
      const ids = BookingData.map((obj) => obj.booking_id);
      setbooking_ids(ids);
    }
    return () => {};
  }, [BookingData]);
  return (
    <section className="BookingConfirmation-Section">
      {BookingData != null && BookingData.length > 0 ? (
        <Container>
          <div className="section-title">
            <h2>{t("Booking.CompleteYourBooking")}</h2>
          </div>
          <Row>
            <Col md={8} xs={12}>
              <Accordion
                key={"trips"}
                activeKey={activeKey}
                onSelect={setActiveKey}
              >
                <Accordion.Item eventKey={"trips"}>
                  <Accordion.Header>
                    {t("Booking.BookingDetails")}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="BookingSummary">
                      {BookingData.map((data, index) => (
                        <SummaryBooking
                          data={data}
                          key={index}
                          isConfirmed={false}
                          RemoveTripBooking={RemoveTripBooking}
                        />
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <div className="Personal_Details">
                <h5> {t("Booking.PersonalDetails")}</h5>
                <PersonalDetailsForm booking_ids={booking_ids} />
              </div>
              {/* <Accordion key={"bookForm"} activeKey={"bookForm"}>
              <Accordion.Item eventKey={"bookForm"}>
                <Accordion.Header> */}

              {/* </Accordion.Header> */}
              {/* <Accordion.Body>
                  
                </Accordion.Body>
              </Accordion.Item>
            </Accordion> */}
            </Col>
            <Col md={4} xs={12}>
              <Card>
                <Card.Header>{t("Booking.OrderReview")}</Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div>
                      <FaShoppingBasket className="icon me-1" />(
                      {BookingData?.length}){t("Booking.Trips")}
                    </div>
                    <Button
                      className="details_btn"
                      onClick={() => handleToggle("trips")}
                    >
                      {activeKey === "trips"
                        ? t("Booking.HideDetails")
                        : t("Booking.ShowDetails")}
                    </Button>
                  </div>
                  <hr />
                  <div className="promo-section mb-3">
                    <Form.Label className="fw-semibold small text-muted">
                      {t("Booking.ApplypPromoCode")}
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder={t("Booking.ApplypPromoCode")}
                        className="promo-input"
                      />
                      <Button
                        variant="outline-secondary"
                        className="apply-btn"
                        disabled={promoCode == null}
                      >
                        {t("Booking.Apply")}
                      </Button>
                    </InputGroup>
                  </div>

                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold fs-6">Total</span>
                    <span className="fw-bold fs-5 text-dark">
                      {total} {BookingData[0]?.currency_code}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <div className="centerSection">
          <h3>{t("Booking.NoBooking")}</h3>
        </div>
      )}

      {loading && <LoadingPage />}
      {/* Error Popup */}
      {showPopup && (
        <PopUp
          show={showPopup}
          closeAlert={() => setShowPopup(false)}
          msg={popupMessage}
          type={popupType}
          showConfirmButton={true}
        />
      )}
    </section>
  );
}

export default BookingConfirmation;
