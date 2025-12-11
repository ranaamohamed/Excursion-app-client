import React, { useEffect, useState } from "react";
import { Form, Row, Button, Col } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookingFormHorizon.scss";
import TripPickupList from "./TripPickupList";
import {
  SaveClientBooking,
  CalculateBookingPrice,
} from "../../../redux/slices/bookingSlice";
import { format } from "date-fns";
import LoadingPage from "../../Loader/LoadingPage";
import PopUp from "../../Shared/popup/PopUp";
function BookingFormHorizon({ trip_id, trip }) {
  const navigate = useNavigate();
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const t = useTranslation();
  const dispatch = useDispatch();
  const [dateSel, onDateChange] = useState(today);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("error");

  const { loading, error, success } = useSelector((state) => state.booking);
  // Handle add/remove adults
  const handleAdultChange = (delta) => {
    setAdults((prev) => Math.max(1, prev + delta)); // at least 1 adult
  };
  useEffect(() => {
    calcPrice(0);

    return () => {};
  }, [adults, childAges]);

  const calcPrice = (booking_id) => {
    let FormData = {
      booking_id: booking_id,
      trip_id: trip_id,
      adult_num: adults,
      child_num: children,
      currency_code: localStorage.getItem("currency") || "eur",
      childAges: childAges,
    };
    dispatch(CalculateBookingPrice(FormData)).then((result) => {
      if (result.payload && result.payload?.success) {
        setShowPopup(false);
        setTotalPrice(result.payload?.final_price);
      } else {
        setPopupMessage(result.payload?.message);
        setShowPopup(true);
        setTotalPrice(0);
      }
    });
  };
  // Handle add/remove children
  const handleChildChange = (delta) => {
    setChildren((prev) => {
      const newCount = Math.max(0, prev + delta);
      // update child ages list
      if (newCount > childAges.length) {
        return setChildAges([...childAges, 0]), newCount;
      } else {
        return setChildAges(childAges.slice(0, newCount)), newCount;
      }
    });
    // calcPrice();
  };

  // Handle child age select
  const handleAgeChange = (index, value) => {
    const updated = [...childAges];
    updated[index] = value;
    setChildAges(updated);
    //calcPrice();
  };
  const SaveBooking = (e) => {
    e.preventDefault();
    let row = {
      trip_id: trip_id,
      client_id: "",
      client_email: "",
      total_pax: adults,
      booking_code: "",
      booking_date: null,
      child_num: children,
      total_price: 0,
      pickup_time: "",
      booking_status: 1,
      trip_date: null,
      booking_notes: "",
      trip_code: trip.trip_code_auto,
      infant_num: 0,
      pickup_address: selectedLocation?.label,
      client_phone: "",
      booking_code_auto: "",
      client_nationality: "",
      gift_code: "",
      trip_type: trip.trip_type,
      id: 0,
      client_name: "",
      is_two_way: false,
      trip_return_date: null,
      booking_dateStr: "",
      trip_dateStr: format(dateSel, "yyyy-MM-dd HH:mm:ss"),
      trip_return_dateStr: null,
      currency_code: localStorage.getItem("currency") || "eur",
      pickup_lat: selectedLocation?.lat,
      pickup_long: selectedLocation?.lng,
    };
    //dispatch(SaveClientBooking(row));
    dispatch(SaveClientBooking(row)).then((result) => {
      if (result.payload && result.payload?.success) {
        setShowPopup(false);
        //navigateto booking form
        calcPrice(result.payload?.idOut);
        navigate("/BookingConfirmation");
      } else {
        setPopupMessage(result.payload?.message);
        setShowPopup(true);
      }
    });
  };
  useEffect(() => {
    let days = trip?.release_days || 1;
    const today = new Date();
    today.setDate(today.getDate() + days);
    onDateChange(today);
    return () => {};
  }, [trip]);
  console.log("loadiing", loading);
  return (
    <div className="book_form_h">
      <h3>{t("Booking.BookFormHeader")}</h3>
      <Form onSubmit={SaveBooking}>
        <TripPickupList
          trip_id={trip_id}
          onLocationSelect={(loc) => setSelectedLocation(loc)}
        />{" "}
        <Form.Label className="formLabel">{t("Home.Date")}</Form.Label>
        <DateTimePicker
          onChange={onDateChange}
          value={dateSel}
          disableClock={true}
          format="dd-MM-yyyy"
          required
          placeholder="Date"
          clearIcon={null}
          minDate={dateSel}
        />
        <Form.Label className="formLabel">{t("Booking.SelectPax")}</Form.Label>
        <div className="traveller-row d-flex justify-content-between align-items-center mb-3">
          <div>
            <strong>{t("Booking.Adult")}</strong>

            <div className="age-note">
              <span className="age_price">
                {trip.trip_max_price} {trip.currency_code}{" "}
              </span>
              ({t("Booking.Age")} 12-99)
            </div>
          </div>
          <div className="counter d-flex align-items-center">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handleAdultChange(-1)}
            >
              −
            </Button>
            <span className="mx-2">{adults}</span>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => handleAdultChange(1)}
            >
              +
            </Button>
          </div>
        </div>
        {/* Children */}
        {trip.child_lst != null && trip.child_lst.length > 0 && (
          <div className="traveller-row d-flex justify-content-between align-items-center mb-3">
            <div>
              <strong>{t("Booking.Child")}</strong>
              {trip.child_lst.map((age, index) => (
                <div className="age-note" key={index}>
                  <span className="age_price">
                    {age.child_price} {trip.currency_code}
                  </span>
                  ({t("Booking.Age")} {age.age_from} - {age.age_to})
                </div>
              ))}
            </div>
            <div className="counter d-flex align-items-center">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleChildChange(-1)}
              >
                −
              </Button>
              <span className="mx-2">{children}</span>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleChildChange(1)}
              >
                +
              </Button>
            </div>
          </div>
        )}
        {/* Child Ages */}
        {childAges.length > 0 && (
          <div className="child-ages">
            <Row>
              {" "}
              {childAges.map((age, i) => (
                <Col md={4}>
                  <Form.Group key={i} className="mb-2">
                    <Form.Label>Child {i + 1} Age</Form.Label>
                    <Form.Select
                      value={age}
                      onChange={(e) =>
                        handleAgeChange(i, parseInt(e.target.value))
                      }
                    >
                      <option value={0}>Select age</option>
                      {[...Array(12).keys()].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              ))}
            </Row>
          </div>
        )}
        {totalPrice > 0 ? (
          <>
            <hr />
            <div className="traveller-row d-flex justify-content-between align-items-center mb-3">
              <strong>{t("Booking.FinalPrice")}</strong>
              <span>
                {totalPrice} {trip.currency_code}
              </span>
            </div>
          </>
        ) : null}
        <Button
          type="submit"
          className="yellowBtn FullWidthBtn"
          disabled={
            adults == 0 ||
            selectedLocation == null ||
            selectedLocation?.label == null
          }
        >
          {t("Booking.Checkout")}
        </Button>
      </Form>
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
    </div>
  );
}

export default BookingFormHorizon;
