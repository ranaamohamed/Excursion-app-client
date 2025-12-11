import React from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
// import { StarFill, PencilSquare, Trash } from "react-bootstrap-icons";
import { useTranslation, getLanguage } from "react-multi-lang";
import "./SummaryBooking.scss";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";
import { FaEuroSign, FaDollarSign } from "react-icons/fa6";
import { Rating } from "../../../helper/TripHelper";
// import { DeleteBooking } from "../../../../redux/slices/bookingSlice";
function SummaryBooking({ data, RemoveTripBooking, isConfirmed }) {
  const t = useTranslation();
  return (
    <Card className="tour-card shadow-sm">
      <Row className="g-0">
        <Col md={4} className="image-col">
          <Card.Img
            src={data?.default_img}
            alt={data?.trip_name}
            // className="object-fit-cover"
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="rating">
                {/* <FaStar className="text-warning me-1" /> */}
                {/* <span className="fw-bold">{data?.review_rate}</span>/5{" "} */}
                <span className="fw-bold">{Rating(data?.review_rate)}</span>
                {/* <span className="text-muted">(152)</span> */}
              </div>
              <div className="action-icons">
                {/* <Button variant="link" className="p-0 me-2">
                  <span className="ms-1">
                    <FaEdit />
                  </span>
                </Button> */}
                <Button
                  variant="link"
                  className="p-0 text-danger"
                  onClick={() => RemoveTripBooking(data?.booking_id)}
                >
                  {isConfirmed ? (
                    t("Booking.Cancel")
                  ) : (
                    <span className="ms-1">
                      <FaTrash />
                    </span>
                  )}
                </Button>
              </div>
            </div>
            <Card.Title className="mb-3">{data?.trip_name}</Card.Title>

            {/* <Card.Text>{data?.trip_description}</Card.Text> */}
            {/* <Card.Title className="mb-3">{data?.trip_description}</Card.Title> */}

            <div className="details mb-3">
              <p>
                <strong>{t("Booking.Pick-upPlace")}:</strong>{" "}
                {data?.pickup_address}
              </p>

              <p>
                <strong>{t("Booking.Date")}:</strong> {data?.trip_datestr}
              </p>

              <p>
                <strong>{t("Booking.Tickets")}:</strong> {data?.total_pax}{" "}
                {t("Booking.Adult")} - {data?.child_num}
                {t("Booking.Child")}
              </p>
            </div>

            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="icons">
                {/* <Badge bg="light" text="dark" className="me-2 border">
                  <i className="bi bi-arrow-repeat me-1"></i>Validity: Flexible
                </Badge>
                <Badge bg="light" text="dark" className="me-2 border">
                  <i className="bi bi-lightning-charge me-1"></i>Instant
                  confirmation
                </Badge> */}
                <Badge bg="light" text="dark" className="border text-danger">
                  <i className="bi bi-x-circle me-1"></i>
                  {data?.cancelation_policy}
                </Badge>
              </div>
              <div className="price fw-bold fs-4 mt-2 mt-sm-0">
                {data?.total_price}{" "}
                {data?.currency_code == "EUR" ? (
                  <FaEuroSign />
                ) : (
                  <FaDollarSign />
                )}
              </div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default SummaryBooking;
