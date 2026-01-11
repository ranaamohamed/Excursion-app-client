import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import LanguageDropdown from "./LanguageDropdown";
import { FiUser, FiLogOut, FiHeart } from "react-icons/fi";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.scss";
import { FaHeart } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import UserDropdown from "./UserDropdown";
import CurrencyDropdown from "./CurrencyDropdown";
import { fetchWishlistCount } from "../../redux/slices/wishListSlice";
import { fetchBookingCount } from "../../redux/slices/bookingSlice";
import TripsDropdown from "./TripsDropdown";
function MainNavbar() {
  const t = useTranslation();
  const [MyName, setMyName] = useState("");
  const [clientId, setClientId] = useState("");
  const dispatch = useDispatch();
  const { WishListCount } = useSelector((state) => state.wishList);
  const { BookingCount } = useSelector((state) => state.booking);
  const logOut = () => {};
  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user") || "null");
    const user = localStorageUser;
    if (user != null) {
      setMyName(user?.firstName + " " + user?.lastName);
      setClientId(user?.id);
    }
    return () => {};
  }, []);

  useEffect(() => {
    dispatch(fetchWishlistCount(clientId));
    dispatch(fetchBookingCount(clientId));
    return () => {};
  }, [clientId]);

  return (
    <Navbar fixed="top" expand="lg" className="home_navbar">
      <Container>
        <Navbar.Brand href="#home" className="logo">
          <img src="/images/logo.png" alt="exercusion_system_logo" />
        </Navbar.Brand>
        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar links and icons */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className="navbar_item nav-item nav-link" end>
              {t("Navbar.Home")}
            </NavLink>

            {/* <Link to="/" className="navbar_item">
              {t("Navbar.Home")}
            </Link> */}

            <NavLink to="/trips" className="navbar_item nav-item nav-link" end>
              <TripsDropdown />
              {/* {t("Navbar.Trips")} */}
            </NavLink>
            <NavLink
              to="/destinations"
              className="navbar_item nav-item nav-link"
            >
              {t("Navbar.Destinations")}
            </NavLink>
            {/* <NavLink to="/transfer" className="navbar_item nav-item nav-link">
              {t("Navbar.Transfer")}
            </NavLink> */}
            <NavLink to="/About" className="navbar_item nav-item nav-link">
              {t("Navbar.About")}
            </NavLink>
            <NavLink to="/Contact" className="navbar_item nav-item nav-link">
              {t("Navbar.Contact")}
            </NavLink>
          </Nav>
          {/* Right-aligned icons and dropdowns */}
          {/* <NavLink to="/auth" className="nav-item nav-link">
            <FiUser className="icon" />
          </NavLink> */}
          <Nav.Link className="nav_icon">
            <CurrencyDropdown />
          </Nav.Link>
          {/* Language switcher dropdown */}
          <Nav.Link className="nav_icon">
            <LanguageDropdown />
          </Nav.Link>

          <NavLink
            to="/MyWishing"
            className="nav-item nav-link nav_icon"
            style={{ position: "relative" }}
          >
            <FiHeart className="icon" />
            {WishListCount > 0 && (
              <Badge
                bg="danger"
                pill
                className="position-absolute start-100 translate-middle"
                style={{
                  fontSize: "0.65rem",
                  top: "-4px",
                  animation: "pop 0.3s ease-out",
                }}
              >
                {WishListCount}
              </Badge>
            )}
          </NavLink>
          <NavLink
            to="/MyBooking"
            className="nav-item nav-link nav_icon"
            style={{ position: "relative" }}
          >
            <FaTicket className="icon tiket_icon" />
            {/* Badge */}
            {BookingCount > 0 && (
              <Badge
                bg="danger"
                pill
                className="position-absolute start-100 translate-middle"
                style={{
                  fontSize: "0.65rem",
                  top: "-4px",
                  animation: "pop 0.3s ease-out",
                }}
              >
                {BookingCount}
              </Badge>
            )}
          </NavLink>
          <Nav.Link className="nav_icon">
            <UserDropdown />
          </Nav.Link>
          {/* Logout icon if user is logged in */}
          {/* <Nav.Link>
            {MyName ? <FiLogOut className="icon" onClick={logOut} /> : null}
          </Nav.Link> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
