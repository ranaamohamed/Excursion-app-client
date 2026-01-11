import React from "react";
import { useTranslation } from "react-multi-lang";
import "./home.scss";
import { Button, Container, Row, Col, InputGroup, Form } from "react-bootstrap";
import { FaLifeRing, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import BookForm from "./BookForm/bookForm";
import TopTripSection from "./TopTripSection";
import TopDestSection from "./TopDestSection";
import SubscribeSection from "./SubscribeSection/SubscribeSection";
import TourTypes from "./TourTypesSection/TourTypes";

const Home = () => {
  const t = useTranslation();
  return (
    <>
      <section className="landing_home">
        <div className="heading_content">
          <h3 className="main_title">
            {t("Home.Heading")}
            <br />
            {t("Home.SubHeading")}
          </h3>
          <a href="#book_form" className="main_btn">
            {t("Home.LearnMore")}
          </a>
        </div>
      </section>
      <Container>
        <section className="book_form" id="book_form">
          <BookForm />
        </section>
      </Container>
      <TopDestSection />
      <TopTripSection />
      <SubscribeSection />
      <TourTypes />

      {/* <section className="landing_about" id="about">
        <Container>
          <Row>
            <Col md={4} xs={6}>
              <div className="about_item">
                <div>
                  <FaLifeRing />
                </div>
                <h4>7/24 Car Support</h4>
              </div>
            </Col>
            <Col md={4} xs={6}>
              <div className="about_item">
                <div>
                  <FaMapMarkerAlt />
                </div>
                <h4>Reservation Anytime</h4>
              </div>
            </Col>
            <Col md={4} xs={6}>
              <div className="about_item">
                <div>
                  <FaRegCalendarAlt />
                </div>
                <h4>Lots of Locations</h4>
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}
      {/* <section className="home_Contact">
        <Container>
          <p>You Can Follow Us By E Mail</p>
          <h3>Subscribe</h3>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter your email here!"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
              Subscribe
            </Button>
          </InputGroup>
        </Container>
      </section> */}
    </>
  );
};

export default Home;
