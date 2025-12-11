import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  FaEnvelope,
  FaComments,
  FaQuestionCircle,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhone,
} from "react-icons/fa";
import { FaHeadphonesSimple, FaMapLocationDot } from "react-icons/fa6";
import { useTranslation } from "react-multi-lang";
import "./ContactUs.scss";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  const t = useTranslation();

  return (
    <>
      {/* Header section with text and image */}
      <div className="contact-us-section">
        <Container fluid className="content-section">
          <div class="header_title_center">
            <h2>{t("contact.ContactTitle")}</h2>
          </div>
          <Row className="contact-header">
            <Col lg={6} md={12}>
              <h2>{t("contact.title")}</h2>
              <p className="subtitle">{t("contact.subtitle")}</p>
              <p className="sub_text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisl ut aliquip. Nemo enim ipsam voluptatem quia voluptas
              </p>
            </Col>

            {/* Illustration image */}
            <Col
              lg={6}
              md={12}
              className="order-lg-2 order-md-2 order-1 text-center"
            >
              <ContactForm />
              {/* <img
                src="/images/contact_bg.jpg"
                alt="Contact Illustration"
                className="contact-image img-fluid"
              /> */}
            </Col>
          </Row>
          <hr />
          {/* Contact option cards (Chat, Email, Help) */}
          <Row className="contact-cards">
            {/* Chat Card */}
            <Col lg={4} md={6} className="mb-4">
              <Card className="contact-card h-100">
                <Card.Body className="d-flex flex-column">
                  <FaHeadphonesSimple className="icon mb-3" />
                  <Card.Title>
                    <h5>{t("contact.PhoneTitle")}</h5>
                  </Card.Title>
                  <p>+2023454372722</p>
                </Card.Body>
              </Card>
            </Col>

            {/* Email Card */}
            <Col lg={4} md={6} className="mb-4">
              <Card className="contact-card h-100">
                <Card.Body className="d-flex flex-column">
                  <FaEnvelope className="icon mb-3" />
                  <Card.Title>
                    <h5>{t("contact.emailTitle")}</h5>
                  </Card.Title>
                  <p>test@test.com</p>
                </Card.Body>
              </Card>
            </Col>

            {/* Help Card */}
            <Col lg={4} md={12} className="mb-4">
              <Card className="contact-card h-100">
                <Card.Body className="d-flex flex-column">
                  <FaMapLocationDot className="icon mb-3" />
                  <Card.Title>
                    <h5>{t("contact.AddressTitle")}</h5>
                  </Card.Title>
                  <p>Hurghada,Egypt</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ContactUs;
