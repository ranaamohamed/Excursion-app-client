import React, { useEffect, useState } from "react";
import { Form, Row, Col, InputGroup, Button, Dropdown } from "react-bootstrap";
import { useTranslation, getLanguage } from "react-multi-lang";
import { FiInfo } from "react-icons/fi";
import { countryCodes, nationalities } from "../../../helper/DateHelper";
import { ConfirmBooking } from "../../../redux/slices/bookingSlice";
import LoadingPage from "../../Loader/LoadingPage";
import PopUp from "../../Shared/popup/PopUp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { GetMyData } from "../../../helper/helperFN";
function PersonalDetailsForm({ booking_ids }) {
  const t = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCode, setSelectedCode] = useState(countryCodes[0]);
  const [phone, setPhone] = useState("");
  const [FormData, setFormData] = useState({
    client_email: GetMyData().email,
    client_phone: "",
    client_name: GetMyData().name,
    client_nationality: "",
    booking_notes: "",
    booking_ids: booking_ids,
    lang_code: getLanguage() || "en",
  });
  useEffect(() => {
    setFormData({
      ...FormData,
      booking_ids: booking_ids,
    });
    return () => {};
  }, [booking_ids]);

  const handleInputChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.name]: e.target.value,
    });
  };
  const Confirm = (e) => {
    e.preventDefault();
    // console.log("booking_ids ", booking_ids);
    // console.log("FormData ", FormData);
    dispatch(ConfirmBooking(FormData)).then((result) => {
      if (result.payload && result.payload?.success) {
        Swal.fire({
          title: t("Booking.ConfirmBooking"),
          text: t("Booking.ConfirmBookingMsg"),
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
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
    <Form onSubmit={Confirm}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="firstName">
            <Form.Label>{t("Booking.Fullname")}*</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("Booking.Fullname")}
              className="input-rounded"
              name="client_name"
              value={FormData.client_name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="email">
            <Form.Label>{t("Booking.Email")}*</Form.Label>
            <Form.Control
              type="email"
              name="client_email"
              placeholder={t("Booking.Emailaddress")}
              className="input-rounded"
              value={FormData.client_email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="nationality">
            <Form.Label>{t("Booking.Nationality")}</Form.Label>
            <Form.Select
              value={FormData.client_nationality}
              onChange={handleInputChange}
              className="input-rounded"
              name="client_nationality"
              required
            >
              <option value="">{t("Booking.Nationality")}</option>
              {nationalities.map((nation, i) => (
                <option key={i} value={nation}>
                  {nation}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="phone">
            <Form.Label>{t("Booking.Phonenumber")}</Form.Label>
            <InputGroup className="input-rounded phone-group">
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="flag-dropdown border-end-0"
                >
                  <img
                    src={`https://flagcdn.com/16x12/${selectedCode.flag}.png`}
                    alt={selectedCode.name}
                    className="me-1"
                  />
                  {selectedCode.code}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {countryCodes.map((country) => (
                    <Dropdown.Item
                      key={country.code}
                      onClick={() => {
                        setSelectedCode(country);
                        setFormData({
                          ...FormData,
                          client_phone: country.code + phone,
                        });
                      }}
                    >
                      <img
                        src={`https://flagcdn.com/16x12/${country.flag}.png`}
                        alt={country.name}
                        className="me-2"
                      />
                      {country.name} ({country.code})
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <Form.Control
                type="tel"
                value={phone}
                required
                onChange={(e) => {
                  setPhone(e.target.value);
                  setFormData({
                    ...FormData,
                    client_phone: selectedCode.code + e.target.value,
                  });
                }}
                placeholder={t("Booking.Phonenumber")}
                className="border-start-0"
                name="client_phone"
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        {" "}
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>{t("Booking.Notes")}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="booking_notes"
              onChange={handleInputChange}
              value={FormData.booking_notes}
            />
          </Form.Group>
        </Col>
      </Row>
      <p className="text-muted small mt-2 mb-4 text-center">
        {t("Booking.Terms1")}{" "}
        <a href="#" className="text-dark fw-semibold">
          {t("Booking.Terms2")}
        </a>{" "}
        -{" "}
        <a href="#" className="text-dark fw-semibold">
          {t("Booking.Terms3")}
        </a>
      </p>

      <Button className="blueBtn roundedBtn w-100" size="lg" type="submit">
        {t("Booking.ConfirmBooking")}
      </Button>
    </Form>
  );
}

export default PersonalDetailsForm;
