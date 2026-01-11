import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import SearchPlace from "./searchPlace";
import DateTimePicker from "react-datetime-picker";
import { useTranslation } from "react-multi-lang";
import { useNavigate, useLocation } from "react-router-dom";
import "./bookForm.scss";
export default function BookForm() {
  const t = useTranslation();
  const navigate = useNavigate();

  const [dateSel, onDateChange] = useState(new Date());
  const [pax, setPax] = useState(new Date());
  const [placeId, setPlaceId] = useState(0);
  const submitHundler = (e) => {
    e.preventDefault();
    navigate("/trips", {
      replace: true,
      state: { destination_lst: [placeId] },
    });
  };
  return (
    <Form onSubmit={submitHundler}>
      <Form.Group as={Row}>
        <Col md={4} xs={12}>
          <Form.Label>{t("Navbar.Destinations")}</Form.Label>
          <SearchPlace type="pick" setSelectedDest={(id) => setPlaceId(id)} />

          {/* {showBookingNumError ? 
                <Alert variant="danger" className="warnAlert">
                    {errorMsg}
                    <span className="alertBefore"></span>
                </Alert>
                : null
                } */}
        </Col>
        {/* <Col md={3} xs={12}>
          <Form.Label>DropOff*</Form.Label>
          <SearchPlace type="drop" />
        </Col> */}
        <Col md={4} xs={12}>
          <Form.Label>{t("Home.Date")}</Form.Label>
          <DateTimePicker
            onChange={onDateChange}
            value={dateSel}
            disableClock={true}
            format="yyyy-MM-dd"
            required
            //placeholder="Date"
            dayPlaceholder="dd"
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
            calendarIcon={null}
            clearIcon={null}
            inputProps={{ placeholder: "Choose a date & time" }}
          />
        </Col>
        {/* <Col md={3} xs={12}>
          <Form.Control
            className="frm_input"
            type="number"
            title={t("Home.Pax")}
            min="1"
            max="9"
            name="pax"
            placeholder={t("Home.Pax")}
            onChange={(e) => setPax(e.target.value)}
            required
          />
        </Col> */}
        <Col md={4} xs={12}>
          <Button
            type="submit"
            className="bk_btn"
            style={{ marginTop: "30px" }}
          >
            {t("Home.Search")}
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}
