import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiMail, FiPhone, FiHome } from "react-icons/fi";
import { useTranslation } from "react-multi-lang";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import "./footer.scss";
import { Link } from "react-router-dom";
export default function Footer() {
  const t = useTranslation();
  return (
    <footer className="home_footer">
      <Container>
        <div className="footer_logo">
          <img src="/images/logo.png" alt="travel_logo" />
        </div>
        <hr />
        <Row>
          <Col md={4} xs={12}>
            <h4>{t("Footer.Explore")}</h4>
            <ul className="footer_list">
              <li>
                <Link to="/">{t("Navbar.Home")}</Link>
              </li>
              <li>
                <Link to="/trips">{t("Navbar.Trips")}</Link>
              </li>
              {/* <li>{t("Navbar.Transfer")}</Link></li> */}
              <li>
                <Link to="/destinations">{t("Navbar.Destinations")}</Link>
              </li>
              <li>
                <Link to="/about">{t("Navbar.About")}</Link>
              </li>
              <li>
                <Link to="/Contact">{t("Navbar.Contact")}</Link>
              </li>
            </ul>
          </Col>
          <Col md={4} xs={12}>
            <h4>{t("Footer.Contact")}</h4>
            <ul className="footer_list">
              <li>
                <p>
                  <span>
                    {" "}
                    <FiHome /> {t("Footer.Address")}:
                  </span>{" "}
                  hurghada,Egypt
                </p>
              </li>
              <li>
                <p>
                  <span>
                    {" "}
                    <FiPhone />
                    {t("Footer.Phone")}:
                  </span>{" "}
                  1234567811{" "}
                </p>
              </li>
              <li>
                <p>
                  <span>
                    <FiMail />
                    {t("Footer.Email")}:
                  </span>{" "}
                  reservation@test.com
                </p>
              </li>
            </ul>
          </Col>
          <Col md={4} xs={12}>
            <ul className="Social_Links">
              <li className="icon">
                <FaFacebookF />
              </li>
              <li className="icon">
                <FaInstagram />
              </li>
              <li className="icon">
                <FaTwitter />
              </li>
              <li className="icon">
                <FaEnvelope />
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="copy_right">
        <p>{t("Footer.CopyRight")}</p>
      </div>
    </footer>
  );
}
